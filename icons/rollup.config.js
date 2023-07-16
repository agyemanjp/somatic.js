import typescript from "@rollup/plugin-typescript"
import {nodeResolve} from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"

export default [
    {
        input: "preview/icon-preview.tsx",
        output: {dir: 'dist/public', format: 'esm'},
        preserveEntrySignatures: false,
        context: "window",
        plugins: [
            nodeResolve({browser: true}),
            commonjs(),
            json(),
            typescript({
                target: "ES2017",
                module: "esnext",
                outDir: "dist/public"
            }),]
    }
]
