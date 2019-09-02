import { el } from "redom";
import Markdown from "./../Markdown";
import SideBar from "./../SideBar";

import { sideNav } from "../../../.redomdoc/config.js";

export default class Main {
    constructor() {
        this.el = el(
            "main#main",
            {
                class: "lg:flex w-full mx-auto m-auto",
            },
            (this.aside = el(
                "aside#sidebar",
                {
                    class:
                        "h-screen bg-gray-100 z-40 hidden fixed top-0 h-full w-full lg:sticky lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block",
                },
                (this.sideNav = new SideBar())
            )),
            (this.content = el("div#content", {
                class: "bg-white min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 px-6",
            }))
        );

        document.addEventListener("on:click-button", () => {
            this.aside.classList.toggle("hidden");
        });

        document.addEventListener("on:click-item", () => {
            this.aside.classList.toggle("hidden");
        });

        this.update();
    }

    update() {
        sideNav.map(item => {
            if (item.path === location.hash) {
                this._current = item;
                return;
            }

            if (item.children.length) {
                item.children.map(subItem => {
                    if (subItem.path === location.hash) {
                        this._current = subItem;
                    }
                });
            }
        });
        this.sideNav.update(sideNav);
        new Markdown(this._current.link, this.content);
    }
}
