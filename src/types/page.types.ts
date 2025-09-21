import type { UiButton, UiCover } from '@/types/ui.types';
import type { BForm, BMetaTag } from '@/types/block.types';
export type PageType =
  | HomePage
  | AboutPage
  | ProjectsPage
  | SkillsPage
  | TermsAndConditionsPage
  | PrivacyPolicyPage
  | NotFoundPage;

export interface HomePage {
  metaTags: BMetaTag;
  firstHeading: string;
  secondHeading: string;
  thirdHeading: string[];
  contactCta: UiButton;
  downloadCvCta: UiButton;
  contactForm: BForm;
  backgroundVideo: UiCover;
  backgroundVideoCover?: UiCover;
}

export interface AboutPage {
  metaTags: BMetaTag;
}

export interface ProjectsPage {
  metaTags: BMetaTag;
}

export interface SkillsPage {
  metaTags: BMetaTag;
}
export interface TermsAndConditionsPage {
  metaTags: BMetaTag;
}

export interface PrivacyPolicyPage {
  metaTags: BMetaTag;
}

export interface NotFoundPage {
  metaTags: BMetaTag;
}
