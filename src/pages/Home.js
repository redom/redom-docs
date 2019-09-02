import { el, list, svg } from "redom";

import { contributors, backers } from "../../.redomdoc/config.js";

import "./../styles/home.css";

export default class Home {
    constructor() {
        this.el = el(
            "div",
            {},
            el(
                "div#hero",
                {
                    class: "z-40 w-full relative mx-auto px-6 pt-8 sm:pb-24 mb-16",
                },
                el(
                    "div",
                    {
                        class: "flex flex-col px-6 mx-auto items-center  max-w-4xl ",
                    },
                    el("img", {
                        src: "./static/images/redomjs.svg",
                        alt: "Re:dom Logo",
                        class: "self-center w-32 sm:w-40  my-12",
                    }),
                    el(
                        "h1",
                        { class: "text-2xl sm:text-4xl font-light leading-tight text-center" },
                        "Tiny (2 KB) turboboosted JavaScript library for creating user interfaces."
                    ),
                    el(
                        "div",
                        { class: "flex flex-col sm:flex-row mt-12 w-full justify-center" },
                        el(
                            "a",
                            {
                                href: "#installation",
                                class:
                                    "sm:inline-flex items-center tracking-wider flex justify-center uppercase rounded-full px-8 py-3 sm:mr-4 mb-4 border border-primary text-base font-semibold text-primary",
                            },
                            "Get Started"
                        ),
                        el(
                            "a",
                            {
                                href: "https://github.com/redom/redom/",
                                target: "_blank",
                                class:
                                    "sm:inline-flex items-center tracking-wider flex justify-center uppercase rounded-full px-8 pl-2 py-2 mb-4 border border-gray-200 bg-gray-200 text-base font-semibold text-gray-700",
                            },
                            svg(
                                "svg",
                                {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    class: "fill-current w-8 h-8 mr-3",
                                    viewBox: "0 0 20 20",
                                },
                                svg("path", {
                                    d:
                                        "M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0",
                                })
                            ),
                            "Github"
                        )
                    )
                )
            ),
            el(
                "div",
                {
                    class: "flex flex-col sm:flex-row mx-auto max-w-6xl mb-24 sm:mb-48 pb-8 text-center",
                },
                el(
                    "div",
                    {
                        class: "sm:w-1/3 pb-8 px-4",
                    },
                    el("h2", { class: "text-xl font-medium mb-4 text-gray-700" }, "Small & Powerful"),
                    el("p", {}, "Useful helpers to create DOM elements and keeping them in sync with the data.")
                ),
                el(
                    "div",
                    {
                        class: "sm:w-1/3 pb-8 px-4",
                    },
                    el("h2", { class: "text-xl font-medium mb-4 text-gray-700" }, "High Performance"),
                    el(
                        "p",
                        {},
                        "Close to the metal and",
                        el("strong", {}, " doesn't use virtual DOM "),
                        "it's actually",
                        el("strong", {}, "  faster "),
                        "and uses",
                        el("strong", {}, "  less memory "),
                        "than almost all virtual DOM based libraries, including React ",
                        el(
                            "a",
                            {
                                class: "text-primary hover:underline",
                                target: "_blank",
                                title: "Benchmark",
                                href:
                                    "https://rawgit.com/krausest/js-framework-benchmark/master/webdriver-ts-results/table.html",
                            },
                            "(benchmark)"
                        ),
                        "."
                    )
                ),
                el(
                    "div",
                    {
                        class: "sm:w-1/3 pb-8 px-4",
                    },
                    el("h2", { class: "text-xl font-medium mb-4 text-gray-700" }, "Easy to Learn"),
                    el(
                        "p",
                        {},
                        "You can use just",
                        el("strong", {}, " pure JavaScript "),
                        "so no complicated templating languages to learn and hassle with."
                    )
                )
            ),
            el(
                "div#contributors",
                { class: "text-center relative text-gray-700" },
                svg(
                    "svg",
                    {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 1440 320",
                    },
                    svg("path", {
                        fill: "currentColor",
                        d:
                            "M0 288h48c48 0 144 0 240-5.3C384 277 480 267 576 240c96-27 192-69 288-69.3 96 .3 192 42.3 288 69.3s192 37 240 42.7l48 5.3v32H0z",
                    })
                ),
                el(
                    "div",
                    {
                        class: "w-full max-w-6xl relative mx-auto px-6",
                    },
                    el("h2", { class: "text-gray-600 text-xl font-medium mb-4" }, "Contributors"),
                    el("p", { class: "mb-8" }, "This project exists thanks to all the people who contribute."),
                    (this.contributors = list("div.flex.flex-wrap.justify-center", Contributor, "id"))
                )
            ),
            el(
                "div#backers",
                { class: "text-center text-gray-700" },
                el(
                    "div",
                    {
                        class: "w-full max-w-6xl relative mx-auto px-6 pt-16 pb-4",
                    },
                    el("h2", { class: "text-gray-600 text-xl font-medium mb-4" }, "Backers"),
                    el("p", { class: "mb-8" }, "Thank you to all our backers!"),
                    (this.backers = list("div.flex.flex-wrap.justify-center.mb-6", Backer, "id")),
                    el(
                        "a",
                        {
                            href: "https://opencollective.com/redom#backers",
                            target: "_blank",
                            class:
                                "tracking-wider mb-4 rounded-full px-6 py-2 sm:mr-4 border border-primary text-sm font-semibold text-primary",
                        },
                        "Become a Backer!"
                    )
                )
            ),
            el(
                "div#sponsors",
                { class: "text-center text-gray-700" },
                el(
                    "div",
                    {
                        class: "w-full max-w-6xl relative mx-auto px-6 pt-16 pb-24",
                    },
                    el("h2", { class: "text-gray-600 text-xl font-medium mb-4" }, "Sponsors"),
                    el(
                        "p",
                        { class: "mb-8" },
                        "Support this project by becoming a sponsor. Your logo will show up here with a link to your website."
                    ),
                    (this.sponsors = list("div.flex.flex-wrap.justify-center.mb-6", Backer, "id")),
                    el(
                        "a",
                        {
                            href: "https://opencollective.com/redom/sponsor/0/website",
                            target: "_blank",
                            class:
                                "tracking-wider mb-4 rounded-full px-6 py-2 sm:mr-4 border border-primary text-sm font-semibold text-primary",
                        },
                        "Become a Sponsor!"
                    )
                )
            )
        );

        this.contributors.update(contributors);
        this.backers.update(backers);
    }
}

export class Contributor {
    constructor() {
        this.el = el("a");
    }

    update(data) {
        const { html_url, avatar_url, login } = data;
        this.el = el(
            "a",
            {
                href: html_url,
                target: "_blank",
                "data-title": login,
                title: login,
                class: "my-2 mx-2",
            },
            el("img", {
                class: "w-10 h-10 rounded-full",
                alt: login,
                src: avatar_url,
            })
        );
    }
}

export class Backer {
    constructor() {
        this.el = el("a");
    }

    update(data) {
        const { name, image, website, profile } = data;
        let backer;
        if (image !== "null") {
            backer = el("img", {
                class: "w-16 h-16 rounded-full",
                alt: name,
                src: image,
            });
        } else {
            backer = el(
                "div",
                {
                    class: "flex items-center justify-center font-semibold bg-gray-300 w-16 h-16 rounded-full",
                },
                name[0]
            );
        }

        this.el = el(
            "a",
            {
                href: website !== "null" ? website : profile,
                "data-title": name,
                title: name,
                target: "_blank",
                class: "my-2 mx-2 w-16 h-16",
            },
            backer
        );
    }
}
