import type { StrapiMediaFileV5 } from '@/types/strapi.types';
import type { UIButton, UIMetaTag } from '@/types/ui.types';
import type { BModal, BSection } from '@/types/block.types';
import type { BForm } from '@/types/block.types';

type PageUID =
  | 'page-elements.home'
  | 'page-elements.about-me'
  | 'page-elements.my-projects'
  | 'page-elements.my-skills'
  | 'page-elements.terms-and-conditions'
  | 'page-elements.privacy-policy';

interface GeneralPage {
  __component: PageUID;
  pageMeta: UIMetaTag;
  startTitle: string;
}

interface TermsPage extends GeneralPage {
  title: string;
  lastUpdate: string;
  description: string;
}

export interface HomePage extends Omit<GeneralPage, 'startTitle'> {
  // sample fields
  firstHeading: string;
  secondHeading: string;
  thirdHeading: string[];

  // CTA and form
  contactCta: UIButton;
  downloadCvCta: UIButton;
  contactForm: BForm;

  // MEDIA
  backgroundVideo: StrapiMediaFileV5;
  backgroundVideoCover?: StrapiMediaFileV5;
}

export interface AboutMePage extends GeneralPage {
  bio: BSection[];
}
export interface MySkillsPage extends GeneralPage {
  skillsInfoPanel: BSection;
  skillsModal: BModal<{
    searchField: { label: string; placeholder: string };
    filters: Record<string, string>;
  }>;
  skillsBio: BSection[];
}
export interface MyProjectsPage extends GeneralPage {
  presentation: BSection;
}

export interface TermsAndConditionsPage extends TermsPage {
  terms: {
    serviceDescription: {
      title: string;
      content: string;
    };
    userObligations: {
      title: string;
      description: string;
      points: string[];
      note: string;
    };
    liabilityLimitations: {
      title: string;
      description: string;
      points: string[];
    };
    intellectualProperty: {
      title: string;
      content: string;
    };
    legal: {
      title: string;
      description: string;
      points: string[];
    };
    modifications: {
      title: string;
      content: string;
    };
  };
}
export interface PrivacyPolicyPage extends TermsPage {
  policy: {
    dataController: {
      title: string;
      content: string;
    };
    dataCollected: {
      title: string;
      description: string;
      points: string[];
      note: string;
    };
    thirdPartyServices: {
      title: string;
      description: string;
      linkText: string;
      linkUrl: string;
    };
    dataSharing: {
      title: string;
      content: string;
    };
    userRights: {
      title: string;
      description: string;
      rights: string[];
      note: string;
    };
    legalBasis: {
      title: string;
      content: string;
    };
  };
}

export type PageType =
  | AboutMePage
  | HomePage
  | PrivacyPolicyPage
  | MySkillsPage
  | MyProjectsPage
  | TermsAndConditionsPage;
