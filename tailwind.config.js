/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit-Regular', 'sans-serif'],
        "outfit-thin": ['Outfit-Thin', 'sans-serif'],
        "outfit-bold": ['Outfit-Bold', 'sans-serif'],
        "outfit-extrabold": ['Outfit-ExtraBold', 'sans-serif'],
        "outfit-extralight": ['Outfit-ExtraLight', 'sans-serif'],
        "outfit-medium": ['Outfit-Medium', 'sans-serif'],
        "outfit-semibold": ['Outfit-SemiBold', 'sans-serif'],
        "outfit-black": ['Outfit-Black', 'sans-serif'],
        "outfit-light": ['Outfit-Light', 'sans-serif'],
      }
    },
  },
  plugins: [],
}