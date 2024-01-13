import resolve from "@rollup/plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";

const config = [
    {
        input: "./dist/dts/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "es" }],
        external: [/\.css$/],
        plugins: [dts.default()],
    },
    {
        input: "lib/index.ts",
        output: [
            {
                file: `dist/esm/SimpleSoundStudioComponents.js`,
                format: "esm",
                sourcemap: true,
                exports: "named",
                name: "SimpleSoundStudioComponents",
            },
            {
                file: `dist/cjs/SimpleSoundStudioComponents.js`,
                format: "cjs",
                sourcemap: true,
                exports: "named",
                name: "SimpleSoundStudioComponents",
            },
        ],
        plugins: [
            external(),
            resolve({
                browser: true,
            }),
            commonjs({
                include: /node_modules/,
                requireReturnsDefault: "auto",
            }),
            postcss({
                minimize: true,
                inject: {
                    insertAt: "top",
                }
            }),
            typescript({
                sourceMap: true,
                inlineSources: true,
                inlineSourceMap: true,
                noEmit: true
            }),
            terser({
                sourceMap: true
            }),
            cleanup(),
        ],
    },
];

export default config;
