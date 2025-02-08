const images = import.meta.glob('@/assets/images/*.{png,jpg,jpeg,svg}', { eager: true });

const getImage = (imgName: string): string => {
  const imgRoot = '/src/assets/images/';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (images[imgRoot + imgName] as any)?.default || '';
};

export const IMG_MEDIA_MAP: Record<string, string> = {
  logoImg: getImage('logo.png'),
  graduationImg: getImage('graduation-img.jpg'),
  workstationImg: getImage('work-img.jpg'),
};
