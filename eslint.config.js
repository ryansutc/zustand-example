import * as importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import eslintPluginReact from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import {
  defineConfig,
  globalIgnores,
} from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

import js from "@eslint/js";

export default defineConfig([
  globalIgnores([".config/", "dist/", "release.config.cjs"]),

  ...tseslint.config(
    // Base JavaScript rules
    js.configs.recommended,
    // TypeScript rules using tseslint.config()
    tseslint.configs.recommended
  ),

  // Global rules:

  // @ts-expect-error won't be null
  importPlugin.flatConfigs.recommended, // make sure imports are good
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat["jsx-runtime"],
  reactHooks.configs["recommended-latest"],

  // Global settings:
  {
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          // use <root>/path/to/folder/tsconfig.json
          project: "./tsconfig.json", //  we need this for alias'ed imports
        },
        //https://www.npmjs.com/package/eslint-import-resolver-webpack
        // webpack: {
        //   config: "../../webpack.config.js", // this should be full path to webpack config overriden in host package
        // },
      },
    },

    languageOptions: {
      ecmaVersion: "latest",
      globals: Object.fromEntries(
        Object.entries({
          ...globals.browser,
          ...globals.serviceworker,
        }).map(([key, value]) => [key.trim(), value])
      ),
    },

    // global rules, rule overrides:
    rules: {
      "import/no-deprecated": "warn",
      // General ESLint rules that we've downgraded to warnings:
      "no-console": "warn",
      eqeqeq: "warn",
      "prefer-const": "warn",
      "prefer-destructuring": [
        "warn",
        {
          array: true,
          object: true,
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      "no-else-return": "warn",
      "prefer-arrow-callback": "warn",
      "class-methods-use-this": [
        "warn",
        {
          exceptMethods: ["render"],
        },
      ],
      camelcase: [
        "warn",
        {
          ignoreGlobals: true,
          ignoreImports: true,
        },
      ],
      "max-params": ["warn", 4],
      "no-param-reassign": [
        "warn",
        {
          props: true,
          ignorePropertyModificationsFor: [
            "state", // for redux state, when we use immer
            "acc", // for reducer call conventions
          ],
        },
      ],
    },
  },

  // React rules
  {
    name: "React Ruleset",
    plugins: {
      react: eslintPluginReact,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      // React-specific rules

      // https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+

      "react-hooks/rules-of-hooks": "error", // Enforce hooks rules
      "react-hooks/exhaustive-deps": "warn", // Warn about missing deps

      // Accessibility rules
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
    files: ["**/*.{jsx,tsx}"],
  },

  {
    name: "TypeScript Ruleset",
    files: ["**/*.{ts,mts,jsx,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
      },
    },
  },
]);
