# Set children

RE:DOM uses [`setChildren(parent, ...children)`](https://github.com/redom/redom/blob/master/esm/setchildren.js) under the hood for [lists](#lists).
When you call `setChildren()`, RE:DOM will add/reorder/remove elements/components automatically by reference:

```js
import { el, setChildren } from "redom";

const a = el("a");
const b = el("b");
const c = el("c");

setChildren(document.body, [a, b, c]);
setChildren(document.body, [c, b]);
```

```html
<body>
    <c></c>
    <b></b>
</body>
```

For example, if you need to clear the document body, you can also use `setChildren(document.body, []);`.

There's also a shortcut for replacing children with a single component / element: `setChildren(document.body, app);`.
