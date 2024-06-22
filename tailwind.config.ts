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
        green: '#1BDA38',
        secondary: '#393e46',
        dark: '#222831',
        red: '#BC7050',
        gray: '#D4D4D4',
        gray2: '#ADADAD',
        blue: '#1789FC',
        transparant: 'rgba(0, 0, 0, 0.5)',
        input: '#E4E4E4',
        pink: '#DCA8A3',
        textPink: '#9A9090',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
