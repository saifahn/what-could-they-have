module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': [0],
    '@typescript-eslint/explicit-member-accessibility': [0],
  },
}
