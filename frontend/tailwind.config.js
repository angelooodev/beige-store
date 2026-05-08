/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables your standard Light/Dark mode toggle
  theme: {
    extend: {
      colors: {
        'mocha-dark': '#1F1A14',
        'mocha-base': '#3F3527',
        'mocha-light': '#6A5B3D',
        'olive-accent': '#A4946A',
        'cream-bg': '#E6DEC7',
      },
      backgroundImage: {
        // A subtle topographic pattern using SVG data
        'topography': "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23A4946A\\' fill-opacity=\\'0.1\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}