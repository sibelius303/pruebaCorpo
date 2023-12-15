/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'negro': '#231f20',
        'Pantone562': '#007366',
        'Pantone499': '#6c3231',
        'BlancoIvory': '#fffdf0',
        'Cobre': '#f29464',
        'Gris': '#ededed',
        'GrisFondo': '#f5f5f5',
        'Verde': '#4ED03B',
        'Rojo': '#FF0000',
        'rojo-pantone': '#8C2226',
        'azul-pantone': '#1B103B'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [  require('@tailwindcss/forms'), require('tailwind-scrollbar')],
}
