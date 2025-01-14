import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import external from "rollup-plugin-peer-deps-external";
import bundleScss from "rollup-plugin-bundle-scss";
import sass from "rollup-plugin-sass";

export default {
    input: "src/index.ts",
    output: [
        {
            file: "dist/index.js",
            format: "cjs",
            sourcemap: true
        },
        {
            file: "dist/index.es.js",
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        bundleScss({output: 'scotch-ui.scss'}),
        sass({output: 'dist/scotch-ui.css', variables: true}),
        external(),
        resolve(),
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true, tsconfig: './tsconfig.build.json' }),
    ]
};