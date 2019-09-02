# Update elements

## setAttr
[`setAttr(el, attrs)`](https://github.com/redom/redom/blob/master/esm/setattr.js) is a helper for updating attributes and properties. It will auto-detect attributes and properties:

```js
import { el, setAttr } from 'redom';

const hello = el('h1', 'Hello RE:DOM!');

setAttr(hello, {
  style: { color: 'red' },
  className: 'hello' // You could also just use 'class'
});
```

## setStyle

[`setStyle(el, styles)`](https://github.com/redom/redom/blob/master/esm/setstyle.js) is a shortcut for updating the `style` attribute:

```js
import { setStyle } from 'redom';

setStyle(hello, { color: 'green' });
```
