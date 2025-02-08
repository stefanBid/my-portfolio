import logo from '@/assets/images/logo.png';
import graduation from '@/assets/images/graduation.jpg';
import workstation from '@/assets/images/workstation.jpg';
import backgroundCover from '@/assets/videos/background-cover.mp4';
import cv from '@/assets/docs/Stefano-Biddau-CV.pdf';

export type MediaName =
  | 'logoImg'
  | 'graduationImg'
  | 'workstationImg'
  | 'backgroundCoverVideo'
  | 'cvDoc';

export const MEDIA: Record<MediaName, string> = {
  logoImg: logo,
  graduationImg: graduation,
  workstationImg: workstation,
  backgroundCoverVideo: backgroundCover,
  cvDoc: cv,
};
