# SVG

`el()` and `html()` only create HTML elements.
If you want to create a SVG element, you must use [`svg(query)`](https://github.com/redom/redom/blob/master/esm/svg.js):

```js
import { svg, mount } from "redom";

const drawing = svg(
    "svg",
    svg("symbol", { id: "box", viewBox: "0 0 100 100" }, svg("rect", { x: 25, y: 25, width: 50, height: 50 })),
    svg("circle", { r: 50, cx: 25, cy: 25 }),
    svg("use", { xlink: { href: "#box" } })
);

mount(document.body, drawing);
```

```html
<body>
    <svg>
        <symbol id="box" viewBox="0 0 100 100">
            <rect x="25" y="25" width="50" height="50"></rect>
        </symbol>
        <circle r="50" cx="25" cy="25"></circle>
        <use xlink:href="#box"></use>
    </svg>
</body>
```
