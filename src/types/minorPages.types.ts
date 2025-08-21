import type { MetaDescription, Button } from '@/types/common.types';

interface PrivacyPolicySection {
  title: string;
  lastUpdate: string;
  description: string;
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
}

export interface PrivacyPolicyPageContent {
  metaDescription: MetaDescription;
  pageHeading: string;
  privacyPolicy: PrivacyPolicySection;
}

interface TermsAndConditionsSection {
  title: string;
  lastUpdate: string;
  description: string;
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
}

export interface TermsAndConditionsPageContent {
  metaDescription: MetaDescription;
  pageHeading: string;
  termsAndConditions: TermsAndConditionsSection;
}

export interface NotFoundPageContent {
  metaDescription: MetaDescription;
  firstHeading: string;
  secondHeading: string;
  goHomeButton: Button;
}
