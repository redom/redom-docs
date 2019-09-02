# Lists

When you have dynamic data, it's not that easy to manually keep the elements and the data in sync.
That's when the [`list(parent, View, key, initData)`](https://github.com/redom/redom/blob/master/esm/list.js)
helper comes to rescue.

To use `list()`, just define a parent node and component:

```js
import { el, list, mount } from "redom";

class Li {
    constructor() {
        this.el = el("li");
    }
    update(data) {
        this.el.textContent = "Item " + data;
    }
}

const ul = list("ul", Li);

mount(document.body, ul);

ul.update([1, 2, 3]);
ul.update([2, 2, 4]);
```

## Item update parameters

`Item.update()` will be called with several parameters:

1. `data` &mdash; data of this item
2. `index` &mdash; index of this item in the items array
3. `items` &mdash; data of all items
4. `context` &mdash; contextual data forwarded from the second `List.update()` parameter

```js
import { el, list, mount } from "redom";

class Li {
    constructor() {
        this.el = el("li");
    }
    update(data, index, items, context) {
        this.el.style.color = context.colors.accent;
        this.el.textContent = "[" + index + "] = Item " + data;
    }
}

const ul = list("ul", Li);

mount(document.body, ul);

ul.update([1, 2, 3], { colors: { accent: "red" } });
```

## List extend

```js
class Td {
    constructor() {
        this.el = el("td");
    }
    update(data) {
        this.el.textContent = data;
    }
}

const Tr = list.extend("tr", Td);

const table = el("table", Tr);

mount(document.body, table);
```

## Regular component

```js
class Td {
    constructor() {
        this.el = el("td");
    }
    update(data) {
        this.el.textContent = data;
    }
}

class Tr {
    constructor() {
        this.el = list("tr", Td);
    }
    update(data) {
        this.el.update(data);
    }
}

const table = list("table", Tr);

mount(document.body, table);
```

This works, but in case you need to access `this.el.el` (`<tr>`) in `Tr`, I recommend to use the following:

```js
class Td {
    constructor() {
        this.el = el("td");
    }
    update(data) {
        this.el.textContent = data;
    }
}
class Tr {
    constructor() {
        this.el = el("tr");
        this.list = list(this.el, Td);
    }
    update(data) {
        this.list.update(data);
    }
}
const table = list("table", Tr);

mount(document.body, table);
```

or the other way around:

```js
this.list = list("tr", Td);
this.el = this.list.el;
```
