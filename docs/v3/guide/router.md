# Router

[`router(parent, routes, initData)`](https://github.com/redom/redom/blob/master/esm/router.js) is a component/element router, which will create/update/remove components/element based on the current route.

```js
import { router, mount } from 'redom';

import { Home, About, Contact } from './sections/index'

const app = router('.app', {
  home: Home,
  about: About,
  contact: Contact
});

mount(document.body, app);

app.update('home', data);
app.update('about', data);
```

**The example will:**

- create a `Home` component
- update it with `data`
- remove it
- create an `About` component
- update it with `data`
- call all defined [lifecycle events](#component-lifecycle)
