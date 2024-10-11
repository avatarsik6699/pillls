module.exports = {
  ignorePatterns: ["dist/", "node_modules/"],
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  settings: {
    "react": {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      },
    },
  },

  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "@typescript-eslint",
    "react",
    "tailwindcss",
    "eslint-plugin-unused-imports",
    "simple-import-sort",
    "prettier",
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
    {
      files: ["src/shared/api/endpoints.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],

  rules: {
    "tailwindcss/no-custom-classname": "error",
    "tailwindcss/classnames-order": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-namespace": "off",

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",

    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/no-named-as-default-member": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "@typescript-eslint/consistent-type-imports": "error",

    "no-unused-vars": "off", // or "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
  },
};
