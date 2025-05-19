// types/index.ts (Types Barrel Export File)

/** GLOBAL **/
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type NotificationCategory = 'info' | 'success' | 'error';
type Locale = 'en' | 'it';
type IconName =
  | 'AngularIcon'
  | 'CSharpIcon'
  | 'CssIcon'
  | 'GithubIcon'
  | 'GraphqlIcon'
  | 'HibernateIcon'
  | 'HtmlIcon'
  | 'InstagramIcon'
  | 'ItalyIcon'
  | 'JsIcon'
  | 'JavaIcon'
  | 'LinkedinIcon'
  | 'MysqlIcon'
  | 'NpmIcon'
  | 'PythonIcon'
  | 'ReactIcon'
  | 'RocketIcon'
  | 'SpringIcon'
  | 'TsIcon'
  | 'UkIcon'
  | 'VueIcon';

type ImageName =
  | 'logoImg'
  | 'graduationImg'
  | 'workstationImg'
  | 'project1Img'
  | 'project2Img'
  | 'project3Img'
  | 'project4Img'
  | 'project5Img';

type DocName = 'cvDoc';
type VideoName = 'backgroundCoverVideo';

interface Notification {
  id: string;
  message: string;
  type: NotificationCategory;
  visibilityDuration: number;
}

interface InputField {
  label: string;
  placeholder: string;
}

interface Button {
  text: string;
  link?: string;
}
interface Section {
  titleHeading: string;
  subTitleHeading: string;
  contentParagraph: string;
  imagePath?: ImageName;
  imageDescription?: string;
}

interface Rating {
  name: string;
  value: number;
}

interface MetaDescription {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  robots?: string;
  copyright?: string;
}

/** HEADER **/
interface HeaderContent {
  navbarRoutes: {
    text: string;
    path: string;
  }[];
}

/** FOOTER **/
interface FooterContent {
  intro: {
    title: string;
    description: string;
    socials: {
      id: string;
      value: string;
    }[];
  };
  quickLinks: {
    title: string;
    links: {
      text: string;
      link: string;
    }[];
  };
  contacts: {
    title: string;
    channels: {
      id: string;
      value: string;
    }[];
  };
  helpAndSupport: {
    title: string;
    links: {
      text: string;
      link: string;
    }[];
  };
}

/** HOME PAGE **/
interface HomePageContent {
  metaDescription: MetaDescription;
  firstHeading: string;
  secondHeading: string;
  thirdHeading: string[];
  contactMeButton: Button;
  downloadCvButton: Button;
  contactMeForm: {
    title: string;
    info: string;
    fullNameField: InputField;
    emailField: InputField;
    messageField: InputField;
    agreeToTermsField: string;
    submitButton: Button;
    resetButton: Button;
  };
}

interface ContactMeFormFileds {
  name: string;
  email: string;
  message: string;
  agreeToTerms: boolean;
}

interface ContactMeFormValidation {
  name: { show: boolean; message: string };
  email: { show: boolean; message: string };
  message: { show: boolean; message: string };
  agreeToTerms: { show: boolean };
}

/** ABOUT ME PAGE **/
interface AboutMePageContent {
  metaDescription: MetaDescription;
  pageHeading: string;
  bioSections: Section[];
}

/** SKILLS PAGE **/
type SkillType = 'feLanguage' | 'beLanguage' | 'feFramework' | 'beFramework' | 'beDb';

interface Overall {
  // Common
  syntaxAndSemantics?: Rating;
  librariesAndFrameworks?: Rating;
  debuggingAndProblemSolving?: Rating;
  practicalExperience?: Rating;
  // Frontend
  renderingAndInteractivity?: Rating;
  // Backend
  bestPracticesAndDesignPatterns?: Rating;
  // Frameworks
  architectureAndStructure?: Rating;
  integrationAndConfiguration?: Rating;
  extensibility?: Rating;
  toolingAndAutomation?: Rating;
  communityAndSupport?: Rating;
  // Databases
  querySkills?: Rating;
  performanceOptimization?: Rating;
  dataModeling?: Rating;
  securityAndIntegrity?: Rating;
}

interface SkillInfo {
  id: string;
  name: string;
  icon: IconName;
  type: SkillType;
  overAllRating: Overall;
}

interface SkillsPageContent {
  metaDescription: MetaDescription;
  pageHeading: string;
  callToActionFirstHeading: string;
  callToActionSecondHeading: string;
  exploreSkillsButton: Button;
  skillsSections: Section[];
  skillsDialog: {
    title: string;
    info: string;
    searchField: InputField;
  };
  skillsList: SkillInfo[];
}

/** PROJECTS PAGE **/
interface ProjectsPageContent {
  metaDescription: MetaDescription;
  pageHeading: string;
  firstHeading: string;
  firstParagraph: string;
  projects: {
    id: string;
    title: string;
    imagePath: ImageName;
    platformIcon: IconName;
    codeLink: string;
    demoLink?: string;
  }[];
}

/** PRIVACY POLICY PAGE **/
interface PrivacyPolicyPageContent {
  metaDescription: MetaDescription;
  pageHeading: string;
  privacyPolicy: PrivacyPolicySection;
}

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

/** TERMS AND CONDITIONS PAGE **/
interface TermsAndConditionsPageContent {
  metaDescription: MetaDescription;
  pageHeading: string;
  termsAndConditions: TermsAndConditionsSection;
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

/** NOT FOUND PAGE **/
interface NotFoundPageContent {
  metaDescription: MetaDescription;
  firstHeading: string;
  secondHeading: string;
  goHomeButton: Button;
}

export type {
  Breakpoint,
  Locale,
  IconName,
  ImageName,
  DocName,
  VideoName,
  Notification,
  NotificationCategory,
  MetaDescription,
  HeaderContent,
  FooterContent,
  HomePageContent,
  ContactMeFormFileds,
  ContactMeFormValidation,
  AboutMePageContent,
  SkillsPageContent,
  SkillInfo,
  SkillType,
  ProjectsPageContent,
  PrivacyPolicyPageContent,
  TermsAndConditionsPageContent,
  NotFoundPageContent,
};
