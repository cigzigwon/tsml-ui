import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import scss from 'rollup-plugin-scss';
import { terser } from "rollup-plugin-terser";
import { uglify } from "rollup-plugin-uglify";
import json from '@rollup/plugin-json';
import packageJSON from "./package.json";
const input = "./src/index.js";
const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");

export default [
  // CommonJS
  {
    input,
    output: {
      file: packageJSON.main,
      format: "cjs",
      inlineDynamicImports: true
    },
    plugins: [
      external(),
      resolve(),
      commonjs({
        exclude: [
          "src/**"
        ]
      }),
      babel({
        exclude: "node_modules/**"
      }),
      scss({ output: true }),
      json()
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.main),
      format: "cjs",
      inlineDynamicImports: true
    },
    plugins: [
      external(),
      resolve(),
      commonjs({
        exclude: [
          "src/**"
        ]
      }),
      babel({
        exclude: "node_modules/**"
      }),
      scss({ output: true }),
      json(),
      uglify()
    ]
  },
  {
    input,
    output: {
      file: packageJSON.browser,
      inlineDynamicImports: true,
      format: "umd",
      name: "tsmlUI",
      globals: {
        react: "React",
      }
    },
    plugins: [
      external(),
      resolve(),
      commonjs({
        exclude: [
          "src/**"
        ]
      }),
      babel({
        exclude: "node_modules/**"
      }),
      scss({ output: true }),
      json()
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.browser),
      inlineDynamicImports: true,
      format: "umd",
      name: "tsmlUI",
      globals: {
        react: "React",
      }
    },
    plugins: [
      external(),
      resolve(),
      commonjs({
        exclude: [
          "src/**"
        ]
      }),
      babel({
        exclude: "node_modules/**"
      }),
      scss({ output: true }),
      json(),
      terser()
    ]
  },
  {
    input,
    output: {
      file: packageJSON.module,
      inlineDynamicImports: true,
      format: "es",
      exports: "named"
    },
    plugins: [
      external(),
      resolve(),
      commonjs({
        exclude: [
          "src/**"
        ]
      }),
      babel({
        exclude: "node_modules/**"
      }),
      scss({ output: true }),
      json(),
    ]
  },
  {
    input,
    output: {
      file: minifyExtension(packageJSON.module),
      inlineDynamicImports: true,
      format: "es",
      exports: "named"
    },
    plugins: [
      resolve(),
      commonjs({
        exclude: [
          "src/**"
        ]
      }),
      babel({
        exclude: "node_modules/**"
      }),
      external(),
      scss({ output: true }),
      json(),
      terser()
    ]
  }
];