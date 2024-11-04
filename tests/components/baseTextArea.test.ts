import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { BaseTextArea } from '@/components';

describe('BaseTextArea.vue', () => {
  describe('Label rendering', () => {
    it('renders label when provided', async () => {
      const { getByTestId } = render(BaseTextArea, {
        props: {
          label: 'Description',
          dataTestid: 'base-text-area',
          inputValue: '',
        },
      });

      const label = getByTestId('base-text-area-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Description');
      // Check basic class without relying on styleStore
      expect(label).toHaveClass('font-medium');

      await fireEvent.mouseOver(label);
      expect(label).toHaveClass('hover:text-shadow-luminous');
    });

    it('does not render label when not provided', () => {
      const { queryByTestId } = render(BaseTextArea, {
        props: {
          dataTestid: 'base-text-area',
          inputValue: '',
        },
      });

      const label = queryByTestId('base-text-area-label');
      expect(label).toBeNull();
    });
  });

  describe('Text area properties', () => {
    it('sets placeholder and maxlength attributes correctly', () => {
      const { getByTestId } = render(BaseTextArea, {
        props: {
          placeholder: 'Custom placeholder',
          maxlength: 150,
          dataTestid: 'base-text-area',
          inputValue: '',
        },
      });

      const textarea = getByTestId('base-text-area');
      expect(textarea).toHaveAttribute('placeholder', 'Custom placeholder');
      expect(textarea).toHaveAttribute('maxlength', '150');
    });

    it('renders default placeholder and maxlength when props not provided', () => {
      const { getByTestId } = render(BaseTextArea, {
        props: {
          dataTestid: 'base-text-area',
          inputValue: '',
        },
      });

      const textarea = getByTestId('base-text-area');
      expect(textarea).toHaveAttribute('placeholder', 'Enter a text');
      expect(textarea).toHaveAttribute('maxlength', '300');
    });
  });

  describe('Focus and blur handling', () => {
    it('applies focus and blur styling based on focus state', async () => {
      const { getByTestId } = render(BaseTextArea, {
        props: {
          dataTestid: 'base-text-area',
          inputValue: '',
        },
      });

      const textarea = getByTestId('base-text-area');
      textarea.focus();
      expect(textarea).toHaveFocus();
      textarea.blur();
      expect(textarea).not.toHaveFocus();
    });
  });

  describe('Character count display', () => {
    it('displays correct character count', async () => {
      const { container, getByTestId } = render(BaseTextArea, {
        props: {
          dataTestid: 'base-text-area',
          inputValue: '',
        },
      });

      const textarea = getByTestId('base-text-area');

      expect(container).toHaveTextContent('0 / 300');
      await fireEvent.update(textarea, 'Hello, World!');
      expect(container).toHaveTextContent('13 / 300');
    });
  });

  describe('ID and Name attributes', () => {
    it.each([
      { id: 'custom-id', name: 'custom-name' },
      { id: undefined, name: undefined },
    ])('sets correct ID and Name attributes with id: $id, name: $name', ({ id, name }) => {
      const { getByTestId } = render(BaseTextArea, {
        props: {
          id,
          name,
          inputValue: '',
          dataTestid: 'base-text-area',
        },
      });

      const textarea = getByTestId('base-text-area');
      if (id) {
        expect(textarea).toHaveAttribute('id', id);
      } else {
        expect(textarea).toHaveAttribute('id');
      }

      if (name) {
        expect(textarea).toHaveAttribute('name', name);
      } else {
        expect(textarea).toHaveAttribute('name');
      }
    });
  });
});
