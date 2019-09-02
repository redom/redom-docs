import { router, mount } from "redom";
import { Home, Doc } from "./pages/index";
import * as data from "../.redomdoc/config.js";

import "./styles/prism.css";
import "./styles/tailwind.css";

const app = router("div#app", {
    home: Home,
    doc: Doc,
});

if (window.location.hash) {
    app.update("doc", data);
} else {
    app.update("home", data);
}

window.addEventListener("hashchange", () => {
    window.scroll(0, 0);
    if (window.location.hash) {
        app.update("doc", data);
    } else {
        app.update("home", data);
    }
});

mount(document.body, app);
