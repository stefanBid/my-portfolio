<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useNotificationStore, useI18nStore, useStyleStore } from '@/stores';
import { BaseDialog, BaseInput, BaseButton, BaseTextArea, BaseCheckbox } from '@/components';
import { useContactMeFormValidation } from '@/hooks';
import { stringPurifier } from '@/utils';
import { computed, ref, watch } from 'vue';
import { ClipboardDocumentListIcon } from '@heroicons/vue/24/outline';
import emailjs from '@emailjs/browser';

interface ContactMeFormDialogProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: false) => void;
}

const props = defineProps<ContactMeFormDialogProps>();

// Store Declarations
const styleStore = useStyleStore();
const notificationStore = useNotificationStore();
const i18nStore = useI18nStore();

// Feature 1: Manage Contact Me Form
const contactObject = ref({
  name: '',
  email: '',
  message: '',
  agreeToTerms: false,
});

const disableResetButton = computed(() => {
  return !Boolean(
    contactObject.value.name !== '' ||
      contactObject.value.email !== '' ||
      contactObject.value.message !== '' ||
      contactObject.value.agreeToTerms,
  );
});

//Feature 1.1: Manage Form Validation

const getLanguage = computed(() => {
  return i18nStore.currentLanguage as 'it' | 'en';
});

const { validationObject, validateForm, resetValidation } = useContactMeFormValidation(getLanguage);

const sendingEmail = ref(false);
const sendEmail = async (): Promise<void> => {
  if (!validateForm(contactObject.value)) {
    return;
  } else {
    resetValidation();
  }
  sendingEmail.value = true;

  const templateParams = {
    from_name: contactObject.value.name,
    from_email: contactObject.value.email,
    message: stringPurifier(contactObject.value.message),
    agree_time: new Date().toLocaleString(),
  };

  let notificationMsg = '';

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );

    notificationMsg =
      i18nStore.currentLanguage === 'en'
        ? `Email sent successfully!`
        : `Email inviata con successo!`;
    notificationStore.pushNotification(notificationMsg, 'success');

    contactObject.value.name = '';
    contactObject.value.email = '';
    contactObject.value.message = '';
  } catch {
    notificationMsg = i18nStore.currentLanguage === 'en' ? 'Email not sent!' : 'Email non inviata!';
    notificationStore.pushNotification(notificationMsg, 'error');
  } finally {
    sendingEmail.value = false;
    props.handleCloseModal(false);
  }
};

const resetForm = (): void => {
  contactObject.value = {
    name: '',
    email: '',
    message: '',
    agreeToTerms: false,
  };
};

// Manage Modal State
watch(
  () => props.isModalOpen,
  (newValue) => {
    if (newValue) {
      contactObject.value = {
        name: '',
        email: '',
        message: '',
        agreeToTerms: false,
      };
      sendingEmail.value = false;
      resetValidation();
    }
  },
);
</script>

<template>
  <BaseDialog
    :is-open="isModalOpen"
    header-orientation="left"
    dialog-size="medium"
    :dialog-title="i18nStore.homePageI18nContent.contactMeForm.title"
    :on-close-modal="(falsyValue) => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div class="inline-flex items-center justify-center w-full text-white gap-x-2 animate-pulse">
        <ClipboardDocumentListIcon :class="[styleStore.iconSizeXS]" class="shrink-0" />
        <span
          :class="[styleStore.textSizeXS]"
          class="text-justify transition-sb-slow font-roboto text-shadow-luminous"
        >
          {{ i18nStore.homePageI18nContent.contactMeForm.info }}
        </span>
      </div>
      <form
        id="contactForm"
        name="contact_form"
        class="flex flex-col items-center w-full h-full overflow-hidden gap-y-6"
        @submit.prevent="sendEmail()"
        @reset.prevent="resetForm()"
      >
        <div class="flex flex-col flex-1 w-full px-3 overflow-y-auto gap-y-6">
          <BaseInput
            id="contactFullName"
            v-model:input-value="contactObject.name"
            name="contact_full_name"
            aria-label="full name of the contact person"
            :label="i18nStore.homePageI18nContent.contactMeForm.fullNameField.label"
            :placeholder="i18nStore.homePageI18nContent.contactMeForm.fullNameField.placeholder"
            :validation="validationObject.name"
          />

          <BaseInput
            id="contactEmail"
            v-model:input-value="contactObject.email"
            name="contact-email"
            aria-label="email of the contact person"
            type="email"
            :label="i18nStore.homePageI18nContent.contactMeForm.emailField.label"
            :placeholder="i18nStore.homePageI18nContent.contactMeForm.emailField.placeholder"
            :validation="validationObject.email"
          />
          <BaseTextArea
            id="contactMessage"
            v-model:input-value="contactObject.message"
            name="contact-message"
            aria-label="message to be sent"
            :label="i18nStore.homePageI18nContent.contactMeForm.messageField.label"
            :placeholder="i18nStore.homePageI18nContent.contactMeForm.messageField.placeholder"
            :validation="validationObject.message"
          />
          <BaseCheckbox
            id="contactAgreeToTerms"
            v-model:checked="contactObject.agreeToTerms"
            name="contact_agree_to_terms"
            aria-label="agree to terms and conditions"
            :validation="validationObject.agreeToTerms"
          >
            <template #label-content>
              <span
                :class="[styleStore.textSizeXS]"
                class="text-justify text-white transition-sb-slow font-roboto"
              >
                {{ i18nStore.homePageI18nContent.contactMeForm.agreeToTermsField }}
                <span>
                  {{ i18nStore.currentLanguage === 'en' ? 'Read' : 'Leggi' }}
                  <RouterLink
                    to="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 transition-sb-slow"
                  >
                    {{
                      i18nStore.currentLanguage === 'en'
                        ? 'Privacy Policy'
                        : 'Politica sulla riservatezza'
                    }}
                  </RouterLink>
                  {{ i18nStore.currentLanguage === 'en' ? 'and' : 'e' }}
                  <RouterLink
                    to="/terms-and-conditions"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 transition-sb-slow"
                  >
                    {{
                      i18nStore.currentLanguage === 'en'
                        ? 'Terms and Conditions'
                        : 'Termini e condizioni'
                    }}
                  </RouterLink>
                  .
                </span>
              </span>
            </template>
          </BaseCheckbox>
        </div>
        <div class="flex items-center justify-end w-full px-3 pb-3 gap-x-6">
          <BaseButton
            id="contactResetButton"
            name="contact-reset-button"
            aria-label="click for reset contact form"
            type="reset"
            content-size="small"
            spacing-size="small"
            variant="white"
            :disabled="disableResetButton"
          >
            {{ i18nStore.homePageI18nContent.contactMeForm.resetButton.text }}
          </BaseButton>
          <BaseButton
            id="contactSendButton"
            name="contact-send-button"
            aria-label="click to send email"
            type="submit"
            content-size="small"
            spacing-size="small"
            :loading="sendingEmail"
          >
            {{ i18nStore.homePageI18nContent.contactMeForm.submitButton.text }}
          </BaseButton>
        </div>
      </form>
    </template>
  </BaseDialog>
</template>
