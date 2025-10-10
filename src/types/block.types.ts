import type { UIButton, UIInputField, UILink, UIContact } from '@/types/ui.types';
import type { StrapiMediaFileV5 } from '@/types/strapi.types';

export interface BFooter {
  title: string;
  description: string;
  social?: UILink[];
  quickLinksTitle?: string;
  quickLinks?: UILink[];
  contactsTitle?: string;
  contacts?: UIContact[];
  helpAndSupportTitle?: string;
  helpAndSupport?: UILink[];
}

export interface BModal<T> {
  title?: string;
  info?: string;
  icon?: string;
  extra: T | null;
}

export interface BForm extends BModal<null> {
  fields: UIInputField[];
  resetBtn?: UIButton;
  submitBtn?: UIButton;
}

export interface BSection {
  title: string;
  paragraph?: string;
  subtitle?: string;
  cover?: StrapiMediaFileV5;
  extraInfo?: Record<string, unknown> | null;
}
