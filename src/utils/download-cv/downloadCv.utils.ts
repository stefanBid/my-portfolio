export const downloadCv = (): void => {
  // CV file name
  const fileName = 'CV-Stefano-Biddau.pdf';
  const cvUrl = '/docs/Stefano-Biddau-CV.pdf';

  // Create a new <a> element for the download simulation
  const link = document.createElement('a');
  link.href = cvUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
