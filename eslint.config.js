import { defineConfig } from "eslint/config"
import js from "@eslint/js"
import globals from "globals"
import pluginVue from "eslint-plugin-vue"
import json from "@eslint/json"
import css from "@eslint/css"
import eslintConfigPrettier from "eslint-config-prettier"

export default defineConfig([
  { ignores: ["**/dist/**", "**/docs/**"] },
  { files: ["**/*.{js,mjs,cjs,vue}"], plugins: { js }, extends: ["js/recommended"] },
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginVue.configs["flat/essential"],
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  {
    files: ["**/*.jsonc"],
    plugins: { json },
    language: "json/jsonc",
    extends: ["json/recommended"],
  },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  eslintConfigPrettier,
])
