import type { PageType } from '@/types/page.types';
import type { UIButton, UILevelBar, UILink } from '@/types/ui.types';
import type { StrapiMediaFileV5 } from '@/types/strapi.types';
import type { BFooter } from '@/types/block.types';

export interface Portfolio {
  id: number;
  documentId: string;
  locale: 'it' | 'en';
  pages: PageType[]; // Dynamic Zone
  routes: UILink[];
  footer: BFooter;
}

export type SkillType =
  | 'beLanguage'
  | 'feLanguage'
  | 'beFramework'
  | 'feFramework'
  | 'database'
  | 'tool'
  | 'other';

export interface Skill {
  id: number;
  documentId: string;
  locale: 'it' | 'en';
  name: string;
  type: SkillType;
  overall: UILevelBar[];
  icon?: string;
  isGod?: boolean;
}

export interface Project {
  id: number;
  documentId: string;
  locale: 'it' | 'en';
  name: string;
  codebaseCta?: UIButton;
  deployCta?: UIButton;
  cover?: StrapiMediaFileV5;
}
