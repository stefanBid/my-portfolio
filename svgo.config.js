export default {
	multipass: true,
	plugins: [
			{ name: 'removeDoctype', active: true },
			{ name: 'removeComments', active: true },
			{ name: 'cleanupIds', active: false },
	]
};