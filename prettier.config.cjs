// @ts-check
/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  useTabs: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  plugins: [
    "prettier-plugin-svelte",
    "prettier-plugin-packagejson",
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
  tailwindFunctions: ["cn", "cva"],
  tailwindStylesheet: "./src/app.css",
  importOrder: ["^~/components/.*$", "^~/lib/.*$", "^\\.\\.?/.*$"],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
};
