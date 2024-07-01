import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');
const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      color: {
        primary: '#F6F6EE',
        white: '#FFFFFF',
        yellow: '#B9D13D',
        green: '#1BDA38',
        orange: '#FF8A41',
        secondary: '#393e46',
        dark: '#2A2F37',
        red: '#C97B5A',
        gray: '#D4D4D4',
        gray2: '#ADADAD',
        blue: '#1789FC',
        transparant: 'rgba(0, 0, 0, 0.5)',
        input: '#E4E4E4',
        pink: '#DCA8A3',
        textPink: '#9A9090',
        cream: '#EBEBDF',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
