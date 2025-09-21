export interface UiButton {
  text: string;
  icon?: string;
  link?: string;
  size: 'small' | 'medium';
  variant: 'white' | 'tertiary';
  type: 'button' | 'submit' | 'reset';
}

export interface UiCover {
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface UiInputField {
  label?: string;
  placeholder?: string;
  type: 'text' | 'email' | 'textarea' | 'checkbox';
  errors?: Record<string, string>;
}

export interface UiLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface UiSection {
  title: string;
  subtitle?: string;
  paragraph: string;
  cover?: UiCover;
}
