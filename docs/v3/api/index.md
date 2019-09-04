# API Reference

## Types

```ts
export type RedomElement = Node | RedomComponent;
export type RedomQuery = string | RedomElement;
export type RedomMiddleware = (el: HTMLElement) => void;
export type RedomQueryArgumentValue = RedomElement | string | number | { [key: string]: any } | RedomMiddleware;
export type RedomQueryArgument = RedomQueryArgumentValue | RedomQueryArgumentValue[];
```

```ts
type HTMLElementOfStringLiteral<Q extends string> = Q extends "div"
    ? HTMLDivElement
    : Q extends "a"
    ? HTMLAnchorElement
    : Q extends "span"
    ? HTMLSpanElement
    : Q extends "pre"
    ? HTMLPreElement
    : Q extends "p"
    ? HTMLParagraphElement
    : Q extends "hr"
    ? HTMLHRElement
    : Q extends "br"
    ? HTMLBRElement
    : Q extends "img"
    ? HTMLImageElement
    : Q extends "iframe"
    ? HTMLIFrameElement
    : Q extends "ul"
    ? HTMLUListElement
    : Q extends "li"
    ? HTMLLIElement
    : Q extends "ol"
    ? HTMLOListElement
    : Q extends "form"
    ? HTMLFormElement
    : Q extends "input"
    ? HTMLInputElement
    : Q extends "label"
    ? HTMLLabelElement
    : Q extends "textarea"
    ? HTMLTextAreaElement
    : Q extends "select"
    ? HTMLSelectElement
    : Q extends "option"
    ? HTMLOptionElement
    : Q extends "button"
    ? HTMLButtonElement
    : Q extends "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    ? HTMLHeadingElement
    : Q extends "table"
    ? HTMLTableElement
    : Q extends "tr"
    ? HTMLTableRowElement
    : Q extends "td"
    ? HTMLTableCellElement
    : Q extends "thead" | "tbody" | "tfoot"
    ? HTMLTableSectionElement
    : Q extends "th"
    ? HTMLTableHeaderCellElement
    : Q extends "style"
    ? HTMLStyleElement
    : Q extends "svg"
    ? SVGElement
    : HTMLElement;
```

```ts
type HTMLElementOfRedomQuery<Q extends RedomQuery> = Q extends RedomElement
    ? Q
    : Q extends string
    ? HTMLElementOfStringLiteral<Q>
    : never;
```

```ts
export type RedomComponentConstructor = RedomComponentClass | RedomComponentFunction;
```

## Interfaces

### RedomComponent

```ts
export interface RedomComponent {
    el: HTMLElement;
    update?(item: any, index: number, data: any, context?: any): void;
    onmount?(): void;
    onremount?(): void;
    onunmount?(): void;
}
```

```ts
export interface RedomComponentFunction {
    new (): RedomComponent;
}
```

```ts
export interface RouterDictionary {
    [key: string]: RedomComponentConstructor;
}
```

```ts
export class RedomComponentClass implements RedomComponent {
    el: HTMLElement;
}
```

```ts
export class ListPool {
    constructor(View: RedomComponentConstructor, key?: string, initData?: any);
    update(data: any[], context?: any): void;
}
```

```ts
export class List implements RedomComponent {
    el: HTMLElement;
    constructor(parent: RedomQuery, View: RedomComponentConstructor, key?: string, initData?: any);
    update(data: any[], context?: any): void;
    onmount?(): void;
    onremount?(): void;
    onunmount?(): void;
    static extend(
        parent: RedomQuery,
        View: RedomComponentConstructor,
        key?: string,
        initData?: any
    ): RedomComponentConstructor;
}
```

```ts
export class Place implements RedomComponent {
    el: HTMLElement;
    constructor(View: RedomComponentConstructor, initData?: any);
    update(visible: boolean, data?: any): void;
}
```

```ts
export class Router implements RedomComponent {
    el: HTMLElement;
    constructor(parent: RedomQuery, Views: RouterDictionary, initData?: any);
    update(route: string, data?: any): void;
}
```

## Namespaces

### List

```ts
export namespace list {
    function extend(
        parent: RedomQuery,
        View: RedomComponentConstructor,
        key?: string,
        initData?: any
    ): RedomComponentConstructor;
}
```

### SVG

```ts
export namespace svg {
    function extend(query: RedomQuery): RedomComponentConstructor;
}
```

## Functions

### Element

```ts
export function html<Q extends RedomQuery>(query: Q, ...args: RedomQueryArgument[]): HTMLElementOfRedomQuery<Q>;
export function h<Q extends RedomQuery>(query: Q, ...args: RedomQueryArgument[]): HTMLElementOfRedomQuery<Q>;
export function el<Q extends RedomQuery>(query: Q, ...args: RedomQueryArgument[]): HTMLElementOfRedomQuery<Q>;
```

| Argument | Type                   | Description                      |
| -------- | ---------------------- | -------------------------------- |
| query    | `Q`                    | node element                     |
| ...args  | `RedomQueryArgument[]` | arguments/attributes for element |

### List

```ts
export function listPool(View: RedomComponentConstructor, key?: string, initData?: any): ListPool;
export function list(parent: RedomQuery, View: RedomComponentConstructor, key?: string, initData?: any): List;
```

| Argument | Type                        | Description    |
| -------- | --------------------------- | -------------- |
| parent   | `RedomQuery`                | parent element |
| View     | `RedomComponentConstructor` |                |
| key      | `string`                    |                |
| initData | `any`                       |                |

### Mount

```ts
export function mount(
    parent: RedomElement,
    child: RedomElement,
    before?: RedomElement,
    replace?: boolean
): RedomElement;
```

| Argument | Type           | Description                                              |
| -------- | -------------- | -------------------------------------------------------- |
| parent   | `RedomElement` | parent node.                                             |
| child    | `RedomElement` | node to append to the given parent node.                 |
| before   | `RedomElement` | you pass a before value, it works like `insertBefore()`. |
| replace  | `boolean`      | if pass true it works like `replaceChild()`.             |

### Unmount

```ts
export function unmount(parent: RedomElement, child: RedomElement): RedomElement;
```

| Argument | Type           | Description                              |
| -------- | -------------- | ---------------------------------------- |
| parent   | `RedomElement` | parent node.                             |
| child    | `RedomElement` | node to append to the given parent node. |

### Place

```ts
export function place(View: RedomComponentConstructor, initData?: any): Place;
```

| Argument | Type                        | Description |
| -------- | --------------------------- | ----------- |
| View     | `RedomComponentConstructor` |             |
| initData | `any`                       |             |

### Router

```ts
export function router(parent: RedomQuery, Views: RouterDictionary, initData?: any): Router;
```

| Argument | Type               | Description |
| -------- | ------------------ | ----------- |
| parent   | `RedomQuery`       |             |
| Views    | `RouterDictionary` |             |
| initData | `any`              |             |

### Set Attribute

```ts
export function setAttr(view: RedomElement, arg1: string | object, arg2?: string): void;
```

| Argument | Type              | Description |
| -------- | ----------------- | ----------- |
| view     | `RedomElement`    |             |
| arg1     | `string | object` |             |
| arg2     | `string`          |             |

### Set Style

```ts
export function setStyle(view: RedomElement, arg1: string | object, arg2?: string): void;
```

| Argument | Type              | Description |
| -------- | ----------------- | ----------- |
| view     | `RedomElement`    |             |
| arg1     | `string | object` |             |
| arg2     | `string`          |             |

### Set Children

```ts
export function setChildren(parent: RedomElement, children: RedomElement[]): void;
```

| Argument | Type           | Description |
| -------- | -------------- | ----------- |
| parent   | `RedomElement` |             |
| children | `RedomElement` |             |

### SVG

```ts
export function svg(query: RedomQuery, ...args: RedomQueryArgument[]): SVGElement;
export function s(query: RedomQuery, ...args: RedomQueryArgument[]): SVGElement;
```

| Argument | Type                   | Description |
| -------- | ---------------------- | ----------- |
| query    | `RedomQuery`           |             |
| ...args  | `RedomQueryArgument[]` |             |

### Text

```ts
export function text(str: string): Text;
```

| Argument | Type     | Description |
| -------- | -------- | ----------- |
| str      | `string` |             |
