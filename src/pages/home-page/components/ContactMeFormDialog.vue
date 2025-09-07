<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import emailjs from '@emailjs/browser';

import { useNotificationStore, useI18nStore } from '@/stores';
import { useContactMeFormValidation } from '@/hooks';
import { stringPurifier } from '@/utils';

import BaseDialog from '@/components/base/dialog/BaseDialog.vue';
import BaseInput from '@/components/base/input/BaseInput.vue';
import BaseTextArea from '@/components/base/text-area/BaseTextArea.vue';
import BaseCheckbox from '@/components/base/checkbox/BaseCheckbox.vue';
import BaseButton from '@/components/base/button/BaseButton.vue';

import MdiInformationSlabCircle from '~icons/mdi/information-slab-circle';

interface ContactMeFormDialogProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: false) => void;
}

const props = defineProps<ContactMeFormDialogProps>();

// Store Declarations
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
    :on-close-dialog="(falsyValue) => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div
        class="inline-flex items-center justify-center w-full gap-1 text-white transition-all duration-300 ease-in-out animate-pulse py-2.5 sm:py-3 md:py-3 lg:py-4"
      >
        <MdiInformationSlabCircle
          class="shrink-0 stroke-[2.5px] icon-size-xs transition-all duration-300 ease-in-out"
        />
        <span
          class="text-justify transition-all duration-300 ease-in-out font-roboto text-shadow-luminous text-size-xs"
        >
          {{ i18nStore.homePageI18nContent.contactMeForm.info }}
        </span>
      </div>
      <form
        id="contactForm"
        name="contact_form"
        class="flex flex-col items-center w-full h-full overflow-hidden transition-all duration-300 ease-in-out tot-gap-m"
        @submit.prevent="sendEmail()"
        @reset.prevent="resetForm()"
      >
        <div
          class="flex flex-col flex-1 w-full px-3 overflow-y-auto transition-all duration-300 ease-in-out scrollbar-gutter-stable tot-gap-m"
        >
          <BaseInput
            id="contactFullName"
            v-model:input-value="contactObject.name"
            name="contact_full_name"
            aria-label="full name of the contact person"
            :label="i18nStore.homePageI18nContent.contactMeForm.fullNameField.label"
            :placeholder="i18nStore.homePageI18nContent.contactMeForm.fullNameField.placeholder"
            mandatory
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
            mandatory
            :validation="validationObject.email"
          />
          <BaseTextArea
            id="contactMessage"
            v-model:input-value="contactObject.message"
            name="contact-message"
            aria-label="message to be sent"
            :label="i18nStore.homePageI18nContent.contactMeForm.messageField.label"
            :placeholder="i18nStore.homePageI18nContent.contactMeForm.messageField.placeholder"
            mandatory
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
                class="text-justify text-white transition-all duration-300 ease-in-out font-roboto text-size-xs"
              >
                {{ i18nStore.homePageI18nContent.contactMeForm.agreeToTermsField }}
                <span>
                  {{ i18nStore.currentLanguage === 'en' ? 'Read' : 'Leggi' }}
                  <RouterLink
                    to="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline transition-all duration-300 ease-in-out outline-none cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 ring-0 focus-visible:text-sb-tertiary-200"
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
                    class="underline transition-all duration-300 ease-in-out outline-none cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 ring-0 focus-visible:text-sb-tertiary-200"
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
        <div
          class="flex items-center justify-end w-full px-3 pb-3 transition-all duration-300 ease-in-out tot-gap-m"
        >
          <BaseButton
            id="contactResetButton"
            name="contact-reset-button"
            aria-label="click for reset contact form"
            type="reset"
            size="small"
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
            size="small"
            :loading="sendingEmail"
          >
            {{ i18nStore.homePageI18nContent.contactMeForm.submitButton.text }}
          </BaseButton>
        </div>
      </form>
    </template>
  </BaseDialog>
</template>
