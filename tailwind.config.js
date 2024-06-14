/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		screens: {
			xs: { max: '639px' },
			sm: { min: '640px', max: '767px' },
			md: { min: '768px', max: '1023px' },
			lg: { min: '1024px', max: '1279px' },
			xl: { min: '1280px', max: '1535px' },
			'2xl': { min: '1536px' },
		},
		fontFamily: {
			bebas: ['Bebas Neue', 'sans-serif'],
			roboto: ['Roboto', 'sans-serif'],
		},
		fontSize: {
			'sb-xs': '0.75rem',  // extra small
			'sb-sm': '0.875rem', // small
			'sb-base': '1rem',   // base
			'sb-lg': '1.125rem', // large
			'sb-xl': '1.25rem',  // extra large
			'sb-2xl': '1.5rem',  // 2 extra large
			'sb-3xl': '1.875rem',// 3 extra large
      'sb-4xl': '2.5rem',   // 4 extra large, 
      'sb-5xl': '3.5rem',   // 5 extra large, 
      'sb-6xl': '4.5rem',   // 6 extra large, 
      'sb-7xl': '5.5rem'    // 7 extra large, 
		},
		extend: {
			colors: {
				main: '#0A0909',
				secondary: '#1F1E1E',
			},
			padding: {
				'sb-side-sm': '0 5%',
				'sb-side-base': '0 6%',
				'sb-side-lg': '0 7%',
			},
			margin: {
				'sb-top-sm': '14% 0 0 0',
				'sb-top-base': '15% 0 0 0',
				'sb-top-lg': '16% 0 0 0',
			},
			boxShadow: {
				'sb-light': '0 10px 20px rgba(255, 255, 255, 0.15), 0 5px 10px rgba(255, 255, 255, 0.1), 0 2px 4px rgba(255, 255, 255, 0.05)'
			},
		},
	},
	plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-luminous': {
           textShadow: '0 0 10px rgba(156, 163, 175, 0.7), 0 0 20px rgba(156, 163, 175, 0.6), 0 0 30px rgba(156, 163, 175, 0.5)',
        },
      }, ['responsive', 'hover']);
    }
  ],
};