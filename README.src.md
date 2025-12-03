# prettier-plugin-space-before-function-paren

A prettier plugin to add a space before function parentheses for function definitions (but not function calls) in JS and TS.
**Requires Prettier 3.0.0 or later.**

## Installation

```
npm install -D prettier prettier-plugin-space-before-function-paren
```

## Configuration

There are no config options for this plugin.
All you need to do is actually include it in your Prettier config:

```json
{
	"plugins": ["prettier-plugin-space-before-function-paren"]
}
```

> [!IMPORTANT]
> Due to Prettier limitations, to use this plugin with other plugins formatting JS/TS code, install the [prettier-plugin-merge](https://github.com/ony3000/prettier-plugin-merge) plugin and *add it to the end* of your `plugins` array. This plugin will be used last and preserve changes made by the previous plugins.

<!-- examples -->

## Status

Current version is a proof of concept, please try it out and give feedback!

Things not handled yet:
- Computed object method names in TS
- Decorated class methods in TS
