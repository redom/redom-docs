# API Reference

## Element

```js
html(query: node, ...args: node | string | number[]): node;
````

```js
h(query: node, ...args: node | string | number[]): node;
````

```js
el(query: node, ...args: node | string | number[]): node;
````

## List

```js
listPool(View: HTMLElement, key?: string, initData?: any): ListPool;
````

```js
list(parent: RedomQuery, View: HTMLElement, key?: string, initData?: any): List;
````

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

## Place

```js
place(View: HTMLElement, initData?: any): Place;
````

## Router

```js
router(parent: RedomQuery, Views: RouterDictionary, initData?: any): Router;
````

## Set Attribute

```js
setAttr(view: node, arg1: string | object, arg2?: string): void;
````

## Set Style

```js
setStyle(view: node, arg1: string | object, arg2?: string): void;
````

## Set Children

```js
setChildren(parent: node, children: node[]): void;
````

## SVG

```js
svg(query: RedomQuery, ...args: node | string | number[]): SVGElement;
````

```js
s(query: RedomQuery, ...args: node | string | number[]): SVGElement;
````

## Text

```js
text(str: string): Text;
````
