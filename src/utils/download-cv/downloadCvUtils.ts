import { MEDIA } from '@/constants';

export const downloadCv = (): void => {
  // CV file name
  const fileName = 'CV-Stefano-Biddau.pdf';

  // Create a new <a> element for the download simulation
  const link = document.createElement('a');
  link.href = MEDIA.cvDoc;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
