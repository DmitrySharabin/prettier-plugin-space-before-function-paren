import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import typescriptPlugin from "prettier/plugins/typescript";
import { builders } from "prettier/doc";

const { group } = builders;

export const parsers = {
	...babelPlugin.parsers,
	...typescriptPlugin.parsers,
};

export const printers = {
	estree: {
		// Inherit all default estree printer behavior (comment handling, etc.)
		...estreePlugin.printers.estree,

		print (path, options, print) {
			let node = path.getValue();
			let parent = path.getParentNode();

			if ([
				// JavaScript node types
				"FunctionDeclaration",
				"FunctionExpression",
				"ObjectMethod",
				"MethodDefinition",
				"ClassMethod",
				"ClassPrivateMethod",
				// TypeScript node types
				"TSMethodSignature",
				"TSDeclareFunction",
				"TSAbstractMethodDefinition",
			].includes(node.type) || 
			// Handle object methods in TypeScript
			(node.type === "Identifier" && parent?.type === "Property" && (parent.method || parent.kind === "get" || parent.kind === "set"))) {
				// Skip anonymous functions (they are already formatted properly)
				if (
					(node.type === "FunctionExpression" || node.type === "FunctionDeclaration") &&
					!node.id
				) {
					return estreePlugin.printers.estree.print(path, options, print);
				}

				let doc = estreePlugin.printers.estree.print(path, options, print);

				// Find the first "(" and add a space before it
				let contents = findContents(doc);
				if (contents) {
					// Open paren is always the second item in the contents array
					contents[1] = group([" ", "("]);
				}
				else if (node.type === "Identifier" && !parent?.computed) {
					// Object method in TypeScript. `doc` is already an array where the first item is the method name.
					// TODO: Properly handle computed object methods. We should get `[methodName] () {...}`, not `[methodName ] () {...}`
					doc[0] = group([doc[0], " "]);
				}

				return doc;
			}

			return estreePlugin.printers.estree.print(path, options, print);
		},
	},
};

// Recursively find the (possibly nested) array with the first "(" in the doc produced by prettier
function findContents (doc) {
	if (!doc) {
		return null;
	}

	if (doc.type === "group") {
		return findContents(doc.contents);
	}

	if (Array.isArray(doc)) {
		if (doc.includes("(")) {
			return doc;
		}

		for (let item of doc) {
			let contents = findContents(item);
			if (contents) {
				return contents;
			}
		}
	}

	return null;
}
