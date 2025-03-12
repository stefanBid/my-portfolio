import logoJpg from '@/assets/images/logo.png';
import graduationJpg from '@/assets/images/graduation.jpg';
import graduationWebp from '@/assets/images/graduation.webp';
import workstationJpg from '@/assets/images/workstation.jpg';
import workstationWebp from '@/assets/images/workstation.webp';

// project cover images
import project1Jpg from '@/assets/images/project1.jpg';
import project1Webp from '@/assets/images/project1.webp';
import project2Jpg from '@/assets/images/project2.jpg';
import project2Webp from '@/assets/images/project2.webp';
import project3Jpg from '@/assets/images/project3.jpg';
import project3Webp from '@/assets/images/project3.webp';
import project4Jpg from '@/assets/images/project4.jpg';
import project4Webp from '@/assets/images/project4.webp';

import backgroundCover from '@/assets/videos/background-cover.mp4';
import cv from '@/assets/docs/Stefano-Biddau-CV.pdf';

import type { ImageName, DocName, VideoName } from '@/types';

export const IMAGES: Record<ImageName, { jpg: string; webp?: string }> = {
  logoImg: { jpg: logoJpg },
  graduationImg: { jpg: graduationJpg, webp: graduationWebp },
  workstationImg: { jpg: workstationJpg, webp: workstationWebp },
  project1Img: { jpg: project1Jpg, webp: project1Webp },
  project2Img: { jpg: project2Jpg, webp: project2Webp },
  project3Img: { jpg: project3Jpg, webp: project3Webp },
  project4Img: { jpg: project4Jpg, webp: project4Webp },
};

export const DOCS: Record<DocName, string> = {
  cvDoc: cv,
};

export const VIDEOS: Record<VideoName, string> = {
  backgroundCoverVideo: backgroundCover,
};
