# JSX

JSX is a syntax extension that enables you to write HTML tags interspersed with JavaScript.

It's not part of any JavaScript standards and it's not required for building applications, but it may be more pleasing to use depending on you or your team's preferences.\
JSX may remind you of a template language, but it comes with the full power of JavaScript.

## Use JSX

The simplest way to use JSX is via a [Babel](https://babeljs.io/) plugin.

Babel requires `NPM`, which is automatically installed when you install [Node.js](https://nodejs.org/en/).

## JSX vs Hyperscript

**JSX** and **Hyperscript** ("hypertext" + "javascript") are two different syntaxes you can use for specifying vnodes.

### Babel Installation and Configuration

This is the installation command suggested by Babel’s official manual.

Babel is the most popular and highly recommended transpiler out there, so I'll assume that's what you are using.

Along with converting your ES6/ES7+ syntax to JavaScript-of-today, Babel includes support for transpiling JSX right out of the box.

```bash
# Using npm
npm install babel-plugin-transform-redom-jsx --save-dev

# Using yarn
yarn add babel-plugin-transform-redom-jsx --dev
```

Create a `.babelrc` file:

```json
{
  "plugins": [
    "babel-plugin-transform-redom-jsx",
    [
      "transform-react-jsx",
      {
        "pragma": "el"
      }
    ]
  ]
}
```

It's easiest to see how this works by looking at a very simple example:

**Before:**

```js
const foo = <div id="foo">Hello World!</div>;
```

**After:**

```js
var foo = el('div', {id:"foo"}, 'Hello!');
```

Now we know that JSX is transformed into `el()` function calls.

Those function calls create a simple **virtual DOM tree**.

We can use the `mount()` function to make a matching **real DOM tree**.

**Here's what that looks like:**

```js
// JSX to VDOM
let vdom = <div id="foo">Hello World!</div>;

// VDOM to DOM and add the tree to <body>
mount(document.body, vdom);
```
