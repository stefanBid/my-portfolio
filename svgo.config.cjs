module.exports = {
	multipass: true,
	plugins: [
		{ name: 'removeDoctype', active: true },
		{ name: 'removeComments', active: true },
		{ name: 'cleanupIds', active: false }, // disabilita la rimozione degli ID

	]
};