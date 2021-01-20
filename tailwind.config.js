module.exports = {
  theme: {},
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    margin: ['responsive', 'hover', 'last'],
  },
  plugins: [],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
    options: {
      safelist: [/^bg-\w+-[369]00/],
    },
  },
}
