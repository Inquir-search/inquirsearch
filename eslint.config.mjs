import globals from "globals";
import pluginJs from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import prettierConfig from "eslint-config-prettier";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  airbnbBase,
  prettierConfig,
  {
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
