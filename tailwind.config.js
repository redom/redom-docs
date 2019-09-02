/* eslint-disable no-undef */
const config = require("./.redomdoc/config.js");
const defaultConfig = require("tailwindcss/defaultConfig");

module.exports = {
    theme: {
        colors: Object.assign(defaultConfig.theme.colors, config.theme.colors),
        screens: {
            sm: "576px",
            md: "768px",
            lg: "992px",
            xl: "1280px",
        },
        extend: {
            maxWidth: theme => {
                return {
                    "screen-xl": theme("screens.xl"),
                };
            },
        },
    },
};
