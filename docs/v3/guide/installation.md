# Installation

## Compatibility Note

Only if you use `el.extend()`, `svg.extend()` or `list.extend()`, you'll need at least IE9.
All other features should work even in IE6. So for the most parts basically almost every browser out there is supported.

## RE:DOM Devtools

When using RE:DOM, we recommend also installing the [RE:DOM Devtools](https://github.com/redom/redom-devtools) in your browser, allowing you to inspect and
debug your RE:DOM applications in a more user-friendly interface.

## NPM

NPM is the recommended installation method when building large scale applications with RE:DOM.
It pairs nicely with module bundlers such as [Webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/).

```bash
# Using npm
npm install redom

# Using Yarn
yarn add redom
```

## CLI

RE:DOM provides an [official CLI](https://github.com/redom/redom-cli) for quickly scaffolding ambitious Single Page Applications.
It provides batteries-included build setups for a modern frontend workflow.
It takes only a few minutes to get up and running with hot-reload, lint-on-save, and production-ready builds.

> The CLI assumes prior knowledge of Node.js and the associated build tools. If you are new to RE:DOM or front-end build tools, we strongly suggest going without any build tools before using the CLI.

## Server-side

RE:DOM also works on server side, by using [NO:DOM](https://github.com/redom/nodom).

## Dev Build

**Important:** the built files in GitHub’s `/dist` folder are only checked-in during releases.
To use RE:DOM from the latest source code on GitHub, you will have to build it yourself!

```bash
git clone https://github.com/redom/redom.git node_modules/redom
cd node_modules/redom
npm install
npm run build
```

