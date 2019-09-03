# API Reference

## Element

```ts
html(query, ...args?);
```

```ts
h(query, ...args?);
```

```ts
el(query, ...args?);
```

| Argument | Type                           | Description                      |
| -------- | ------------------------------ | -------------------------------- |
| query    | `node`                         | node element                     |
| args     | `node` / `string` / `number[]` | arguments/attributes for element |

## List

```ts
list(parent, View, key?, initData?);
```

| Argument | Type          | Description    |
| -------- | ------------- | -------------- |
| parent   | `HTMLElement` | parent element |
| View     | `HTMLElement` |                |
| key      | `string`      |                |
| initData | `any`         |                |

## Mount

```ts
mount(parent: HTMLElement, child: HTMLElement, before?: HTMLElement, replace?: boolean);
```

| Argument | Type          | Description                                              |
| -------- | ------------- | -------------------------------------------------------- |
| parent   | `HTMLElement` | parent node.                                             |
| child    | `HTMLElement` | node to append to the given parent node.                 |
| before   | `HTMLElement` | you pass a before value, it works like `insertBefore()`. |
| replace  | `boolean`     | if pass true it works like `replaceChild()`.             |

## Unmount

```ts
unmount(parent: HTMLElement, child: HTMLElement);
```

| Argument | Type          | Description                              |
| -------- | ------------- | ---------------------------------------- |
| parent   | `HTMLElement` | parent node.                             |
| child    | `HTMLElement` | node to append to the given parent node. |

## Place

```ts
place(View: HTMLElement, initData?: any): Place;
```

## Router

```ts
router(parent: RedomQuery, Views: RouterDictionary, initData?: any): Router;
```

## Set Attribute

```ts
setAttr(view: node, arg1: string | object, arg2?: string): void;
```

## Set Style

```ts
setStyle(view: node, arg1: string | object, arg2?: string): void;
```

## Set Children

```ts
setChildren(parent: node, children: node[]): void;
```

## SVG

```ts
svg(query: RedomQuery, ...args: node | string | number[]): SVGElement;
```

```ts
s(query: RedomQuery, ...args: node | string | number[]): SVGElement;
```

## Text

```ts
text(str: string): Text;
```
