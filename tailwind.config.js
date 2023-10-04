/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'arial', 'sans-serif'],
      },
      backgroundImage: () => ({
        'kitchen-utensils': "url('$lib/images/kitchen-utensils.png')",
      }),
    }
  },
  plugins: [],
}
