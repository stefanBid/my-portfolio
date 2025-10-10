<script setup lang="ts">
import { computed, ref, type Component, reactive, watch } from 'vue';
import { RouterLink } from 'vue-router';
import emailjs from '@emailjs/browser';
import { storeToRefs } from 'pinia';

import type { UIInputField } from '@/types';

import { useLocaleStore, useNotificationStore, usePortfolioStore } from '@/stores';
import { stringPurifier } from '@/utils';

import { Icon } from '@iconify/vue';
import BaseDialog from '@/components/base/dialog/BaseDialog.vue';
import BaseInput from '@/components/base/input/BaseInput.vue';
import BaseTextArea from '@/components/base/text-area/BaseTextArea.vue';
import BaseCheckbox from '@/components/base/checkbox/BaseCheckbox.vue';
import BaseButton from '@/components/base/button/BaseButton.vue';

interface ContactMeFormDialogProps {
  isModalOpen: boolean;
  handleCloseModal: (falsyValue: false) => void;
}

// Input / Output (Props / Emits)
const props = defineProps<ContactMeFormDialogProps>();

// Dependencies
const notificationStore = useNotificationStore();
const { homeData } = storeToRefs(usePortfolioStore());
const { locale } = storeToRefs(useLocaleStore());

// State
const form = reactive<Record<string, string | boolean>>({});

//Example: { 'name-field': { show: true, message: 'Test test' }, }
const errors = ref<{ [key: string]: { show: boolean; message?: string } } | null>();
const sendingEmail = ref(false);

const formSettings = computed(() => homeData.value.contactForm);
const fields = computed<UIInputField[]>(() => homeData.value.contactForm.fields || []);

const isDisabled = computed(() => {
  return (
    Object.values(form).every((value) => (typeof value === 'boolean' ? !value : value === '')) &&
    !errors.value
  );
});

// Events
const onResetForm = (): void => {
  Object.keys(form).forEach((key) => {
    if (typeof form[key] === 'boolean') {
      form[key] = false;
    } else {
      form[key] = '';
    }
  });
  // Reset validation states
  errors.value = null;
};

const onCloseModal = (): void => {
  props.handleCloseModal(false);
  const timeout = setTimeout(() => {
    onResetForm();
    clearTimeout(timeout);
  }, 300);
};

const onSendEmail = async (): Promise<void> => {
  // Validation Step
  const isValid = validateForm();
  if (!isValid) return;
  sendingEmail.value = true;

  // Prepare contact object
  const contactObject = {
    name: (form['name-field'] as string) || '',
    email: (form['email-field'] as string) || '',
    message: (form['message-field'] as string) || '',
    agreeToTerms: (form['agree-field'] as boolean) || false,
  };
  const templateParams = {
    from_name: contactObject.name,
    from_email: contactObject.email,
    message: stringPurifier(contactObject.message),
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
      locale.value === 'en' ? `Email sent successfully!` : `Email inviata con successo!`;
    notificationStore.pushNotification(notificationMsg, 'success');
  } catch {
    notificationMsg = locale.value === 'en' ? 'Email not sent!' : 'Email non inviata!';
    notificationStore.pushNotification(notificationMsg, 'error');
  } finally {
    sendingEmail.value = false;
    onCloseModal();
  }
};

// Lifecycle
watch(
  () => props.isModalOpen,
  (newVal) => {
    if (newVal) {
      initForm();
    }
  },
  { immediate: true },
);

watch(fields, () => initForm(), { deep: true });

// Helpers

function initForm(): void {
  fields.value.forEach((field) => {
    if (typeof form[field.inputId] === 'undefined') {
      form[field.inputId] = field.type === 'checkbox' ? false : '';
    }
  });
  errors.value = null;
}

function validateForm(): boolean {
  let isValid = true;
  const nextErrors: Record<string, { show: boolean; message?: string }> = {};

  fields.value.forEach((field) => {
    const id = field.inputId;
    const raw = form[id];
    const val = typeof raw === 'string' ? raw.trim() : raw;

    // Consider empty only: '', null, undefined.
    // For booleans (e.g., required checkbox), false counts as empty. 0 is valid.
    const isEmptyString = typeof val === 'string' && val === '';
    const isMissing = val === null || val === undefined || isEmptyString;
    const isUncheckedBool = typeof val === 'boolean' && val === false;

    // 1) REQUIRED — if it fails, set the error ONCE and skip regex.
    if (field.mandatory && (isMissing || isUncheckedBool)) {
      if (!nextErrors[id]) {
        nextErrors[id] = {
          show: true,
          message: field.errors?.required || undefined,
        };
      }
      isValid = false;
      return; // skip regex for this field
    }

    // 2) REGEX — only if there is a non-empty string AND no prior error set for this field.
    if (field.regexValidation && typeof val === 'string' && val !== '' && !nextErrors[id]) {
      const rx = new RegExp(field.regexValidation); // regexValidation is the pattern string
      if (!rx.test(val)) {
        if (!nextErrors[id]) {
          nextErrors[id] = {
            show: true,
            message: field.errors?.invalid || 'Invalid format.',
          };
        }
        isValid = false;
        return;
      }
    }

    // 3) CLEAN STATE — if no error has been set so far for this field, mark it as clean once.
    if (!nextErrors[id]) {
      nextErrors[id] = { show: false, message: '' };
    }
  });

  // Single reactive assignment
  errors.value = nextErrors;
  return isValid;
}

// Data for template
const FIELDS_MAP: Record<string, Component> = {
  text: BaseInput,
  email: BaseInput,
  textarea: BaseTextArea,
  checkbox: BaseCheckbox,
};
</script>

<template>
  <BaseDialog
    :is-open="isModalOpen"
    header-orientation="left"
    dialog-size="medium"
    :dialog-title="formSettings.title"
    @close-dialog="onCloseModal()"
  >
    <template #modal-content>
      <div
        class="inline-flex items-center justify-center w-full gap-1 text-white transition-all duration-300 ease-in-out animate-pulse py-2.5 sm:py-3 md:py-3 lg:py-4"
      >
        <Icon
          :icon="formSettings.icon || ''"
          class="shrink-0 stroke-[2.5px] icon-size-xs transition-all duration-300 ease-in-out"
        />
        <span
          class="text-justify transition-all duration-300 ease-in-out font-roboto text-shadow-luminous text-size-xs"
        >
          {{ formSettings.info }}
        </span>
      </div>
      <form
        id="contactForm"
        name="contact_form"
        class="flex flex-col items-center w-full h-full overflow-hidden transition-all duration-300 ease-in-out tot-gap-m"
        @submit.prevent="onSendEmail()"
        @reset.prevent="onResetForm()"
      >
        <div
          class="flex flex-col flex-1 w-full px-3 overflow-y-auto transition-all duration-300 ease-in-out scrollbar-gutter-stable tot-gap-m"
        >
          <template v-for="field in fields">
            <component
              :is="FIELDS_MAP[field.type]"
              v-if="field.type !== 'checkbox'"
              :id="field.inputId"
              :key="field.inputId"
              v-model:input-value="form[field.inputId]"
              :mandatory="field.mandatory"
              :label="field.label"
              :placeholder="field.placeholder"
              :validation="errors?.[field.inputId] ? errors[field.inputId] : undefined"
            />

            <component
              :is="FIELDS_MAP[field.type]"
              v-else
              :id="field.inputId"
              :key="field.inputId + '-cb'"
              v-model:checked="form[field.inputId]"
              :label="field.label"
              :validation="errors?.[field.inputId] ? errors[field.inputId] : undefined"
            >
              <template #label-content>
                <span
                  class="text-justify text-white transition-all duration-300 ease-in-out font-roboto text-size-xs"
                >
                  {{ field.label }}
                  <span>
                    {{ locale === 'en' ? 'Read' : 'Leggi' }}
                    <RouterLink
                      to="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="underline transition-all duration-300 ease-in-out outline-none cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 ring-0 focus-visible:text-sb-tertiary-200"
                    >
                      {{ locale === 'en' ? 'Privacy Policy' : 'Politica sulla riservatezza' }}
                    </RouterLink>
                    {{ locale === 'en' ? 'and' : 'e' }}
                    <RouterLink
                      to="/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="underline transition-all duration-300 ease-in-out outline-none cursor-pointer text-sb-tertiary-100 hover:text-sb-tertiary-200 ring-0 focus-visible:text-sb-tertiary-200"
                    >
                      {{ locale === 'en' ? 'Terms and Conditions' : 'Termini e condizioni' }}
                    </RouterLink>
                    .
                  </span>
                </span>
              </template>
            </component>
          </template>
        </div>
        <div
          class="flex items-center justify-end w-full px-3 pb-3 transition-all duration-300 ease-in-out tot-gap-m"
        >
          <BaseButton
            v-if="formSettings.resetBtn"
            id="contactResetButton"
            name="contact-reset-button"
            aria-label="click for reset contact form"
            :type="formSettings.resetBtn.type"
            :size="formSettings.resetBtn.size"
            :variant="formSettings.resetBtn.variant"
            :disabled="isDisabled"
          >
            {{ formSettings.resetBtn.text }}
          </BaseButton>
          <BaseButton
            v-if="formSettings.submitBtn"
            id="contactSendButton"
            name="contact-send-button"
            aria-label="click to send email"
            :type="formSettings.submitBtn.type"
            :size="formSettings.submitBtn.size"
            :variant="formSettings.submitBtn.variant"
            :loading="sendingEmail"
          >
            {{ formSettings.submitBtn.text }}
          </BaseButton>
        </div>
      </form>
    </template>
  </BaseDialog>
</template>
