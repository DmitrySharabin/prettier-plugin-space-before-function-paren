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
			// Handle object methods in TypeScript (Property is what TS uses instead of ObjectMethod)
			(node.type === "Property" && (node.method || node.kind === "get" || node.kind === "set"))) {
				// Skip anonymous functions (they are already formatted properly)
				if (
					(node.type === "FunctionExpression" || node.type === "FunctionDeclaration") &&
					!node.id
				) {
					return estreePlugin.printers.estree.print(path, options, print);
				}

				let doc = estreePlugin.printers.estree.print(path, options, print);

				// For decorated methods, search for "(" only after the method name
				// to avoid matching "(" inside decorator arguments
				let marker = node.decorators?.length ? (node.key?.name || node.key?.value) : null;
				let contents = findContents(doc, marker);
				if (contents) {
					// Open paren is always the second item in the contents array
					contents[1] = group([" ", "("]);
				}

				return doc;
			}

			return estreePlugin.printers.estree.print(path, options, print);
		},
	},
};

// Recursively find the (possibly nested) array with the first "(" in the doc produced by prettier.
// If `marker` is given, only match "(" that appears after the marker string (used for decorated methods).
function findContents (doc, marker) {
	let found = !marker;

	function search (node) {
		if (!node) {
			return null;
		}

		if (!found && node === marker) {
			found = true;
			return null;
		}

		if (node.type === "group") {
			return search(node.contents);
		}

		if (Array.isArray(node)) {
			if (found && node.includes("(")) {
				return node;
			}

			for (let item of node) {
				let result = search(item);
				if (result) {
					return result;
				}
			}
		}

		return null;
	}

	return search(doc);
}
