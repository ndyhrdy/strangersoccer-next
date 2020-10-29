const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        primary: { ...defaultTheme.colors.red },
      },
      fontFamily: { sans: ["Inter", ...defaultTheme.fontFamily.sans] },
    },
  },
  variants: {},
  plugins: [],
};
