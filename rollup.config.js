/* eslint-disable no-undef */
import minify from "rollup-plugin-babel-minify";
import serve from "rollup-plugin-serve";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";

module.exports = {
    input: "src/app.js",
    output: {
        file: "dist/main.js",
        format: "esm",
    },
    plugins: [
        postcss({
            extract: true,
        }),
        process.env.BUILD !== "production" ? serve() : "",
        resolve(),
        commonjs(),
        process.env.BUILD === "production" ? minify() : "",
    ],
};
