import { el, list } from "redom";

class Link {
    constructor() {
        this.el = el("a", {
            class: "block flex items-center hover:text-gray-700 ml-5",
        });
    }

    update(data) {
        const { link, text, icon } = data;
        this.el.target = "_blank";
        this.el.href = link;
        this.el.title = text;
        this.el.innerHTML = icon;
    }
}

export default class TopNav {
    constructor() {
        this.el = el("div", {
            class: "flex justify-start items-center text-gray-500",
        });
        this.list = list(this.el, Link, "id");
    }

    update(data) {
        this.list.update(data.map(item => item));
    }
}
