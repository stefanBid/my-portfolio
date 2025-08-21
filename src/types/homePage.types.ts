import type { MetaDescription, Button, InputField } from '@/types/common.types';

export interface HomePageContent {
  metaDescription: MetaDescription;
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

export interface ContactMeFormFileds {
  name: string;
  email: string;
  message: string;
  agreeToTerms: boolean;
}

export interface ContactMeFormValidation {
  name: { show: boolean; message: string };
  email: { show: boolean; message: string };
  message: { show: boolean; message: string };
  agreeToTerms: { show: boolean };
}
