<script setup lang="ts">
import { useTypedI18nSingleton } from '@/hooks';
import { useNotificationStore } from '@/stores';
import { BaseDialog, BaseInput, BaseButton, BaseTextArea } from '@/components';
import { computed, ref, watch } from 'vue';
import emailjs from '@emailjs/browser';

interface ContactMeFormDialogProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: false) => void;
}

const props = defineProps<ContactMeFormDialogProps>();

const ns = useNotificationStore();

const { currentLanguage } = useTypedI18nSingleton();

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
      currentLanguage.value === 'en' ? `Email sent successfully!` : `Email inviata con successo!`;
    ns.showNotification(notificationMsg, 'success');

    contactObject.value.name = '';
    contactObject.value.email = '';
    contactObject.value.message = '';
  } catch {
    notificationMsg = currentLanguage.value === 'en' ? 'Email not sent!' : 'Email non inviata!';
    ns.showNotification(notificationMsg, 'error');
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
    :dialog-title="currentLanguage === 'en' ? 'Contact me' : 'Contattami'"
    :dialog-subtitle="
      currentLanguage === 'en'
        ? 'Fill out the form to contact me'
        : 'Compila il form per contattarmi'
    "
    :on-close-modal="(falsyValue) => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <form
        id="contact-me-form"
        class="flex flex-col items-center w-full h-full overflow-hidden gap-y-6"
        @submit.prevent="sendEmail()"
        @reset="() => (contactObject = { name: '', email: '', message: '' })"
      >
        <div class="flex flex-col flex-1 w-full px-3 overflow-y-auto gap-y-6">
          <BaseInput
            id="contact-name-id"
            v-model:input-value="contactObject.name"
            name="contact-name-name"
            label="Full Name*"
            :placeholder="
              currentLanguage === 'en'
                ? 'Insert your name Ex: John Miller'
                : 'Inserisci il tuo nome Ex: John Miller'
            "
          />

          <BaseInput
            id="contact-email-id"
            v-model:input-value="contactObject.email"
            name="contact-email-name"
            label="Email*"
            type="email"
            :placeholder="
              currentLanguage === 'en'
                ? 'Insert your email (ex: example@ex.com)'
                : 'Inserisci la tua email (ex: example@ex.com)'
            "
          />
          <BaseTextArea
            id="contact-message-id"
            v-model:input-value="contactObject.message"
            name="contact-message-name"
            label="Message"
            :placeholder="
              currentLanguage === 'en' ? 'Insert your message' : 'Inserisci il tuo messaggio'
            "
          />
        </div>
        <div class="flex items-center justify-end w-full px-3 pb-3 gap-x-6">
          <BaseButton
            id="contact-reset-button"
            type="reset"
            content-size="small"
            variant="white"
            :disabled="disableResetButton"
          >
            {{ currentLanguage === 'en' ? 'Reset' : 'Resetta' }}
          </BaseButton>
          <BaseButton
            id="contact-send-button"
            type="submit"
            content-size="small"
            :disabled="disableSendButton"
            :loading="sendingEmail"
          >
            {{ currentLanguage === 'en' ? 'Send' : 'Invia' }}
          </BaseButton>
        </div>
      </form>
    </template>
  </BaseDialog>
</template>
