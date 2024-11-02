import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { BaseButton } from '@/components';
import { ArrowPathIcon } from '@heroicons/vue/24/outline';

describe('BaseButton.vue', () => {
  describe('Basic rendering and behavior', () => {
    it('renders the button with default props', () => {
      const { getByTestId } = render(BaseButton, {
        slots: { default: 'Click me' },
      });

      const button = getByTestId('base-button');
      expect(button).toHaveTextContent('Click me');
      expect(button).toHaveClass('inline-flex');
      expect(button).not.toHaveClass('pointer-events-none opacity-50');
      const icon = getByTestId('base-button').querySelector('svg');
      expect(icon).toBeNull();
    });

    it('renders the button as disabled', async () => {
      const { getByTestId } = render(BaseButton, {
        props: { disabled: true },
      });

      const button = getByTestId('base-button');
      expect(button).toHaveClass('pointer-events-none opacity-50');
      expect(button).toHaveAttribute('disabled');
    });

    it('renders the button with loading icon', () => {
      const { getByTestId } = render(BaseButton, {
        props: { loading: true },
        slots: { default: 'Loading' },
      });

      const button = getByTestId('base-button');
      expect(button).toHaveClass('pointer-events-none opacity-50');
      expect(button).toHaveAttribute('disabled');

      const icon = getByTestId('base-button').querySelector('svg');
      expect(icon).not.toBeNull();
      expect(icon).toHaveClass('animate-spin');
    });

    it('renders the custom icon when not loading', () => {
      const { getByTestId } = render(BaseButton, {
        props: { icon: ArrowPathIcon },
        slots: { default: 'Custom Icon' },
      });

      const icon = getByTestId('base-button').querySelector('svg');
      expect(icon).not.toBeNull();
      expect(icon).not.toHaveClass('animate-spin');
    });

    it('emits click event when clicked', async () => {
      const { getByTestId, emitted } = render(BaseButton, {});

      const button = getByTestId('base-button');
      await fireEvent.click(button);

      expect(emitted()).toHaveProperty('click');
    });
  });
  describe('Variant and size classes', () => {
    // Testing all variant and contentSize combinations
    const variants = ['white', 'tertiary', 'custom'] as ('white' | 'tertiary' | 'custom')[];
    const sizes = ['medium', 'small', 'custom'] as ('medium' | 'small' | 'custom')[];

    variants.forEach((variant) => {
      sizes.forEach((size) => {
        it(`applies correct classes for variant "${variant}" and size "${size}"`, async () => {
          const { getByTestId } = render(BaseButton, {
            props: { variant, contentSize: size },
          });

          const button = getByTestId('base-button');

          if (variant === 'white') {
            expect(button).toHaveClass('bg-white', 'text-black');
            await fireEvent.mouseOver(button);
            expect(button).toHaveClass('hover:bg-sb-secondary-100', 'hover:text-white');
            await fireEvent.focus(button);
            expect(button).toHaveClass(
              'focus-visible:bg-sb-secondary-100',
              'focus-visible:text-white',
            );
          } else if (variant === 'tertiary') {
            expect(button).toHaveClass('bg-transparent/50', 'text-white', 'border-white');
            await fireEvent.mouseOver(button);
            expect(button).toHaveClass('hover:bg-sb-tertiary-100', 'hover:text-black');
            await fireEvent.focus(button);
            expect(button).toHaveClass(
              'focus-visible:bg-sb-tertiary-100',
              'focus-visible:text-black',
            );
          } else if (variant === 'custom') {
            expect(button).not.toHaveClass(
              'bg-white',
              'bg-transparent/50',
              'text-black',
              'text-white',
            );
          }

          // Content size-specific tests
          if (size === 'medium') {
            expect(button).toHaveClass('px-6', 'py-4', 'gap-x-3', 'text-sb-lg');
          } else if (size === 'small') {
            expect(button).toHaveClass('px-3.5', 'py-1.5', 'gap-x-2', 'text-sb-sm');
          } else if (size === 'custom') {
            expect(button).toHaveClass('text-sb-sm');
            expect(button).not.toHaveClass('px-6', 'py-4', 'gap-x-3');
            expect(button).not.toHaveClass('px-3.5', 'py-1.5', 'gap-x-2');
          }
        });
      });
    });
  });
});
