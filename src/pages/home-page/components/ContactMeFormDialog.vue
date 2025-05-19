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
    :on-close-dialog="(falsyValue) => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div
        :class="{
          'py-2.5': styleStore.activeBreakpoint === 'xs' || styleStore.activeBreakpoint === 'sm',
          'py-3': styleStore.activeBreakpoint === 'md',
          'py-4':
            styleStore.activeBreakpoint !== 'xs' &&
            styleStore.activeBreakpoint !== 'sm' &&
            styleStore.activeBreakpoint !== 'md',
        }"
        class="inline-flex items-center justify-center w-full gap-2 text-white transition-all duration-300 ease-in-out animate-pulse"
      >
        <ClipboardDocumentListIcon
          :class="[styleStore.iconSizeXS]"
          class="shrink-0 stroke-[2.5px]"
        />
        <span
          :class="[styleStore.textSizeXS]"
          class="text-justify transition-all duration-300 ease-in-out font-roboto text-shadow-luminous"
        >
          {{ i18nStore.homePageI18nContent.contactMeForm.info }}
        </span>
      </div>
      <form
        id="contactForm"
        name="contact_form"
        :class="[styleStore.elementTotalGapM]"
        class="flex flex-col items-center w-full h-full overflow-hidden transition-all duration-300 ease-in-out"
        @submit.prevent="sendEmail()"
        @reset.prevent="resetForm()"
      >
        <div
          :class="[styleStore.elementTotalGapM]"
          class="flex flex-col flex-1 w-full px-3 overflow-y-auto transition-all duration-300 ease-in-out scrollbar-gutter-stable"
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
                :class="[styleStore.textSizeXS]"
                class="text-justify text-white transition-all duration-300 ease-in-out font-roboto"
              >
                {{ i18nStore.homePageI18nContent.contactMeForm.agreeToTermsField }}
                <span>
                  {{ i18nStore.currentLanguage === 'en' ? 'Read' : 'Leggi' }}
                  <RouterLink
                    to="/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="underline transition-all duration-300 ease-in-out outline-none cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 ring-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:text-sb-tertiary-200"
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
                    class="underline transition-all duration-300 ease-in-out outline-none cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 ring-0 focus-visible:ring-0 focus-visible:outline-none focus-visible:text-sb-tertiary-200"
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
          :class="[styleStore.elementTotalGapM]"
          class="flex items-center justify-end w-full px-3 pb-3 transition-all duration-300 ease-in-out"
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
