<script setup lang="ts">
import { useNotificationStore, useI18nStore, useStyleStore } from '@/stores';
import { BaseDialog, BaseInput, BaseButton, BaseTextArea } from '@/components';
import { computed, ref, watch } from 'vue';
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
});

const disableSendButton = computed(() => {
  return Boolean(
    !contactObject.value.name || !contactObject.value.email || !contactObject.value.message,
  );
});

const disableResetButton = computed(() => {
  return !Boolean(
    contactObject.value.name !== '' ||
      contactObject.value.email !== '' ||
      contactObject.value.message !== '',
  );
});

const sendingEmail = ref(false);

const sendEmail = async (): Promise<void> => {
  sendingEmail.value = true;

  const templateParams = {
    from_name: contactObject.value.name,
    from_email: contactObject.value.email,
    message: contactObject.value.message,
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

// Manage Modal State
watch(
  () => props.isModalOpen,
  (newValue) => {
    if (newValue) {
      contactObject.value = {
        name: '',
        email: '',
        message: '',
      };
      sendingEmail.value = false;
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
      <div class="inline-flex items-center justify-center w-full text-white gap-x-2">
        <span
          :class="[styleStore.textSizeXS]"
          class="text-justify text-white transition-sb-slow font-roboto text-shadow-luminous"
        >
          {{ i18nStore.homePageI18nContent.contactMeForm.info }}
        </span>
      </div>
      <form
        id="contactForm"
        name="contact_form"
        class="flex flex-col items-center w-full h-full overflow-hidden gap-y-6"
        @submit.prevent="sendEmail()"
        @reset="() => (contactObject = { name: '', email: '', message: '' })"
      >
        <div class="flex flex-col flex-1 w-full px-3 overflow-y-auto gap-y-6">
          <BaseInput
            id="contactFullName"
            v-model:input-value="contactObject.name"
            name="contact_full_name"
            :label="i18nStore.homePageI18nContent.contactMeForm.fullNameField.label"
            :placeholder="i18nStore.homePageI18nContent.contactMeForm.fullNameField.placeholder"
          />

          <BaseInput
            id="contactEmail"
            v-model:input-value="contactObject.email"
            name="contact-email"
            type="email"
            :label="i18nStore.homePageI18nContent.contactMeForm.emailField.label"
            :placeholder="i18nStore.homePageI18nContent.contactMeForm.emailField.placeholder"
          />
          <BaseTextArea
            id="contactMessage"
            v-model:input-value="contactObject.message"
            name="contact-message"
            :label="i18nStore.homePageI18nContent.contactMeForm.messageField.label"
            :placeholder="i18nStore.homePageI18nContent.contactMeForm.messageField.placeholder"
          />
        </div>
        <div class="flex items-center justify-end w-full px-3 pb-3 gap-x-6">
          <BaseButton
            id="contactResetButton"
            name="contact-reset-button"
            type="reset"
            content-size="small"
            variant="white"
            :disabled="disableResetButton"
          >
            {{ i18nStore.homePageI18nContent.contactMeForm.resetButton.text }}
          </BaseButton>
          <BaseButton
            id="contactSendButton"
            name="contact-send-button"
            type="submit"
            content-size="small"
            :disabled="disableSendButton"
            :loading="sendingEmail"
          >
            {{ i18nStore.homePageI18nContent.contactMeForm.submitButton.text }}
          </BaseButton>
        </div>
      </form>
    </template>
  </BaseDialog>
</template>
