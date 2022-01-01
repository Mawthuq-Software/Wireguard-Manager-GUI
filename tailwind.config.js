module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },

    fontFamily: {
      sans: ["'Source Sans Pro'"],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D6AD5B',
          light: '#A37A29',
          dark: '#CC9933',
          grayscale: '#CC9933',
          translucent: '#D6AD5B80',
        },
        secondary: {
          DEFAULT: '#5C6AD7',
          light: '#2836A4',
          dark: '#3244CD',
          grayscale: '#C2C7F0',
          translucent: '#5C6AD780',
        },
        background: {
          DEFAULT: '#202427',
          light: '#2E3235',
        },
        success: {
          DEFAULT: '#5CD761',
          translucent: '#5CD76180',
        },
        warning: {
          DEFAULT: '#E18745',
          light: '#DC7123',
          dark: '#B05A1C',
          grayscale: '#F4D4BD',
          translucent: '#E1874580',
        },
        danger: {
          DEFAULT: '#C24444',
          translucent: '#C2444480',
        },
        inactive: {
          DEFAULT: '#BFBFBF'
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
