import type { UiButton, UiCover, UiInputField } from '@/types/ui.types';

export interface BForm {
  fields: UiInputField[];
  formInfo?: string;
  icon?: string;
  resetBtn: UiButton;
  confirmBtn: UiButton;
}

export interface BMetaTag {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  copyright?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
  altLocale?: string;
}

export interface BProjectCard {
  name: string;
  cover?: UiCover;
  deployCta?: UiButton;
  codebaseCta?: UiButton;
}

export interface BSkillCard {
  name: string;
  type: 'beLanguage' | 'feLanguage' | 'beFramework' | 'feFramework' | 'database' | 'tool' | 'other';
  icon?: string;
  isGod?: boolean;
}
