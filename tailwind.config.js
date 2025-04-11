// /** @type {import('tailwindcss').Config} */
// export default {
//     content: [
//       "./index.html",
//       "./src/**/*.{js,ts,jsx,tsx}",
//     ],
//     theme: {
//       extend: {},
//     },
//     plugins: [require("daisyui")],  
//   };
// tailwind.config.js
// export default {
//     theme: {
//       extend: {
//         keyframes: {
//           slideOutLeft: {
//             '0%': { transform: 'translateX(0)', opacity: 1 },
//             '100%': { transform: 'translateX(-100%)', opacity: 0 },
//           },
//           slideOutRight: {
//             '0%': { transform: 'translateX(0)', opacity: 1 },
//             '100%': { transform: 'translateX(100%)', opacity: 0 },
//           },
//         },
//         animation: {
//           slideOutLeft: 'slideOutLeft 0.3s ease-in forwards',
//           slideOutRight: 'slideOutRight 0.3s ease-in forwards',
//         },
//       },
//     },
//     plugins: [],
//   }



export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
  
    theme: {
      extend: {
        fontFamily: {
          sans: ["Poppins", "sans-serif"], // This makes font-sans use Poppins
        },
      },
    },
    plugins: [],
  };