# API Reference

## Element

```js
html(query, ...args?);
```

```js
h(query, ...args?);
```

```js
el(query, ...args?);
```

| Argument | Type                           | Description                      |
| -------- | ------------------------------ | -------------------------------- |
| query    | `node`                         | node element                     |
| args     | `node` / `string` / `number[]` | arguments/attributes for element |

## List

```js
list(parent, View, key?, initData?);
```

| Argument | Type          | Description    |
| -------- | ------------- | -------------- |
| parent   | `HTMLElement` | parent element |
| View     | `HTMLElement` |                |
| key      | `string`      |                |
| initData | `any`         |                |

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

| Argument | Type          | Description                              |
| -------- | ------------- | ---------------------------------------- |
| parent   | `HTMLElement` | parent node.                             |
| child    | `HTMLElement` | node to append to the given parent node. |

## Place

```js
place(View: HTMLElement, initData?: any): Place;
```

## Router

```js
router(parent: RedomQuery, Views: RouterDictionary, initData?: any): Router;
```

## Set Attribute

```js
setAttr(view: node, arg1: string | object, arg2?: string): void;
```

## Set Style

```js
setStyle(view: node, arg1: string | object, arg2?: string): void;
```

## Set Children

```js
setChildren(parent: node, children: node[]): void;
```

## SVG

```js
svg(query: RedomQuery, ...args: node | string | number[]): SVGElement;
```

```js
s(query: RedomQuery, ...args: node | string | number[]): SVGElement;
```

## Text

```js
text(str: string): Text;
```
