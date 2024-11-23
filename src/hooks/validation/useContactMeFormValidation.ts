import type { ContactMeFormFileds, ContactMeFormValidation } from '@/types';
import { type ComputedRef, ref, watch } from 'vue';

const fullNameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’\.]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'’\.]+)*$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const meaningfulWordRegex = /^[\s\S]*$/;

const VALIDATION_MESSAGES_MAP = {
  en: {
    nameRequired: 'Please enter your name.',
    nameInvalid:
      'The name should contain only letters, apostrophes, or periods, and each part should be at least two characters long.',
    emailRequired: 'Please enter your email address.',
    emailInvalid: 'The email address format is invalid. Please use the format: user@example.com.',
    messageRequired: 'Please enter your message.',
    messageInvalid:
      'The message contains invalid characters. Only letters, numbers, spaces, and the following symbols are allowed: / " \' ? ! @ ( ).',
  },
  it: {
    nameRequired: 'Per favore, inserisci il tuo nome.',
    nameInvalid:
      'Il nome dovrebbe contenere solo lettere, apostrofi o punti, e ogni parte dovrebbe essere lunga almeno due caratteri.',
    emailRequired: 'Per favore, inserisci il tuo indirizzo email.',
    emailInvalid:
      "Il formato dell'indirizzo email non è valido. Usa il formato: utente@esempio.com.",
    messageRequired: 'Per favore, inserisci il tuo messaggio.',
    messageInvalid:
      'Il messaggio contiene caratteri non validi. Sono consentiti solo lettere, numeri, spazi e i seguenti simboli: / " \' ? ! @ ( ).',
  },
} as const;

const getMessage = (messageLang: 'en' | 'it', messageKey: string): string => {
  return VALIDATION_MESSAGES_MAP[messageLang][
    messageKey as keyof (typeof VALIDATION_MESSAGES_MAP)[typeof messageLang]
  ];
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useContactMeFormValidation(currentLanguage: ComputedRef<'en' | 'it'>) {
  const validationObject = ref<ContactMeFormValidation>({
    name: { show: false, message: '' },
    email: { show: false, message: '' },
    message: { show: false, message: '' },
    agreeToTerms: { show: false },
  });

  const validateForm = (fields: ContactMeFormFileds): boolean => {
    // Name validation
    if (fields.name === '') {
      validationObject.value.name.show = true;
      validationObject.value.name.message = getMessage(currentLanguage.value, 'nameRequired');
    } else if (!fullNameRegex.test(fields.name)) {
      validationObject.value.name.show = true;
      validationObject.value.name.message = getMessage(currentLanguage.value, 'nameInvalid');
    } else {
      validationObject.value.name.show = false;
      validationObject.value.name.message = '';
    }

    // Email validation
    if (fields.email === '') {
      validationObject.value.email.show = true;
      validationObject.value.email.message = getMessage(currentLanguage.value, 'emailRequired');
    } else if (!emailRegex.test(fields.email)) {
      validationObject.value.email.show = true;
      validationObject.value.email.message = getMessage(currentLanguage.value, 'emailInvalid');
    } else {
      validationObject.value.email.show = false;
      validationObject.value.email.message = '';
    }

    // Message validation
    if (fields.message === '') {
      validationObject.value.message.show = true;
      validationObject.value.message.message = getMessage(currentLanguage.value, 'messageRequired');
    } else if (!meaningfulWordRegex.test(fields.message)) {
      validationObject.value.message.show = true;
      validationObject.value.message.message = getMessage(currentLanguage.value, 'messageInvalid');
    } else {
      validationObject.value.message.show = false;
      validationObject.value.message.message = '';
    }

    // Terms validation
    if (!fields.agreeToTerms) {
      validationObject.value.agreeToTerms.show = true;
    } else {
      validationObject.value.agreeToTerms.show = false;
    }

    return (
      !validationObject.value.name.show &&
      !validationObject.value.email.show &&
      !validationObject.value.message.show &&
      fields.agreeToTerms
    );
  };

  const resetValidation = (): void => {
    validationObject.value = {
      name: { show: false, message: '' },
      email: { show: false, message: '' },
      message: { show: false, message: '' },
      agreeToTerms: { show: false },
    };
  };

  watch(
    () => currentLanguage.value,
    (newValue) => {
      validationObject.value.name.message = getMessage(newValue, 'nameRequired');
      validationObject.value.email.message = getMessage(newValue, 'emailRequired');
      validationObject.value.message.message = getMessage(newValue, 'messageRequired');
    },
  );

  return {
    validationObject,
    validateForm,
    resetValidation,
  };
}
