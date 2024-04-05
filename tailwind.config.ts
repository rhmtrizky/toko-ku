import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      color: {
        primary: '#eeeeee',
        green: '#1BDA38',
        secondary: '#393e46',
        dark: '#222831',
        red: '#F80000',
        gray: '#D4D4D4',
        blue: '#1789FC',
        transparant: 'rgba(0, 0, 0, 0.5)',
        input: '#E4E4E4',
      },
    },
  },
  plugins: [],
};
export default config;
