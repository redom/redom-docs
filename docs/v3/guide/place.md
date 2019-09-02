# Place

Sometimes you might need to create/destroy a component/element while reserving it's place.
That's when [`place(View, initData)`](https://github.com/redom/redom/blob/master/esm/place.js) come in handy!

Think of it as a single view [router](#router) (without the need of a parent).

```js
import { place, mount } from "redom";
import { Top, Menu, Content } from "./elements";

const app = el(".app", (this.top = new Top()), (this.menu = place(Menu)), (this.content = new Content()));

// create Menu and send data update:
this.menu.update(true, data);

// just update Menu (was already created):
this.menu.update(true, data2);

// delete Menu:
this.menu.update(false);
```

When you call `place.update(visible, data)`, the `Place` will automatically detect what to do with the component:

-   [construct](https://github.com/redom/redom/blob/master/esm/place.js#L25)
-   [update](https://github.com/redom/redom/blob/master/esm/place.js#L33)
-   [destroy](https://github.com/redom/redom/blob/master/esm/place.js#L40)
