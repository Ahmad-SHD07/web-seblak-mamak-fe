/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // warna utama
        "primary" : "#D32F2F",
        "on-primary" : "#ffffff",
        "primary-container": "#d32f2f",
        "on-primary-container": "#fff2f0",


        // warna sekunder dan aksen
        "secondary" : "#F57C00",
        "on-secondary": "#ffffff",
        "secondary-container": "#fc820c",
        "on-secondary-container": "#5e2c00",

        // warna background dan elemen
        "background" : "#FAFAFA",
        "on-background": "#1b1c1c",
        "surface": "#fcf9f8",
        "surface-dim": "#dcd9d9",
        "surface-bright": "#fcf9f8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae7e7",
        "surface-container-highest": "#e5e2e1",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#5b403d",
        "surface-variant": "#e5e2e1",
        "outline": "#8f6f6c",
        "outline-variant": "#e4beba",

        // warna tetap
        "dark" : "#212121"
      },
      spacing: {
        // Sistem Grid dan Spacing Custom
        "base": "8px",
        "xs": "4px",
        "sm": "12px",
        "md": "24px",
        "lg": "40px",
        "xl": "64px",
        "gutter": "20px",
        "container-margin-mobile": "16px",
        "container-margin-desktop": "120px"
      },
      fontFamily: {
        // Font Custom
        "headline-xl": ["Montserrat", "sans-serif"],
        "headline-lg": ["Montserrat", "sans-serif"],
        "headline-lg-mobile": ["Montserrat", "sans-serif"],
        "headline-md": ["Montserrat", "sans-serif"],
        "headline-sm": ["Montserrat", "sans-serif"],
        "price-display": ["Montserrat", "sans-serif"],
        "body-lg": ["Plus Jakarta Sans", "sans-serif"],
        "body-md": ["Plus Jakarta Sans", "sans-serif"],
        "body-sm": ["Plus Jakarta Sans", "sans-serif"],
        "label-lg": ["Plus Jakarta Sans", "sans-serif"],
        "label-md": ["Plus Jakarta Sans", "sans-serif"]
      },
      fontSize: {
        // ukuran font
        "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-lg-mobile": ["28px", { lineHeight: "34px", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-lg": ["14px", { lineHeight: "20px", fontWeight: "700" }],
        "label-md": ["12px", { lineHeight: "16px", fontWeight: "600" }],
        "price-display": ["22px", { lineHeight: "28px", fontWeight: "700" }],
      },
      boxShadow:{
        "soft-spice": "0 4px 24px rgba(33, 33, 33, 0.08)"
      },
    },
  },
  plugins: [],
}

