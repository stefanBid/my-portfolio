import logoJpg from '@/assets/images/logo.png';
import graduationJpg from '@/assets/images/graduation.jpg';
import graduationWebp from '@/assets/images/graduation.webp';
import workstationJpg from '@/assets/images/workstation.jpg';
import workstationWebp from '@/assets/images/workstation.webp';

import backgroundCover from '@/assets/videos/background-cover.mp4';
import cv from '@/assets/docs/Stefano-Biddau-CV.pdf';

import type { ImageName, DocName, VideoName } from '@/types';

export const IMAGES: Record<ImageName, { jpg: string; webp?: string }> = {
  logoImg: { jpg: logoJpg },
  graduationImg: { jpg: graduationJpg, webp: graduationWebp },
  workstationImg: { jpg: workstationJpg, webp: workstationWebp },
};

export const DOCS: Record<DocName, string> = {
  cvDoc: cv,
};

export const VIDEOS: Record<VideoName, string> = {
  backgroundCoverVideo: backgroundCover,
};
