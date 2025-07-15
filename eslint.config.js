// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    //
    ignores: ["dist", "build", "storybook-static"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unsafe-declaration-merging": "off", // same name for interface and class
      "@typescript-eslint/no-unused-vars": "off", // unused arrow function params
      "@typescript-eslint/no-empty-object-type": "off", // component state interface = {}
      "@typescript-eslint/no-unused-expressions": "off", // short circuiting
      "@typescript-eslint/no-explicit-any": "off", // it's a prototype project, sometimes the type is the least of our problems
      "@typescript-eslint/no-this-alias": "off", // we do have some `this` aliases
      "prefer-const": "warn", // yes, we do, but it's not that serious
      "no-case-declarations": "warn", // also not that serious
    },
  },
  storybook.configs["flat/recommended"]
);
