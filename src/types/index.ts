import { type SkillIcon } from '@/assets';

type SkillSection = 'FE' | 'BE' | 'WD';
type SkillType = 'feLanguage' | 'beLanguage' | 'feFramework' | 'beFramework' | 'beDb';
type Rating = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5 | 5.5 | 6 | 6.5 | 7 | 7.5 | 8 | 8.5 | 9 | 9.5 | 10;

interface Section {
	titleHeading: string;
	subTitleHeading: string;
	contentParagraph: string;
	imagePath?: string;
	imageDescription?: string;
}

interface SkillInfo {
  id: string;
  name: string;
  icon?: SkillIcon;
	type: SkillType;
  overAllRating: {
    syntaxAndSemantics: Rating;
    librariesAndFrameworks: Rating;
    debuggingAndProblemSolving: Rating;
    bestPracticesAndDesignPatterns: Rating;
    practicalExperience: Rating;
  }
}

export type { Section, SkillSection, SkillType, Rating, SkillInfo };