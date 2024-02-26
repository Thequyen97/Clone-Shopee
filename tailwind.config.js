// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
export const theme = {
  extend: {
    colors: {
      orange: '#ee4d2d'
    }
  }
}
export const plugins = [
  plugin(function ({ addComponents, theme }) {
    addComponents({
      '.container': {
        maxWidth: theme('columns.7xl'),
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: theme('spacing.4'),
        paddingRight: theme('spacing.4')
      }
    })
  }),
  require('@tailwindcss/line-clamp')
]
