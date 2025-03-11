import logoJpg from '@/assets/images/logo.png';
import graduationJpg from '@/assets/images/graduation.jpg';
import graduationWebp from '@/assets/images/graduation.webp';
import workstationJpg from '@/assets/images/workstation.jpg';
import workstationWebp from '@/assets/images/workstation.webp';

// project cover images
import project1Jpg from '@/assets/images/project1.jpg';
import project2Jpg from '@/assets/images/project2.jpg';
import project3Jpg from '@/assets/images/project3.jpg';
import project4Jpg from '@/assets/images/project4.jpg';

import backgroundCover from '@/assets/videos/background-cover.mp4';
import cv from '@/assets/docs/Stefano-Biddau-CV.pdf';

import type { ImageName, DocName, VideoName } from '@/types';

export const IMAGES: Record<ImageName, { jpg: string; webp?: string }> = {
  logoImg: { jpg: logoJpg },
  graduationImg: { jpg: graduationJpg, webp: graduationWebp },
  workstationImg: { jpg: workstationJpg, webp: workstationWebp },
  project1Img: { jpg: project1Jpg },
  project2Img: { jpg: project2Jpg },
  project3Img: { jpg: project3Jpg },
  project4Img: { jpg: project4Jpg },
};

export const DOCS: Record<DocName, string> = {
  cvDoc: cv,
};

export const VIDEOS: Record<VideoName, string> = {
  backgroundCoverVideo: backgroundCover,
};
