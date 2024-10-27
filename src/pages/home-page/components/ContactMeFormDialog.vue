<script setup lang="ts">
import { useTypedI18nSingleton, useCommonStyleSingleton } from '@/hooks';
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
const { textSizeXS } = useCommonStyleSingleton();

const getInformation = computed(() => {
  if (currentLanguage.value === 'en') {
    return `To get in touch, please fill out the form with your full name, email, and message. Ensure you provide a valid email address to receive a prompt response. In compliance with the GDPR (EU Regulation 2016/679), we inform you that your personal data, including your name and message, will not be stored or retained after the completion of your request. This ensures the confidentiality and protection of your personal information, and no explicit consent is required for this limited processing.`;
  }
  return `Per contattarmi, compila il modulo inserendo il tuo nome completo, l'email e il messaggio. Assicurati di fornire un indirizzo email valido per ricevere una risposta tempestiva. In ottemperanza al GDPR (Regolamento UE 2016/679), ti informiamo che i tuoi dati personali, incluso il nome e il messaggio, non verranno memorizzati o trattenuti una volta completata la tua richiesta. Questo garantisce la riservatezza e la protezione delle tue informazioni personali, e non è richiesto un consenso esplicito per questo trattamento limitato.`;
});

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
    :on-close-modal="(falsyValue) => props.handleCloseModal(falsyValue)"
  >
    <template #modal-content>
      <div class="inline-flex items-center justify-center w-full text-white gap-x-2">
        <span
          :class="[textSizeXS]"
          class="text-justify text-white transition-sb-slow font-roboto text-shadow-luminous"
        >
          {{ getInformation }}
        </span>
      </div>
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
