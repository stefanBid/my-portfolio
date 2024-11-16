import { render, fireEvent, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { BaseCheckbox } from '@/components';

describe('BaseCheckbox Unit Tests', () => {
  describe('Props', () => {
    it.each(['Custom aria label', undefined])(
      'set aria-label correctly when provided "%s"',
      (ariaLabel) => {
        render(BaseCheckbox, {
          props: {
            dataTestid: 'custom-base-checkbox',
            ariaLabel,
            checked: false,
          },
        });
        const checkbox = screen.getByTestId('custom-base-checkbox');
        expect(checkbox).toHaveAttribute('aria-label', ariaLabel);
      },
    );

    it.each([
      { id: undefined, name: undefined },
      { id: 'custom-id', name: 'custom-name' },
    ])('set id and name correctly when id is "$id" and name is "$name"', ({ id, name }) => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          id,
          name,
          checked: false,
        },
      });

      const checkbox = screen.getByTestId('custom-base-checkbox');
      const nanoidPattern = /^[a-zA-Z0-9_-]{21}/;

      if (id && name) {
        expect(checkbox).toHaveAttribute('id', id);
        expect(checkbox).toHaveAttribute('name', name);
      } else {
        expect(checkbox.getAttribute('id')).toMatch(
          new RegExp(`^${nanoidPattern.source}-checkbox-id$`),
        );
        expect(checkbox.getAttribute('name')).toMatch(
          new RegExp(`^${nanoidPattern.source}-checkbox-name$`),
        );
      }
    });

    it.each([undefined, 'customValue'])('set value correctly when provided "%s"', (value) => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          value,
          checked: false,
        },
      });

      const checkbox = screen.getByTestId('custom-base-checkbox');
      console.log(checkbox.outerHTML);
      if (value) {
        expect(checkbox).toHaveAttribute('value', value);
      } else {
        expect(checkbox).not.toHaveAttribute('value');
      }
    });
  });

  describe('Select and Unselect', () => {
    it('select a boolean checkbox', async () => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          checked: false,
        },
      });
      const checkbox = screen.getByTestId('custom-base-checkbox');
      await fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('unselect a boolean checkbox', async () => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          checked: true,
        },
      });
      const checkbox = screen.getByTestId('custom-base-checkbox');
      await fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('select a checkbox with a value', async () => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          value: 'custom-value',
          checked: '',
        },
      });
      const checkbox = screen.getByTestId('custom-base-checkbox');
      await fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('unselect a checkbox with a value', async () => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          value: 'custom-value',
          checked: 'custom-value',
        },
      });
      const checkbox = screen.getByTestId('custom-base-checkbox');
      await fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("don't select a checkbox with an undefined value", async () => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          value: undefined,
          checked: '',
        },
      });
      const checkbox = screen.getByTestId('custom-base-checkbox');
      await fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toHaveClass('opacity-50 cursor-not-allowed');
    });

    it('select a checkbox with a value and a different checked value', async () => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          value: 'custom-value',
          checked: [],
        },
      });
      const checkbox = screen.getByTestId('custom-base-checkbox');
      await fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('unselect a checkbox with a value and a different checked value', async () => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          value: 'custom-value',
          checked: ['custom-value'],
        },
      });
      const checkbox = screen.getByTestId('custom-base-checkbox');
      await fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it("don't select a checkbox with an undefined value and a different checked value", async () => {
      render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          value: undefined,
          checked: [],
        },
      });
      const checkbox = screen.getByTestId('custom-base-checkbox');
      await fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
      expect(checkbox).toHaveClass('opacity-50 cursor-not-allowed');
    });
  });

  describe('Slot Rendering', () => {
    it('render the slot content', () => {
      const { container } = render(BaseCheckbox, {
        props: {
          dataTestid: 'custom-base-checkbox',
          checked: false,
        },
        slots: {
          'label-content': () => 'Slot Content',
        },
      });
      expect(container).toHaveTextContent('Slot Content');
    });
  });
});
