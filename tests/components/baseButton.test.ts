import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { BaseButton } from '../../src/components';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

describe('BaseButton Unit Tests', () => {
  describe('Props', () => {
    it.each(['button', 'submit', 'reset'])('set the correct button type "%s"', (type) => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
          type: type as 'button' | 'submit' | 'reset',
        },
      });
      expect(screen.getByTestId('custom-base-button')).toHaveAttribute('type', type);
    });

    it.each(['tertiary', 'white', 'custom'])('set the correct button variant "%s"', (variant) => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
          variant: variant as 'tertiary' | 'white' | 'custom',
        },
      });

      const button = screen.getByTestId('custom-base-button');

      if (variant === 'tertiary')
        expect(button).toHaveClass('bg-transparent/50 text-white border-2 border-white');

      if (variant === 'white')
        expect(button).toHaveClass('bg-white text-black border-2 border-white');

      if (variant === 'custom') {
        expect(button).not.toHaveClass('bg-white text-black border-2 border-white');
        expect(button).not.toHaveClass('bg-transparent/50 text-white border-2 border-white');
      }
    });

    it.each([true, false])('set the correct button disabled state "%s"', (disabled) => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
          disabled,
        },
      });
      const button = screen.getByTestId('custom-base-button');

      if (disabled) {
        expect(button).toBeDisabled();
        expect(button).toHaveClass('opacity-50 pointer-events-none');
      } else {
        expect(button).not.toBeDisabled();
        expect(button).not.toHaveClass('opacity-50 pointer-events-none');
      }
    });

    it.each([true, false])('set the correct button loading state "%s"', (loading) => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
          loading,
        },
      });
      const button = screen.getByTestId('custom-base-button');
      const loadingIcon = button.querySelector('svg');

      if (loading) {
        expect(button).toBeDisabled();
        expect(button).toHaveClass('pointer-events-none opacity-50');
        expect(loadingIcon).toBeInTheDocument();
        expect(loadingIcon).toHaveClass('animate-spin');
      } else {
        expect(button).not.toBeDisabled();
        expect(button).not.toHaveClass('pointer-events-none opacity-50');
        expect(loadingIcon).not.toBeInTheDocument();
      }
    });

    it.each(['small', 'medium', 'custom'])('set the correct button content size "%s"', (size) => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
          contentSize: size as 'small' | 'medium' | 'custom',
          icon: ArrowPathIcon,
        },
      });

      const button = screen.getByTestId('custom-base-button');
      const icon = button.querySelector('svg');
      if (size === 'small') {
        expect(button).toHaveClass('text-sb-sm');
        expect(icon).toHaveClass('size-4');
      }

      if (size === 'medium') {
        expect(button).toHaveClass('text-sb-lg');
        expect(icon).toHaveClass('size-6');
      }

      if (size === 'custom') {
        expect(button).not.toHaveClass('text-sb-sm');
        expect(button).not.toHaveClass('text-sb-lg');
        expect(icon).not.toHaveClass('size-4');
        expect(icon).not.toHaveClass('size-6');
      }
    });

    it.each(['small', 'medium', 'custom'])('set the correct spacing size "%s"', (size) => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
          spacingSize: size as 'small' | 'medium' | 'custom',
        },
      });

      const button = screen.getByTestId('custom-base-button');
      if (size === 'small') expect(button).toHaveClass('px-4 py-2');

      if (size === 'medium') expect(button).toHaveClass('px-6 py-4');

      if (size === 'custom') {
        expect(button).not.toHaveClass('px-4 py-2');
        expect(button).not.toHaveClass('px-6 py-4');
      }
    });

    it('set the correct aria-label', () => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
          ariaLabel: 'test-aria-label',
        },
      });
      expect(screen.getByTestId('custom-base-button')).toHaveAttribute(
        'aria-label',
        'test-aria-label',
      );
    });
  });

  describe('Icon Rendering', () => {
    it('renders the icon if the icon prop is passed and the button is not loading', () => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
          icon: ArrowPathIcon,
        },
      });
      const button = screen.getByTestId('custom-base-button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).not.toHaveClass('animate-spin');
    });

    it('does render the icon if the button is loading', () => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
          loading: true,
        },
      });
      const button = screen.getByTestId('custom-base-button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('animate-spin');
    });

    it('does not render the icon if the icon prop is not passed and the button is not loading', () => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
        },
      });
      const button = screen.getByTestId('custom-base-button');
      const icon = button.querySelector('svg');
      expect(icon).not.toBeInTheDocument();
    });
  });

  describe('Slot Rendering', () => {
    it('renders the slot content', () => {
      render(BaseButton, {
        props: {
          dataTestid: 'custom-base-button',
        },
        slots: {
          default: () => 'Slot Content',
        },
      });
      expect(screen.getByTestId('custom-base-button')).toHaveTextContent('Slot Content');
    });
  });
});
