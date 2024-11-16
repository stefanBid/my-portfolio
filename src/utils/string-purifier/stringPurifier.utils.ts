import DOMPurify from 'dompurify';

export const stringPurifier = (dirtyString: string): string => {
  return DOMPurify.sanitize(dirtyString);
};
