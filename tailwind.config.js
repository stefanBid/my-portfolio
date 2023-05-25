/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    /**My screen dimension */
    screens: {
      '2xl': {'max': '1535px'},
      'xl': {'max': '1279px'},
      'lg': {'max': '1200px'},
      'md': {'max': '991px'},
      'sm': {'max': '768px'},
    },
    /**My color palette */
    colors:{
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'pink':{
        DEFAULT: '#f72585'
      },
      'board':{
        DEFAULT:'#323946',
        dark:'#1f242d'
      },
    },
    /**My font family */
    fontFamily:{
      'poppins': ['Poppins', 'sans-serif']
    },
    /**My font size */
    fontSize:{
      'percent-sm':'50%',
      'percent-base':'62.5%',
      'title-sm':'2.2rem',
      'title-base':'3.2rem',
      'title-lg':'4.2rem',
      '1.6': '1.6rem',
      '1.8': '1.8rem',
      '2':'2rem',
      '3':'3rem'
    },

    /* My Border */
    borderWidth:{
      DEFAULT: '.1rem',
      '0': '0',
      '2':'.2rem',
      '3':'.3rem',
      '4':'.4rem',
      '5':'.5rem',
      '6':'.6rem',
    },

    extend:{
      borderRadius:{
        'button':'4rem',
        'input':'2rem'
      },
      boxShadow:{
        'button':'0 0 1rem'
      }
    }
  },
  plugins: [],
}
