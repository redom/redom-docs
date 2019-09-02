# Components

It's really easy to create components with RE:DOM.
Simply define a class or function, which returns an object with at least an `el` property, and in case of [list](#lists) also the `update` property:

```js
import { el, mount } from "redom";

class Hello {
    constructor() {
        this.el = el("h1");
    }
    update(data) {
        this.el.textContent = "Hello " + data + "!";
    }
}

const hello = new Hello();

hello.update("RE:DOM!");

mount(document.body, hello);
```

## Diffing

You don't have to manually diff class names / properties / attributes **except when dealing with URLs**.
If you change the `src` of `img`, `iframe` or `video` elements, the browser will **reload** the asset/website even if the value did not actually change.
One way to work around this would be:

```js
import { el, mount } from "redom";

class Image {
    constructor() {
        this.el = el("img");
        this.data = {};
    }
    update(data) {
        const { url } = data;

        if (url !== this.data.url) {
            this.el.src = url;
        }

        this.data = data;
    }
}
```
