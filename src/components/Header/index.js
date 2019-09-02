import { el, svg } from "redom";
import TopNav from "./../TopNav";

import { startPage, topNav, version } from "../../../.redomdoc/config.js";

export default class Header {
    constructor() {
        this.el = el(
            "header#header",
            {
                class: "flex bg-white border-b border-gray-200 fixed top-0 inset-x-0 z-50 lg:z-40 px-6 items-center",
            },
            el(
                "div",
                { class: "h-16  flex w-full mx-auto" },
                el(
                    "div",
                    {
                        class: "lg:w-1/4",
                    },
                    (this.logo = el(
                        "a#logo",
                        {
                            class: "lg:hidden flex items-center h-full font-light text-xl",
                            href: startPage,
                        },
                        "RE:DOM"
                    ))
                ),
                el(
                    "div",
                    {
                        class: " max-w-screen-xl items-center flex flex-grow justify-end lg:w-3/4",
                    },
                    el(
                        "div",
                        { class: "relative" },
                        el(
                            "label",
                            {
                                id: "selectversion",
                                class: "hidden",
                            },
                            "Select Version"
                        ),
                        el(
                            "select",
                            {
                                role: "listbox",
                                "aria-labelledby": "selectversion",
                                tabindex: "0",
                                id: "version",
                                class:
                                    "appearance-none block bg-white pl-2 pr-8 py-1 text-gray-500 font-medium text-base focus:outline-none",
                            },
                            el(
                                "option",
                                {
                                    value: "v3",
                                },
                                version
                            )
                        ),
                        el(
                            "div",
                            {
                                class:
                                    "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500",
                            },
                            svg(
                                "svg",
                                {
                                    class: "fill-current h-4 w-4",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 20 20",
                                },
                                svg("path", {
                                    d: "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z",
                                })
                            )
                        )
                    ),
                    el("div", { class: "hidden lg:flex" }, (this.nav = new TopNav())),
                    (this.button = el(
                        "button",
                        {
                            "arial-label": "Menu",
                            role: "button",
                            class:
                                "flex pl-4 items-center lg:hidden text-gray-500 focus:outline-none focus:text-gray-700",
                        },
                        svg(
                            "svg",
                            {
                                class: "fill-current w-4 h-4",
                                xmlns: "http://www.w3.org/2000/svg",
                                viewBox: "0 0 20 20",
                            },
                            svg("path", {
                                d: "M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z",
                            })
                        )
                    ))
                )
            )
        );

        this.nav.update(topNav);

        this.button.addEventListener("click", e => {
            const event = new CustomEvent("on:click-button", { detail: e, bubbles: true });
            this.button.dispatchEvent(event);
        });
    }
}
