module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'plugin:sonarjs/recommended'
  ],
  plugins: [
    'vue',
    'sonarjs'
  ],
  rules: {
    'eol-last': 0,
    'no-new': 'off',
    'no-multiple-empty-lines': 1,
    'arrow-parens': 0,
    'camelcase': 0,
    'no-tabs': 'off',
    'no-unused-vars': 'off',
    'no-unreachable': 'off',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 1,
    "space-before-function-paren": ["off", "always"]
  },
  globals: {
  }
}
