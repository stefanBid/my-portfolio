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

			gilroy: ['Gilroy', 'sans-serif'],
			bebas: ['Bebas Neue', 'sans-serif'],
		},
		extend: {
			colors: {
				main: '#0A0909',
				secondary: '#1F1E1E',
			},
		},
	},
	plugins: [],
};