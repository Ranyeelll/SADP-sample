
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: '#5A3E2B',
          dark: '#3E2A1C',
          light: '#7A5A42',
        },
        beige: '#E8DCCB',
        gold: {
          DEFAULT: '#C8A45D',
          dark: '#A8853F',
          light: '#DDBE85',
        },
        charcoal: '#2B2B2B',
        parchment: {
          DEFAULT: '#F5EBD8',
          light: '#FAF3E2',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'Cormorant Garamond', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['EB Garamond', 'Lora', 'Georgia', 'serif'],
      },
    },
  },
}
