export const downloadCv = (): void => {
  // CV file name
  const fileName = 'CV-Stefano-Biddau.pdf';
  const cvUrl = '/src/assets/docs/Stefano-Biddau-CV.pdf';

  // Create a new <a> element for the download simulation
  const link = document.createElement('a');
  link.href = '/src/assets/docs/Stefano-Biddau-CV.pdf';
  link.setAttribute('download', fileName);
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
