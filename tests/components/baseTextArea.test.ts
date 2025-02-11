import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { BaseTextArea } from '../../src/components';

describe('BaseTextArea Unit Tests', () => {
  describe('Props', () => {
    it.each(['Custom label', undefined])('render label correctly when provided "%s"', (label) => {
      render(BaseTextArea, {
        props: {
          dataTestid: 'custom-base-text-area',
          label,
          inputValue: '',
        },
      });

      const labelElement = screen.queryByTestId('custom-base-text-area-label');

      if (label) {
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent(label);
      } else {
        expect(labelElement).toBeNull();
      }
    });

    it.each([true, false])('render * after label correctly when mandatory is "%s"', (mandatory) => {
      render(BaseTextArea, {
        props: {
          dataTestid: 'custom-base-text-area',
          label: 'Custom label',
          mandatory: mandatory,
          inputValue: '',
        },
      });

      const labelElement = screen.queryByTestId('custom-base-text-area-label');
      if (mandatory) {
        expect(labelElement).toHaveTextContent('*');
      } else {
        expect(labelElement).not.toHaveTextContent('*');
      }
    });

    it.each(['Custom aria label', undefined])(
      'set aria-label correctly when provided "%s"',
      (ariaLabel) => {
        render(BaseTextArea, {
          props: {
            dataTestid: 'custom-base-text-area',
            ariaLabel,
            inputValue: '',
          },
        });

        const textAreaElement = screen.getByTestId('custom-base-text-area');
        expect(textAreaElement).toHaveAttribute(
          'aria-label',
          ariaLabel ? ariaLabel : 'general text area',
        );
      },
    );

    it.each([
      { id: undefined, name: undefined },
      { id: 'custom-id', name: 'custom-name' },
    ])('set id and name correctly when id is "$id" and name is "$name"', ({ id, name }) => {
      render(BaseTextArea, {
        props: {
          dataTestid: 'custom-base-text-area',
          id,
          name,
          inputValue: '',
        },
      });

      const textAreaElement = screen.getByTestId('custom-base-text-area');
      const nanoidPattern = /^[a-zA-Z0-9_-]{21}/;

      if (id && name) {
        expect(textAreaElement).toHaveAttribute('id', id);
        expect(textAreaElement).toHaveAttribute('name', name);
      } else {
        expect(textAreaElement.getAttribute('id')).toMatch(
          new RegExp(`^${nanoidPattern.source}-textarea-id$`),
        );
        expect(textAreaElement.getAttribute('name')).toMatch(
          new RegExp(`^${nanoidPattern.source}-textarea-name$`),
        );
      }
    });

    it.each(['Custom placeholder', undefined])(
      'set placeholder correctly when provided "%s"',
      (placeholder) => {
        render(BaseTextArea, {
          props: {
            dataTestid: 'custom-base-text-area',
            placeholder,
            inputValue: '',
          },
        });

        const textAreaElement = screen.getByTestId('custom-base-text-area');
        expect(textAreaElement).toHaveAttribute(
          'placeholder',
          placeholder ? placeholder : 'Enter a text',
        );
      },
    );

    it.each([undefined, 100])(`set max length correctly when provided "%s"`, (maxlength) => {
      render(BaseTextArea, {
        props: {
          dataTestid: 'custom-base-text-area',
          maxlength,
          inputValue: '',
        },
      });

      const textAreaElement = screen.getByTestId('custom-base-text-area');
      expect(textAreaElement).toHaveAttribute('maxlength', String(maxlength ? maxlength : 300));
    });
  });

  describe('Validation', () => {
    it.each([
      { validation: undefined, expectedMessage: null, hasErrorClass: false },
      {
        validation: { show: false, message: 'Custom error message' },
        expectedMessage: null,
        hasErrorClass: false,
      },
      {
        validation: { show: true, message: 'Custom error message' },
        expectedMessage: 'Custom error message',
        hasErrorClass: true,
      },
      {
        validation: { show: true, message: undefined },
        expectedMessage: null,
        hasErrorClass: true,
      },
      {
        validation: { show: false, message: undefined },
        expectedMessage: null,
        hasErrorClass: false,
      },
      { validation: { show: true, message: '' }, expectedMessage: null, hasErrorClass: true },
      { validation: { show: false, message: '' }, expectedMessage: null, hasErrorClass: false },
    ])(
      'handles validation with validation: $validation',
      async ({ validation, expectedMessage, hasErrorClass }) => {
        render(BaseTextArea, {
          props: {
            dataTestid: 'custom-base-text-area',
            validation,
            inputValue: '',
          },
        });

        // Verify the validation message
        const validationMessage = screen.queryByTestId('custom-base-text-area-validation-message');
        if (expectedMessage) {
          expect(validationMessage).toBeInTheDocument();
          expect(validationMessage).toHaveTextContent(expectedMessage);
        } else {
          expect(validationMessage).not.toBeInTheDocument();
        }

        // Verify the error class
        const inputElement = screen.getByTestId('custom-base-text-area');
        if (hasErrorClass) {
          expect(inputElement).toHaveClass(
            'border-sb-error',
            'focus:border-sb-error',
            'focus:shadow-sb-error',
          );
        } else {
          expect(inputElement).not.toHaveClass(
            'border-sb-error',
            'focus:border-sb-error',
            'focus:shadow-sb-error',
          );
        }
      },
    );
  });

  describe('User Interaction and State', () => {
    it('focus the text area when the label is clicked', async () => {
      render(BaseTextArea, {
        props: {
          dataTestid: 'custom-base-text-area',
          label: 'Custom label',
          inputValue: '',
        },
      });
      await fireEvent.click(screen.getByTestId('custom-base-text-area-label'));
      expect(screen.getByTestId('custom-base-text-area')).toHaveFocus();
    });

    it('focus the text area when keydown enter on the label', async () => {
      render(BaseTextArea, {
        props: {
          dataTestid: 'custom-base-text-area',
          label: 'Custom label',
          inputValue: '',
        },
      });
      await fireEvent.keyDown(screen.getByTestId('custom-base-text-area-label'), { key: 'Enter' });
      expect(screen.getByTestId('custom-base-text-area')).toHaveFocus();
    });

    it('write the input value correctly', async () => {
      render(BaseTextArea, {
        props: {
          dataTestid: 'custom-base-text-area',
          inputValue: '',
        },
      });

      const textAreaElement = screen.getByTestId('custom-base-text-area');
      expect(textAreaElement).toHaveValue('');
      await fireEvent.update(textAreaElement, 'test');
      expect(textAreaElement).toHaveValue('test');
    });

    it('write the input value until the max length is reached', async () => {
      render(BaseTextArea, {
        props: {
          dataTestid: 'custom-base-text-area',
          maxlength: 5,
          inputValue: '',
        },
      });

      const textAreaElement = screen.getByTestId('custom-base-text-area');
      const textAreaCounter = screen.getByTestId('custom-base-text-area-counter');
      expect(textAreaElement).toHaveValue('');
      expect(textAreaCounter).toHaveTextContent('0 / 5');
      await fireEvent.update(textAreaElement, 'test1');
      expect(textAreaElement).toHaveValue('test1');
      expect(textAreaCounter).toHaveTextContent('5 / 5');
    });
  });
});
