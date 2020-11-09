module.exports = {
  env: {
    browser: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 5,
  },
  extends: 'eslint:recommended',
  rules: {
    'func-names': ['error', 'always'],
  },
  overrides: [
    {
      files: ['src/react.js'],
      parserOptions: {
        ecmaVersion: 12,
      },
    },
  ],
};
