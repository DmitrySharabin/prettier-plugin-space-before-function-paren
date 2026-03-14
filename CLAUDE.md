# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test          # Run all tests via htest
npm run build     # Regenerate README.md from test.js examples
npm run release   # Version bump and release (release-it)
```

There is no lint step — no ESLint config in this project.

## Architecture

This is a minimal Prettier 3 plugin (~84 lines) that adds a space before function parentheses (e.g. `function foo ()` instead of `function foo()`).

**How the plugin works (`index.js`):**

1. Re-exports Prettier's built-in Babel and TypeScript parsers unchanged.
2. Wraps Prettier's `estree` printer with a custom `print` function.
3. For specific AST node types (function declarations, methods, class methods, TS signatures), it lets the original printer run first, then recurses into the resulting document tree via `findContents()` to locate the `(` token and wraps it with `group([" ", "("])`.
4. Special cases:
   - **Anonymous functions**: skipped — Prettier already omits the space.
   - **Decorated class methods in TS**: `findContents(doc, marker)` is called with the method name as a marker so only the `(` appearing *after* the method name is matched, skipping any `(` tokens inside decorator arguments.
   - **TS object methods** (both computed and non-computed): intercepted at the `Property` node level (the TS parser uses `Property` instead of `ObjectMethod`). `findContents` finds the right `(` in the method signature.

**Document tree manipulation:** The plugin manipulates Prettier's intermediate `Doc` IR (not the AST). `findContents(doc, marker?)` recursively walks the doc tree; when `marker` is given, it skips all `(` tokens until the marker string is found first.

## Tests (`test.js`)

Uses **htest** — tests are nested object literals. The top-level `run` calls `prettier.format()` with the plugin injected. TypeScript tests override `data.parser` to `"typescript"`.

Test structure:
- **"What this plugin changes"** — input ≠ output; plugin modifies the spacing.
- **"What remains unchanged"** — input already correct or should not be touched (arrow functions, calls, anonymous functions, etc.).
- No `skip: true` entries remain — all previously broken cases are now fixed.

## README generation

`README.md` is auto-generated — do not edit it directly. Edit `README.src.md` and run `npm run build`. The build script reads test cases from `test.js` and injects formatted code examples into the template.
