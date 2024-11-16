import { type SkillIcon } from '@/assets';

/** GLOBAL **/
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type NotificationCategory = 'info' | 'success' | 'error';
type Locale = 'en' | 'it';

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
  imagePath?: string;
  imageDescription?: string;
}

interface Rating {
  name: string;
  value: number;
}

/** HEADER **/
interface HeaderContent {
  navbarRoutes: {
    text: string;
    path: string;
  }[];
}

/** HOME PAGE **/
interface HomePageContent {
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
  icon?: SkillIcon;
  type: SkillType;
  overAllRating: Overall;
}

interface SkillsPageContent {
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

/** NOT FOUND PAGE **/
interface NotFoundPageContent {
  firstHeading: string;
  secondHeading: string;
  goHomeButton: Button;
}

export type {
  Breakpoint,
  Locale,
  Notification,
  NotificationCategory,
  HeaderContent,
  HomePageContent,
  ContactMeFormFileds,
  ContactMeFormValidation,
  AboutMePageContent,
  SkillsPageContent,
  SkillInfo,
  SkillType,
  NotFoundPageContent,
};
