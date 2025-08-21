export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type NotificationCategory = 'info' | 'success' | 'error';
export type Locale = 'en' | 'it';

export interface Notification {
  id: string;
  message: string;
  type: NotificationCategory;
  visibilityDuration: number;
}

export interface InputField {
  label: string;
  placeholder: string;
}

export interface Button {
  text: string;
  link?: string;
}

export interface Image {
  webp?: string;
  jpg: string;
}

export interface Section {
  titleHeading: string;
  subTitleHeading: string;
  contentParagraph: string;
  image?: Image;
  imageDescription?: string;
}

export interface MetaDescription {
  title: string;
  author: string;
  robots: string;
  description?: string;
  keywords?: string[];
  copyright?: string;
}
