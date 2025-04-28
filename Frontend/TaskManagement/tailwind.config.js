/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Main buttons, highlights
        secondary: "#818CF8", // Button hover, light action
        accent: "#EF4444", // Delete button, high priority
        success: "#22C55E", // Completed tasks
        warning: "#FACC15", // Medium priority
        low: "#3B82F6", // Low priority
        background: "#F9FAFB", // App background
        card: "#FFFFFF", // Task cards
        navbar: "#1F2937", // Navbar/sidebar background
        textMain: "#111827", // Task titles
        textSub: "#6B7280", // Timestamps, small text
      },
    },
  },
  plugins: [],
};
