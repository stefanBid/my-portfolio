<script setup lang="ts">
import { useTypedI18nSingleton, useCommonStyleSingleton } from '@/hooks';
import { BaseDialog, BaseInput, BaseButton, BaseTextArea } from '@/components';
import { computed, ref, watch } from 'vue';
import { FaceSmileIcon, FaceFrownIcon } from '@heroicons/vue/24/outline';
import emailjs from '@emailjs/browser';

interface ContactMeFormDialogProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: boolean) => void;
}

const props = defineProps<ContactMeFormDialogProps>();

const { currentLanguage } = useTypedI18nSingleton();

const { textSizeXL, iconSizeL } = useCommonStyleSingleton();

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
const sendingStatus = ref<boolean | null>(null);

const sendEmail = (): void => {
  sendingEmail.value = true;

  const templateParams = {
    from_name: contactObject.value.name,
    from_email: contactObject.value.email,
    message: contactObject.value.message,
  };

  emailjs
    .send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    )
    .then(
      () => {
        contactObject.value.name = '';
        contactObject.value.email = '';
        contactObject.value.message = '';
        sendingStatus.value = true; // Chiudi il modal dopo l'invio
      },
      (_) => {
        sendingStatus.value = false;
      },
    )
    .finally(() => {
      sendingEmail.value = false;
    });
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
      sendingStatus.value = null;
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
        v-if="sendingStatus === null"
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
      <div
        v-else
        class="flex flex-col items-center justify-center w-full h-full p-6 overflow-hidden gap-x-6"
      >
        <component
          :is="sendingStatus === true ? FaceSmileIcon : FaceFrownIcon"
          :class="[iconSizeL]"
          class="text-sb-tertiary-100 shrink-0 transition-sb-slow"
        />
        <span
          v-if="sendingStatus === true"
          :class="[textSizeXL]"
          class="w-full text-center text-white truncate font-bebas transition-sb-slow"
        >
          <template v-if="sendingStatus === true">
            {{
              currentLanguage === 'en' ? 'Email sent successfully!' : 'Email inviata con successo!'
            }}
          </template>
          <template v-else>
            {{ currentLanguage === 'en' ? 'Email not sent!' : 'Email non inviata!' }}
          </template>
        </span>
      </div>
    </template>
  </BaseDialog>
</template>
