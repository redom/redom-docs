# Mounting

Please use `mount()`/`unmount()`/`setChildren()` every time you need to mount/unmount elements inside a RE:DOM app.
These functions will trigger lifecycle events, add references to components etc.

## Mount

You can mount elements/components with [`mount(parent, child, /*opt.*/ before, /*opt.*/ replace)`](https://github.com/redom/redom/blob/master/esm/mount.js).

- If you omit the optional arguments, it works like [`appendChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild).
- If you pass a `before` value, it works like [`insertBefore()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore).
- If you, additionally, pass `true` as the `replace` argument, it works like [`replaceChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/replaceChild) (in this case, the name `before` can be viewed in a chronological manner).

The first time you mount a child, the `onmount` [lifecycle event](#lifecycle) will be triggered.
If you mount the same child again to the same parent, `onremount` will be triggered.
If you mount it to another place, `onunmount` and `onmount` will be triggered.

Read more about [lifecycle events](#lifecycle).

```js
import { el, mount } from "redom";

const hello = el("h1", "Hello RE:DOM!");

// append element:
mount(document.body, hello);

// insert before the first element:
mount(document.body, hello, document.body.firstChild);

// replace an existing element:
const revamped = el("h1", "Revamped!");
mount(document.body, revamped, hello, true);
```

## Unmount

If you need to remove elements/components, use [`unmount(parent, child)`](https://github.com/redom/redom/blob/master/esm/unmount.js).
That will trigger the `onunmount` [lifecycle event](#lifecycle):

```js
unmount(document.body, hello);
```
