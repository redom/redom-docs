# Introduction

## What is RE:DOM?

RE:DOM is a tiny (2 KB) DOM library by [Juha Lindstedt](https://pakastin.fi) and [contributors](https://github.com/redom/redom/graphs/contributors), which adds some useful helpers to create DOM elements and keeping them in sync with the data.

Because RE:DOM is so close to the metal and **doesn't use virtual dom**, it's actually **faster** and uses **less memory** than almost all virtual dom based libraries, including React ([benchmark](http://www.stefankrause.net/js-frameworks-benchmark7/table.html)).

It's also easy to create **reusable components** with RE:DOM.

Another great benefit is, that you can use just **pure JavaScript**, so no complicated templating languages to learn and hassle with.

## Getting Started

> The official guide assumes intermediate level knowledge of HTML, CSS, and JavaScript.
If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step.

The easiest way to try out RE:DOM is using the JSFiddle Hello World example.
Feel free to open it in another tab and follow along as we go through some basic examples. Or, you can create an `index.html` file and include RE:DOM with:

```html
<!-- production version, optimized for size and speed -->
<script src="https://redom.js.org/redom.min.js"></script>
```


The [Installation](/#installation) page provides more options of installing RE:DOM.

**Note:** We do not recommend that beginners start with redom-cli, especially if you are not yet familiar with Node.js-based build tools.

### UMD

RE:DOM supports [UMD](https://github.com/umdjs/umd):

```html
<script src="https://redom.js.org/redom.min.js"></script>
<script>
    const { el, mount } = redom;
    ...
</script>
```

### ES2015

It's also possible to use the new [ES2015 import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import):

```js
import { el, mount } from "https://redom.js.org/redom.es.min.js";
```

