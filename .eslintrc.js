module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'module-resolver'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    'module-resolver/use-alias': 2,
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
