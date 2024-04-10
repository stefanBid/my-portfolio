export const downloadCv = () => {
	// CV path
	const cvUrl = '/cv/Stefano_Biddau_CV.pdf';
	const fileName = 'CV-Stefano-Biddau.pdf';

	// Create a new <a> element for the download simulation
	const link = document.createElement('a');
	link.href = cvUrl;
	link.setAttribute('download', fileName);
	document.body.appendChild(link);

	link.click();

	document.body.removeChild(link);
};