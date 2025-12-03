import prettier from "prettier";

// Custom Prettier config with our plugin
const config = {
	plugins: ["./index.js"],
	parser: "babel",
	useTabs: true,
	trailingComma: "none",
};

export default {
	run (arg) {
		return prettier.format(arg, { ...config, ...this.data });
	},
	map: code => !code?.endsWith || code.endsWith("\n") ? code : code + "\n", // Append a new line to the expected value (the actual result already has one)
	tests: [
		{
			name: "JavaScript",
			tests: [
				{
					name: "What this plugin changes",
					tests: [
						{
							name: "Function declarations",
							arg: "function test(a, b) {\n\treturn a + b;\n}",
							expect: "function test (a, b) {\n\treturn a + b;\n}",
						},
						{
							name: "Async function declarations",
							arg: "async function test(a, b) {\n\treturn a + b;\n}",
							expect: "async function test (a, b) {\n\treturn a + b;\n}",
						},
						{
							name: "Object methods",
							arg: "const foo = {\n\tmethod(a, b) {\n\t\treturn a + b;\n\t}\n};",
							expect: "const foo = {\n\tmethod (a, b) {\n\t\treturn a + b;\n\t}\n};",
						},
						{
							name: "Async object methods",
							arg: "const foo = {\n\tasync method(a, b) {\n\t\treturn a + b;\n\t}\n};",
							expect: "const foo = {\n\tasync method (a, b) {\n\t\treturn a + b;\n\t}\n};",
						},
						{
							name: "Computed object methods",
							arg: "const foo = {\n\t[methodName]() {\n\t\treturn 42;\n\t}\n};",
							expect: "const foo = {\n\t[methodName] () {\n\t\treturn 42;\n\t}\n};",
						},
						{
							name: "Object getters",
							arg: "const foo = {\n\tget foo() {\n\t\treturn true;\n\t}\n};",
							expect: "const foo = {\n\tget foo () {\n\t\treturn true;\n\t}\n};",
						},
						{
							name: "Object setters",
							arg: "const foo = {\n\tset foo(value) {\n\t\tthis._foo = value;\n\t}\n};",
							expect: "const foo = {\n\tset foo (value) {\n\t\tthis._foo = value;\n\t}\n};",
						},
						{
							name: "Class constructors",
							arg: "class Foo {\n\tconstructor(a, b) {\n\t\tthis.a = a;\n\t\tthis.b = b;\n\t}\n}",
							expect: "class Foo {\n\tconstructor (a, b) {\n\t\tthis.a = a;\n\t\tthis.b = b;\n\t}\n}",
						},
						{
							name: "Class methods",
							arg: "class Foo {\n\tmethod(a, b) {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tmethod (a, b) {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Private class methods",
							arg: "class Foo {\n\t#method(a, b) {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\t#method (a, b) {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Async class methods",
							arg: "class Foo {\n\tasync method(a, b) {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tasync method (a, b) {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Private async class methods",
							arg: "class Foo {\n\tasync #method(a, b) {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tasync #method (a, b) {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Computed class methods",
							arg: "class Foo {\n\t[methodName]() {\n\t\treturn 42;\n\t}\n}",
							expect: "class Foo {\n\t[methodName] () {\n\t\treturn 42;\n\t}\n}",
						},
						{
							name: "Static class methods",
							arg: "class Foo {\n\tstatic method(a, b) {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tstatic method (a, b) {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Private static class methods",
							arg: "class Foo {\n\tstatic #method(a, b) {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tstatic #method (a, b) {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Class getters",
							arg: "class Foo {\n\tget foo() {\n\t\treturn true;\n\t}\n}",
							expect: "class Foo {\n\tget foo () {\n\t\treturn true;\n\t}\n}",
						},
						{
							name: "Private class getters",
							arg: "class Foo {\n\tget #foo() {\n\t\treturn true;\n\t}\n}",
							expect: "class Foo {\n\tget #foo () {\n\t\treturn true;\n\t}\n}",
						},
						{
							name: "Class setters",
							arg: "class Foo {\n\tset foo(value) {\n\t\tthis._foo = value;\n\t}\n}",
							expect: "class Foo {\n\tset foo (value) {\n\t\tthis._foo = value;\n\t}\n}",
						},
						{
							name: "Private class setters",
							arg: "class Foo {\n\tset #foo(value) {\n\t\tthis._foo = value;\n\t}\n}",
							expect: "class Foo {\n\tset #foo (value) {\n\t\tthis._foo = value;\n\t}\n}",
						},
						{
							name: "Generator functions",
							arg: "function* test() {\n\tyield 1;\n}",
							expect: "function* test () {\n\tyield 1;\n}",
						},
						{
							name: "Named exported functions",
							arg: "export function test(a, b) {\n\treturn a + b;\n}",
							expect: "export function test (a, b) {\n\treturn a + b;\n}",
						},
						{
							name: "Default exported functions",
							arg: "export default function test(a, b) {\n\treturn a + b;\n}",
							expect: "export default function test (a, b) {\n\treturn a + b;\n}",
						},
						{
							name: "Async exported functions",
							arg: "export async function test(a, b) {\n\treturn a + b;\n}",
							expect: "export async function test (a, b) {\n\treturn a + b;\n}",
						},
						{
							name: "Generator exported functions",
							arg: "export function* test() {\n\tyield 1;\n}",
							expect: "export function* test () {\n\tyield 1;\n}",
						},
					],
				},
				{
					name: "What remains unchanged",
					tests: [
						{
							name: "Function calls",
							arg: "test(1, 2);",
							expect: "test(1, 2);",
						},
						{
							name: "Arrow functions",
							arg: "const add = (a, b) => a + b;",
							expect: "const add = (a, b) => a + b;",
						},
						{
							name: "Anonymous function expressions",
							description: "Prettier already handles this case.",
							arg: "const add = function(a, b) {\n\treturn a + b;\n};",
							expect: "const add = function (a, b) {\n\treturn a + b;\n};",
						},
						{
							name: "Anonymous function declarations",
							description: "Prettier already handles this case.",
							arg: "export default function(a, b) {\n\treturn a + b;\n}",
							expect: "export default function (a, b) {\n\treturn a + b;\n}",
						},
					],
				},
			],
		},
		{
			name: "TypeScript",
			data: {
				parser: "typescript",
			},
			tests: [
				{
					name: "What this plugin changes",
					tests: [
						{
							name: "Function declarations",
							arg: "function test(a: number, b: number): number {\n\treturn a + b;\n}",
							expect: "function test (a: number, b: number): number {\n\treturn a + b;\n}",
						},
						{
							name: "Async function declarations",
							arg: "async function test(a: number, b: number): Promise<number> {\n\treturn a + b;\n}",
							expect: "async function test (a: number, b: number): Promise<number> {\n\treturn a + b;\n}",
						},
						{
							name: "Object methods",
							arg: "const foo = {\n\tmethod(a: number, b: number): number {\n\t\treturn a + b;\n\t}\n};",
							expect: "const foo = {\n\tmethod (a: number, b: number): number {\n\t\treturn a + b;\n\t}\n};",
						},
						{
							name: "Async object methods",
							arg: "const foo = {\n\tasync method(a: number, b: number): Promise<number> {\n\t\treturn a + b;\n\t}\n};",
							expect: "const foo = {\n\tasync method (a: number, b: number): Promise<number> {\n\t\treturn a + b;\n\t}\n};",
						},
						{
							name: "Computed object methods",
							arg: "const foo = {\n\t[methodName](): void {\n\t\treturn;\n\t}\n};",
							expect: "const foo = {\n\t[methodName] (): void {\n\t\treturn;\n\t}\n};",
							skip: true,
						},
						{
							name: "Object getters",
							arg: "const foo = {\n\tget foo(): boolean {\n\t\treturn true;\n\t}\n};",
							expect: "const foo = {\n\tget foo (): boolean {\n\t\treturn true;\n\t}\n};",
						},
						{
							name: "Object setters",
							arg: "const foo = {\n\tset foo(value: boolean) {\n\t\tthis._foo = value;\n\t}\n};",
							expect: "const foo = {\n\tset foo (value: boolean) {\n\t\tthis._foo = value;\n\t}\n};",
						},
						{
							name: "Class constructors",
							arg: "class Foo {\n\tconstructor(a: number, b: number) {\n\t\tthis.a = a;\n\t\tthis.b = b;\n\t}\n}",
							expect: "class Foo {\n\tconstructor (a: number, b: number) {\n\t\tthis.a = a;\n\t\tthis.b = b;\n\t}\n}",
						},
						{
							name: "Class methods",
							arg: "class Foo {\n\tmethod(a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tmethod (a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Async class methods",
							arg: "class Foo {\n\tasync method(a: number, b: number): Promise<number> {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tasync method (a: number, b: number): Promise<number> {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Static class methods",
							arg: "class Foo {\n\tstatic method(a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tstatic method (a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Abstract class methods",
							arg: "abstract class Foo {\n\tabstract method(a: number, b: number): number;\n}",
							expect: "abstract class Foo {\n\tabstract method (a: number, b: number): number;\n}",
						},
						{
							name: "Private class methods (access modifier)",
							arg: "class Foo {\n\tprivate method(a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tprivate method (a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Private class methods",
							arg: "class Foo {\n\t#method(a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\t#method (a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Protected class methods",
							arg: "class Foo {\n\tprotected method(a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tprotected method (a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Public class methods",
							arg: "class Foo {\n\tpublic method(a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tpublic method (a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Optional class methods",
							arg: "class Foo {\n\tmethod?(a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
							expect: "class Foo {\n\tmethod? (a: number, b: number): number {\n\t\treturn a + b;\n\t}\n}",
						},
						{
							name: "Class getters",
							arg: "class Foo {\n\tget foo(): boolean {\n\t\treturn true;\n\t}\n}",
							expect: "class Foo {\n\tget foo (): boolean {\n\t\treturn true;\n\t}\n}",
						},
						{
							name: "Private class getters",
							arg: "class Foo {\n\tget #foo(): boolean {\n\t\treturn true;\n\t}\n}",
							expect: "class Foo {\n\tget #foo (): boolean {\n\t\treturn true;\n\t}\n}",
						},
						{
							name: "Class setters",
							arg: "class Foo {\n\tset foo(value: boolean) {\n\t\tthis._foo = value;\n\t}\n}",
							expect: "class Foo {\n\tset foo (value: boolean) {\n\t\tthis._foo = value;\n\t}\n}",
						},
						{
							name: "Private class setters",
							arg: "class Foo {\n\tset #foo(value: boolean) {\n\t\tthis._foo = value;\n\t}\n}",
							expect: "class Foo {\n\tset #foo (value: boolean) {\n\t\tthis._foo = value;\n\t}\n}",
						},
						{
							name: "Computed class methods",
							arg: "class Foo {\n\t[methodName](): void {\n\t\treturn;\n\t}\n}",
							expect: "class Foo {\n\t[methodName] (): void {\n\t\treturn;\n\t}\n}",
						},
						{
							name: "Class methods with type parameters",
							arg: "class Foo {\n\tmethod<T>(a: T): T {\n\t\treturn a;\n\t}\n}",
							expect: "class Foo {\n\tmethod<T> (a: T): T {\n\t\treturn a;\n\t}\n}",
						},
						{
							name: "Generator functions",
							arg: "function* test(): Generator<number> {\n\tyield 1;\n}",
							expect: "function* test (): Generator<number> {\n\tyield 1;\n}",
						},
						{
							name: "Interface methods",
							arg: "interface Foo {\n\tmethod(a: number, b: number): number;\n}",
							expect: "interface Foo {\n\tmethod (a: number, b: number): number;\n}",
						},
						{
							name: "Function with type parameters",
							arg: "function foo<T>(arg: T): T {\n\treturn arg;\n}",
							expect: "function foo<T> (arg: T): T {\n\treturn arg;\n}",
						},
						{
							name: "Named exported functions",
							arg: "export function test(a: number, b: number): number {\n\treturn a + b;\n}",
							expect: "export function test (a: number, b: number): number {\n\treturn a + b;\n}",
						},
						{
							name: "Default exported functions",
							arg: "export default function test(a: number, b: number): number {\n\treturn a + b;\n}",
							expect: "export default function test (a: number, b: number): number {\n\treturn a + b;\n}",
						},
						{
							name: "Async exported functions",
							arg: "export async function test(a: number, b: number): Promise<number> {\n\treturn a + b;\n}",
							expect: "export async function test (a: number, b: number): Promise<number> {\n\treturn a + b;\n}",
						},
						{
							name: "Generator exported functions",
							arg: "export function* test(): Generator<number> {\n\tyield 1;\n}",
							expect: "export function* test (): Generator<number> {\n\tyield 1;\n}",
						},
						{
							name: "Exported function in namespace",
							arg: "declare namespace Foo {\n\texport function test(a: number, b: number): number;\n}",
							expect: "declare namespace Foo {\n\texport function test (a: number, b: number): number;\n}",
						},
						{
							name: "Function type aliases",
							arg: "type MethodType = {\n\tmethod(): void;\n};",
							expect: "type MethodType = {\n\tmethod (): void;\n};",
						},
						{
							name: "Decorated class methods",
							arg: "class Foo {\n\t@decorator(() => {})\n\tmethod(): void {}\n}",
							expect: "class Foo {\n\t@decorator(() => {})\n\tmethod (): void {}\n}",
							skip: true,
						},
					],
				},
				{
					name: "What remains unchanged",
					tests: [
						{
							name: "Function calls",
							arg: "test<number>(1, 2);",
							expect: "test<number>(1, 2);",
						},
						{
							name: "Arrow functions",
							arg: "const add = (a: number, b: number): number => a + b;",
							expect: "const add = (a: number, b: number): number => a + b;",
						},
						{
							name: "Anonymous function expressions",
							description: "Prettier already handles this case.",
							arg: "const add = function(a: number, b: number): number {\n\treturn a + b;\n};",
							expect: "const add = function (a: number, b: number): number {\n\treturn a + b;\n};",
						},
						{
							name: "Anonymous function declarations",
							description: "Prettier already handles this case.",
							arg: "export default function(a: number, b: number): number {\n\treturn a + b;\n}",
							expect: "export default function (a: number, b: number): number {\n\treturn a + b;\n}",
						},
						{
							name: "Type aliases",
							arg: "type NumberCallback = (x: number) => number;",
							expect: "type NumberCallback = (x: number) => number;",
						},
						{
							name: "Function types",
							arg: "type Func = { (a: string): number };",
							expect: "type Func = { (a: string): number };",
						},
						{
							name: "Object literal",
							arg: "let a = { value: null, prev: null, next: null as never };",
							expect: "let a = { value: null, prev: null, next: null as never };",
						},
					],
				},
			],
		},
	],
};
