module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'no-console': ['off'],
    'no-unused-vars': ['warn'],
    'vue/require-default-prop': 'off',
    'no-lonely-if': 'off',
    'no-return-assign': 'off',
  },
}
