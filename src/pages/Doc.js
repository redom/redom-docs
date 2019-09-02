import { el } from "redom";
import Header from "./../components/Header";
import Main from "./../components/Main";

export default class Doc {
    constructor() {
        this.el = el("div", { class: "bg-gray-100" }, (this.header = new Header()), (this.main = new Main()));
    }

    update() {
        this.main.update();
    }
}
