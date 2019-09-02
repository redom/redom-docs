# API Reference

## Lifecycle Methods

Lifecycle methods are custom functionality that gets executed during the different phases of a component.
There are methods available when the component gets created and inserted into the DOM ([mounting](#mounting)), when the component updates, and when the
component gets unmounted or removed from the DOM.

## Mount

```js
mount(parent: HTMLElement, child: HTMLElement, before?: HTMLElement, replace?: boolean);
```

| Argument | Type          | Description                                              |
| -------- | ------------- | -------------------------------------------------------- |
| parent   | `HTMLElement` | parent node.                                             |
| child    | `HTMLElement` | node to append to the given parent node.                 |
| before   | `HTMLElement` | you pass a before value, it works like `insertBefore()`. |
| replace  | `boolean`     | if pass true it works like `replaceChild()`.             |



## Unmount

```js
unmount(parent: HTMLElement, child: HTMLElement);
```

| Argument | Type          | Description                                              |
| -------- | ------------- | -------------------------------------------------------- |
| parent   | `HTMLElement` | parent node.                                             |
| child    | `HTMLElement` | node to append to the given parent node.                 |
