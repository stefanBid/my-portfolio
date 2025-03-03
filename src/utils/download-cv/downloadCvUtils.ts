export const downloadCv = (filePath: string, nameToSave: string): void => {
  const link = document.createElement('a');
  link.href = filePath;
  link.setAttribute('download', nameToSave);
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};
