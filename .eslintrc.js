module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // AirBnB rulesets result in tons of cases where we abuse them.
    //"airbnb-base",
    //"airbnb/rules/react",
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    semi: "off", // disabled to not conflict with the following one
    "@typescript-eslint/semi": "warn",
    "no-var": "warn",

    // Disabled all the triggered rules,
    // we can enable and solve them one at a time
    "react/react-in-jsx-scope": "off",
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "prefer-const": "warn",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-extra-semi": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "no-case-declarations": "off",
    "react/prop-types": "off",
    // Prettier still formats upon save, it's just not displayed as a lint error
    "prettier/prettier": "off",
    // AirBnB
    "no-plusplus": "off",
    "no-continue": "off",
    "lines-between-class-members": "off",
    "react/self-closing-comp": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": "off",
    "no-return-assign": "off",
    "class-methods-use-this": "off",
    "no-console": "off",
    "no-shadow": "off",
    "no-else-return": "off",
    "spaced-comment": "off",
    "react/destructuring-assignment": "off",
    "react/button-has-type": "off",
    "react/jsx-filename-extension": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "react/require-default-props  ": "off",
    "operator-assignment": "off",
  },
};
