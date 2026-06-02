import type { Config } from 'tailwindcss';

// 温暖、克制、可信赖的"医疗杂志感"调色板
// cream = 柔和米色背景, sage = 鼠尾草绿(主), navy = 哑光海军蓝(文字/次),
// clay = 用于错误提示的柔和陶土色(代替刺眼红), amber/orange = 等级用柔和色
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fbf8f3',
          100: '#f4eee4',
          200: '#e8ddca',
        },
        sage: {
          50: '#eef3ee',
          100: '#dce7da',
          200: '#bcd0b8',
          300: '#94b58e',
          400: '#6f9a68',
          500: '#54804d',
          600: '#42683d',
          700: '#345231',
        },
        navy: {
          50: '#eef1f5',
          100: '#dde3ec',
          200: '#bcc7d6',
          300: '#90a1b8',
          400: '#647693',
          500: '#465775',
          600: '#36455e',
          700: '#2a3749',
          800: '#1f2937',
        },
        clay: {
          600: '#a9573f',
        },
        amber: {
          50: '#fdf6e9',
          200: '#f3dca6',
          500: '#c9a23b',
        },
        orange: {
          50: '#fbf0e6',
          200: '#f0c9a3',
          500: '#c98341',
        },
      },
      fontFamily: {
        display: [
          'Iowan Old Style',
          'Charter',
          'Georgia',
          'Times New Roman',
          'serif',
        ],
        sans: [
          'Avenir Next',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 18px 48px rgba(42, 55, 73, 0.10)',
        inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.72)',
      },
    },
  },
  plugins: [],
};

export default config;
