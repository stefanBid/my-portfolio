export type NotificationCategory = 'info' | 'success' | 'error';

export interface UINotification {
  id: string;
  message: string;
  type: NotificationCategory;
  visibilityDuration: number;
}

export interface UIButton {
  text: string;
  icon?: string;
  link?: string;
  size?: 'small' | 'medium';
  variant?: 'white' | 'tertiary';
  type?: 'button' | 'submit' | 'reset';
}

export interface UIContact {
  value: string;
  type: 'email' | 'number';
  icon?: string;
}

export interface UIInputField {
  inputId: string;
  type: 'text' | 'email' | 'textarea' | 'checkbox';
  mandatory?: boolean;
  regexValidation?: string;
  label?: string;
  placeholder?: string;
  errors?: Record<string, string>;
}

export interface UILevelBar {
  name: string;
  level: number;
}

export interface UILink {
  label: string;
  href: string;
  isExternal?: boolean;
  name?: string;
  icon?: string;
}

export interface UIMetaTag {
  title: string;
  description?: string;
}
