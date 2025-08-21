import type { MetaDescription, Button, InputField, Section } from '@/types/common.types';

type SkillType = 'feLanguage' | 'beLanguage' | 'feFramework' | 'beFramework' | 'beDb';

interface Stats {
  name: string;
  value: number;
}

export interface SkillInfo {
  id: string;
  name: string;
  icon: string;
  type: SkillType;
  mastered?: boolean;
  stats: Stats[];
}

export interface SkillsPageContent {
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
