import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        gradientBtn: 'linear-gradient(to bottom,#264966,#12344d)',
        gradientHoverBtn: 'linear-gradient(to bottom,#12344d,#12344d)',
        disabledGradientBtn: 'linear-gradient(to bottom,#92a4b2,#8899a6)',
        logoutBtn: 'linear-gradient(to bottom,#fff,#f3f5f7)',
        logoutHoverBtn: 'linear-gradient(to bottom,#ebebeb,#ebebeb)',
      },
    },
  },
  plugins: [],
};
export default config;
