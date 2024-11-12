import { render, fireEvent, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { BaseSwitch } from '@/components';

describe('BaseSwitch Unit Tests', () => {
  describe('Props', () => {
    it.each(['Custom label', undefined])('render label correctly when provided "%s"', (label) => {
      render(BaseSwitch, {
        props: {
          dataTestid: 'custom-base-switch',
          label,
          enabled: true,
        },
      });

      const labelElement = screen.queryByTestId('custom-base-switch-label');

      if (label) {
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent(label);
      } else {
        expect(labelElement).toBeNull();
      }
    });

    it.each(['Custom aria label', undefined])(
      'set aria-label correctly when provided "%s"',
      (ariaLabel) => {
        render(BaseSwitch, {
          props: {
            dataTestid: 'custom-base-switch',
            ariaLabel,
            enabled: true,
          },
        });

        const switchElement = screen.getByTestId('custom-base-switch');
        expect(switchElement).toHaveAttribute(
          'aria-label',
          ariaLabel ? ariaLabel : 'general switch',
        );
      },
    );
  });

  describe('User Interaction and State', () => {
    it('enable the switch when the label is clicked', async () => {
      render(BaseSwitch, {
        props: {
          dataTestid: 'custom-base-switch',
          label: 'Custom label',
          enabled: false,
        },
      });
      const labelElement = screen.getByTestId('custom-base-switch-label');
      const switchElement = screen.getByTestId('custom-base-switch');

      expect(switchElement).not.toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');

      await fireEvent.click(labelElement);

      expect(switchElement).toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100');
    });

    it('disable the switch when the label is clicked', async () => {
      render(BaseSwitch, {
        props: {
          dataTestid: 'custom-base-switch',
          label: 'Custom label',
          enabled: true,
        },
      });
      const labelElement = screen.getByTestId('custom-base-switch-label');
      const switchElement = screen.getByTestId('custom-base-switch');

      expect(switchElement).toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100');

      await fireEvent.click(labelElement);

      expect(switchElement).not.toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');
    });

    it('enable the switch when the switch button is clicked', async () => {
      render(BaseSwitch, {
        props: {
          dataTestid: 'custom-base-switch',
          enabled: false,
        },
      });
      const switchElement = screen.getByTestId('custom-base-switch');

      expect(switchElement).not.toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');

      await fireEvent.click(switchElement);

      expect(switchElement).toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100');
    });

    it('disable the switch when the switch button is clicked', async () => {
      render(BaseSwitch, {
        props: {
          dataTestid: 'custom-base-switch',
          enabled: true,
        },
      });
      const switchElement = screen.getByTestId('custom-base-switch');

      expect(switchElement).toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100');

      await fireEvent.click(switchElement);

      expect(switchElement).not.toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');
    });

    it('enable the switch when keypress enter on switch button', async () => {
      render(BaseSwitch, {
        props: {
          dataTestid: 'custom-base-switch',
          enabled: false,
        },
      });
      const switchElement = screen.getByTestId('custom-base-switch');

      expect(switchElement).not.toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');

      await fireEvent.keyPress(switchElement, { key: 'Enter' });

      expect(switchElement).toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100');
    });

    it('disable the switch when keypress enter on switch button', async () => {
      render(BaseSwitch, {
        props: {
          dataTestid: 'custom-base-switch',
          enabled: true,
        },
      });
      const switchElement = screen.getByTestId('custom-base-switch');

      expect(switchElement).toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100');

      await fireEvent.keyPress(switchElement, { key: 'Enter' });

      expect(switchElement).not.toBeChecked();
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');
    });
  });
});
