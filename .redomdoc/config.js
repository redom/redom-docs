const backers = require("./backers.js");
const contributors = require("./contributors.js");

module.exports = {
    startPage: "https://mauroreisvieira.github.io/redomjs.org/",
    contributors: contributors,
    backers: backers,
    docsRepo: "https://github.com/mauroreisvieira/redomjs.org/blob/master/",
    version: "3.x",
    theme: {
        colors: {
            primary: "#d31b33",
            accent: "#673ab7",
        },
    },
    algolia: {
        applicationID: "<APPLICATION_ID>",
        apiKey: "<API_KEY>",
        index: "<INDEX_NAME>",
    },
    topNav: [
        {
            text: "Twitter",
            link: "https://twitter.com/redomjs/",
            icon:
                '<svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-5 h-5" viewBox="0 0 20 20"><path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"/></svg>',
        },
        {
            text: "Github",
            link: "https://github.com/redom/redom/",
            icon:
                '<svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-5 h-5" viewBox="0 0 20 20"><path d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"/></svg>',
        },
    ],
    sideNav: [
        {
            path: false,
            text: "Guide",
            link: false,
            meta: false,
            children: [
                {
                    path: "#installation",
                    text: "Installation",
                    link: "docs/v3/guide/installation.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#introduction",
                    text: "Introduction",
                    link: "docs/v3/guide/introduction.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#elements",
                    text: "Elements",
                    link: "docs/v3/guide/elements.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#svg",
                    text: "SVG",
                    link: "docs/v3/guide/svg.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#set-children",
                    text: "Set Children",
                    link: "docs/v3/guide/set-children.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#update-elements",
                    text: "Update elements",
                    link: "docs/v3/guide/update-elements.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#mounting",
                    text: "Mounting",
                    link: "docs/v3/guide/mounting.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#components",
                    text: "Components",
                    link: "docs/v3/guide/components.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#lists",
                    text: "Lists",
                    link: "docs/v3/guide/lists.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#lifecycle",
                    text: "Lifecycle",
                    link: "docs/v3/guide/lifecycle.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#place",
                    text: "Place",
                    link: "docs/v3/guide/place.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#router",
                    text: "Router",
                    link: "docs/v3/guide/router.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#jsx",
                    text: "JSX",
                    link: "docs/v3/guide/jsx.md",
                    meta: false,
                    children: [],
                },
            ],
        },
        {
            path: false,
            text: "Misc",
            link: false,
            meta: false,
            children: [
                {
                    path: "#api",
                    text: "API Reference",
                    link: "docs/v3/api/index.md",
                    meta: false,
                    children: [],
                },
            ],
        },
        {
            path: false,
            text: "Examples",
            link: false,
            meta: false,
            children: [
                {
                    path: "#todomvc",
                    text: "TodoMVC",
                    link: "docs/v3/examples/todomvc.md",
                    meta: false,
                    children: [],
                },
                {
                    path: "#commits",
                    text: "GitHub Commits",
                    link: "docs/v3/examples/commits.md",
                    meta: false,
                    children: [],
                },
            ],
        },
    ],
};
