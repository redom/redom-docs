# JSX

JSX is a syntax extension that enables you to write HTML tags interspersed with JavaScript.
It's not part of any JavaScript standards and it's not required for building applications, but it may be more pleasing to use depending on you or your team's preferences.
JSX may remind you of a template language, but it comes with the full power of JavaScript.

```js
const element = (<h1>Hello, world!</h1>);
````

## Use JSX

The simplest way to use JSX is via a [Babel](https://babeljs.io/) plugin.

Babel requires npm, which is automatically installed when you install [Node.js](https://nodejs.org/en/).

### Babel Installation and Configuration

This is the installation command suggested by Babel’s official manual.
If you take a close look, you will find that there are actually four packages being installed, three as development dependency and one as production dependency.

```bash
# Using npm
npm install babel-cli babel-plugin-syntax-jsx babel-plugin-transform-react-jsx babel-preset-es2015 —-save-dev

# Using yarn
npm add babel-cli babel-plugin-syntax-jsx babel-plugin-transform-react-jsx babel-preset-es2015 --dev
```

Create a `.babelrc` file:

```json
{
  "plugins": [
    "syntax-jsx",
    ["transform-react-jsx", { "pragma": "redom.el" }]
  ],
  "presets": ["es2015"]
}
```

To run Babel as a standalone tool, run this from the command line:

```bash
babel src --out-dir bin --source-maps
```


## JSX vs Hyperscript

JSX and Hyperscript are two different syntaxes you can use for specifying vnodes.
