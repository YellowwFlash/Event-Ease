/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addBase }) {
      addBase({
        '::-webkit-scrollbar': {
          width: '22px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(to left, #6B46C1 0%, #E9D8FD 100%)',
          borderRadius: '20px',
          border: '6px solid transparent',
          backgroundClip: 'content-box',
        },
      });
    },
  ],
};


