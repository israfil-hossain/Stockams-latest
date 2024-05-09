/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./Apps.{js,jsx,ts,tsx}",
      "./Apps/**/*.{js,jsx,ts,tsx}",
      "./Apps/components/**/*.{js,jsx,ts,tsx}",
      "./Apps/pages/**/*.{js,jsx,ts,tsx}"
     
    ],
    theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
      extend: {
        colors: {
          primary: "#DCE102", // Replace with your primary color
          black: "#2D2D2A",
          secondary: "#FDB3CA",
          grey: "#E7E9E2",
          tertiary: "#B3FAFF",
          gray2: "#E7E9E2",
          smokewhite: "#F5F5F5", // Replace with your secondary color
        },
      },
    },
    plugins: [],
  };
  