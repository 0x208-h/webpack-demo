module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: 0,
    "react/jsx-filename-extension": 0,
    "no-use-before-define": 'off',
    // eslint不能匹配 .tsx后缀的文件
    // 'import/extensions': ['2', 'ignorePackages', {
    //   js: 'never',
    //   ts: 'never',
    //   jsx: 'never',
    //   tsx: 'never',
    // }],
  },
};
