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
		zIndex: {
			'sb-base-1': 100,
			'sb-base-2': 200,
			'sb-base-3': 300,
			'sb-base-4': 400,
			'sb-base-5': 500,
			'sb-header-collapsed': 950,
			'sb-header': 1000,
			'sb-dialog-overlay': 1050,
			'sb-dialog': 1100,
			'sb-dropdown': 1200,
			'sb-tooltip': 1300,
			'sb-notification': 1400,
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
		colors: {
			'black': '#000000',
			'white': '#ffffff',
			'transparent': 'transparent',
			'sb-main': '#0F0F20',
			'sb-error': '#d32f2f',
			'sb-secondary': {
				100: '#707890',
				200: '#424a6e',
				300: '#011e41'
			},
			'sb-tertiary': {
				100: '#e95905',
				200: '#a33503'
			},
		},
		extend: {
      boxShadow: {
        'sb-ring-sm': '0 0 10px 3px var(--tw-shadow-color)',
        'sb-ring': '0 0 15px 5px var(--tw-shadow-color)',
        'sb-ring-lg': '0 0 20px 7px var(--tw-shadow-color)',
			},
			
		},
	},
	plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-luminous': {
           textShadow: '0 0 10px rgba(156, 163, 175, 0.7), 0 0 20px rgba(156, 163, 175, 0.6), 0 0 30px rgba(156, 163, 175, 0.5)',
				},
				'.transition-sb-fast': {
          'transition-property': 'all',
          'transition-duration': '150ms',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.transition-sb-normal': {
          'transition-property': 'all',
          'transition-duration': '300ms',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.transition-sb-slow': {
          'transition-property': 'all',
          'transition-duration': '500ms',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
				},
				
      }, ['responsive', 'hover', 'focus-visible', 'focus', 'active', 'disabled']);
    }
  ],
};