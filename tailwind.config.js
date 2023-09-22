/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'arial', 'sans-serif'],
      },
      backgroundImage: (theme) => ({
        'kitchen-utensils': "url('./src/lib/images/kitchen-utensils.png')",
      }),
    }
  },
  plugins: [],
}
