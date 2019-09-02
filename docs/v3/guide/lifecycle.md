# Lifecycle

## Component lifecycle

RE:DOM supports true lifecycle events. Three events are defined: `onmount`, `onremount` and `onunmount`.

-   The first time you mount an element to a specific parent, `onmount` will be triggered.
-   If you mount an element again to the same parent, `onremount` will be triggered.
-   If you unmount an element or move it from one parent to another, `onunmount` will be triggered.

This means that `onunmount` and `onmount` will be triggered in succession when moving an element from one parent to another.

```js
import { el, mount } from "redom";

class Hello {
    constructor() {
        this.el = el("h1", "Hello RE:DOM!");
    }
    onmount() {
        console.log("mounted Hello");
    }
    onremount() {
        console.log("remounted Hello");
    }
    onunmount() {
        console.log("unmounted Hello");
    }
}

class App {
    constructor() {
        this.el = el("app", (this.hello = new Hello()));
    }
    onmount() {
        console.log("mounted App");
    }
    onremount() {
        console.log("remounted App");
    }
    onunmount() {
        console.log("unmounted App");
    }
}

const app = new App();

mount(document.body, app);
mount(document.body, app);
mount(document.head, app);
unmount(document.head, app);
```

```
mounted App
mounted Hello
remounted App
remounted Hello
unmounted App
unmounted Hello
mounted App
mounted Hello
unmounted App
unmounted Hello
```

## List lifecycle

When you call `List.update()`, the list will automatically:

-   Create new components for new items
-   Mount new components in the right place
-   Reorder moved items (remount)
-   Remove deleted items
-   Trigger any [lifecycle](#lifecycle) events
-   Call `.update()` for all components, except removed ones

### Keyed list

Normally `list()` will update by index, so it only adds/removes the last item.

If you want to define a key, you can do that by adding a third parameter to `list()`. With a key, the list will automatically insert/reorder/remove elements by that key of each object in the list.

```js
import { el, list, mount } from "redom";

class Li {
    constructor() {
        this.el = el("li");
    }
    update(data) {
        this.el.textContent = data.name;
    }
}

const ul = list("ul", Li, "_id");

mount(document.body, ul);

ul.update([{ _id: 1, name: "Item 1" }, { _id: 2, name: "Item 2" }, { _id: 3, name: "Item 3" }]);

setTimeout(() => {
    ul.update([{ _id: 3, name: "Item 3" }, { _id: 2, name: "Item 2" }]);
}, 1000);
```
