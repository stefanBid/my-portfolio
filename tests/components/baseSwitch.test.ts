import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { BaseSwitch } from '@/components';

describe('BaseSwitch.vue', () => {
  describe('Label rendering', () => {
    it('renders label when provided', () => {
      const { getByTestId } = render(BaseSwitch, {
        props: {
          label: 'Toggle Label',
          dataTestid: 'base-switch',
          enabled: false,
        },
      });

      const label = getByTestId('base-switch-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Toggle Label');
      expect(label).toHaveClass('text-white', 'font-roboto');
    });

    it('does not render label when not provided', () => {
      const { queryByTestId } = render(BaseSwitch, {
        props: {
          dataTestid: 'base-switch',
          enabled: false,
        },
      });

      const label = queryByTestId('base-switch-label');
      expect(label).toBeNull();
    });
  });

  describe('Switch state and classes', () => {
    it('has correct default state', () => {
      const { getByTestId } = render(BaseSwitch, {
        props: {
          dataTestid: 'base-switch',
          enabled: false,
        },
      });

      const switchElement = getByTestId('base-switch');
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50'); // default `enabled` is false
    });

    it('toggles state and classes on click', async () => {
      const { getByTestId } = render(BaseSwitch, {
        props: {
          dataTestid: 'base-switch',
          enabled: false,
        },
      });

      const switchElement = getByTestId('base-switch');
      const toggle = switchElement.querySelector('span');

      // Verify initial state
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');
      expect(toggle).toHaveClass('translate-x-0.5');

      // Toggle state
      await fireEvent.click(switchElement);
      expect(switchElement).toHaveClass('bg-sb-tertiary-100');
      expect(toggle).toHaveClass('translate-x-[22px]');

      // Toggle back
      await fireEvent.click(switchElement);
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');
      expect(toggle).toHaveClass('translate-x-0.5');
    });

    it('toggles state and classes on label click', async () => {
      const { getByTestId } = render(BaseSwitch, {
        props: {
          dataTestid: 'base-switch',
          label: 'Toggle Label',
          enabled: false,
        },
      });

      const switchElement = getByTestId('base-switch');
      // Verify initial state
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');

      const label = getByTestId('base-switch-label');

      await fireEvent.click(label);
      expect(switchElement).toHaveClass('bg-sb-tertiary-100');
    });
  });

  describe('Keyboard interaction', () => {
    it('toggles switch state with Enter keypress', async () => {
      const { getByTestId } = render(BaseSwitch, {
        props: {
          dataTestid: 'base-switch',
          enabled: false,
        },
      });

      const switchElement = getByTestId('base-switch');
      expect(switchElement).toHaveClass('bg-sb-tertiary-100/50');

      await fireEvent.keyPress(switchElement, { key: 'Enter', code: 'Enter', charCode: 13 });
      expect(switchElement).toHaveClass('bg-sb-tertiary-100');
    });
  });
});
