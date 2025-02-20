// Objective: Open a link in a new tab
export const openLink = (url: string): void => {
  if (typeof window === 'undefined') return;

  if (!url || typeof url !== 'string') {
    console.warn('openLink: The URL is not valid.');
    return;
  }

  window.open(url.trim(), '_blank', 'noopener,noreferrer');
};
