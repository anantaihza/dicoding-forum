/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'xl-primary': '10px 1px 98px -22px rgba(74,160,235,0.77)',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#4AA0EB',
          accent: '#979797',
          neutral: '#383838',
          'base-100': '#EBF5FF',
        },
      },
    ],
  },
};
