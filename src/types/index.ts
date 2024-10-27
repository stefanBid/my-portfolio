import { type SkillIcon } from '@/assets';
/** GLOBAL **/
type NotificationType = 'info' | 'success' | 'error';

/** SKILLS PAGE **/
type SkillSection = 'FE' | 'BE' | 'WD';
type SkillType = 'feLanguage' | 'beLanguage' | 'feFramework' | 'beFramework' | 'beDb';

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

export type { Section, SkillSection, SkillType, Rating, SkillInfo, NotificationType };
