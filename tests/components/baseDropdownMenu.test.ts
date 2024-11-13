import { render, fireEvent, screen, waitFor } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import { BaseDropdownMenu } from '@/components';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

describe('BaseDropdownMenu Unit Tests', () => {
  describe('Props', () => {
    it('set the correct dropdown only with label', () => {
      render(BaseDropdownMenu, {
        props: {
          dataTestid: 'custom-base-dropdown-menu',
          label: 'Test Dropdown Label',
        },
      });
      const dropdown = screen.getByTestId('custom-base-dropdown-menu-button');
      expect(dropdown).toBeInTheDocument();
      expect(dropdown).toHaveTextContent('Test Dropdown Label');
    });

    it('set the correct aria-label', () => {
      render(BaseDropdownMenu, {
        props: {
          dataTestid: 'custom-base-dropdown-menu',
          ariaLabel: 'test-aria-label',
        },
      });
      const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
      expect(dropdownButton).toHaveAttribute('aria-label', 'test-aria-label');
    });
  });

  describe('Icon Rendering', () => {
    it('render only the open/close icon if the icon prop is not passed', () => {
      render(BaseDropdownMenu, {
        props: {
          dataTestid: 'custom-base-dropdown-menu',
        },
      });
      const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
      const icon = dropdownButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('ml-2 transition-sb-slow shrink-0');

      const internalIcon = dropdownButton.querySelector('span > svg');
      expect(internalIcon).toBeNull();
    });

    it('render the icon if the icon prop is passed', () => {
      render(BaseDropdownMenu, {
        props: {
          dataTestid: 'custom-base-dropdown-menu',
          icon: ChevronDownIcon,
        },
      });
      const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
      const internalIcon = dropdownButton.querySelector('span > svg');
      expect(internalIcon).toBeInTheDocument();
      expect(internalIcon).toHaveClass('shrink-0');
    });
  });

  describe('User Interaction and State', () => {
    it('set the correct style when thee dropdown is clicked', async () => {
      render(BaseDropdownMenu, {
        props: {
          dataTestid: 'custom-base-dropdown-menu',
        },
      });

      const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
      const icon = dropdownButton.querySelector('svg');
      expect(dropdownButton).toHaveClass('text-white bg-sb-secondary-300  border-sb-secondary-200');
      expect(icon).toHaveClass('rotate-0');
      await fireEvent.click(dropdownButton);
      expect(dropdownButton).toHaveClass('border-sb-tertiary-100 bg-sb-tertiary-100 text-black');
      expect(icon).toHaveClass('rotate-180');
    });

    it('render the menu box when the dropdown button is clicked', async () => {
      render(BaseDropdownMenu, {
        props: {
          dataTestid: 'custom-base-dropdown-menu',
        },
      });

      const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
      await fireEvent.click(dropdownButton);
      const dropdownMenu = await screen.findByTestId('custom-base-dropdown-menu-floating-panel');
      expect(dropdownMenu).toBeInTheDocument();
      expect(dropdownMenu).toHaveClass('box-border border-2 rounded-lg shadow-2xl');
    });

    it('close the menu box when click outside the dropdown', async () => {
      render(BaseDropdownMenu, {
        props: {
          dataTestid: 'custom-base-dropdown-menu',
        },
      });

      const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
      await fireEvent.click(dropdownButton);

      expect(
        await screen.findByTestId('custom-base-dropdown-menu-floating-panel'),
      ).toBeInTheDocument();

      await fireEvent.click(document.body);
      await waitFor(() => {
        expect(screen.queryByTestId('custom-base-dropdown-menu-floating-panel')).toBeNull();
      });
    });

    it('close the menu box when dropdownButton is out of viewport', async () => {
      render(BaseDropdownMenu, {
        props: {
          dataTestid: 'custom-base-dropdown-menu',
        },
      });

      const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
      await fireEvent.click(dropdownButton);

      expect(
        await screen.findByTestId('custom-base-dropdown-menu-floating-panel'),
      ).toBeInTheDocument();

      const mockObserver = global.IntersectionObserver as unknown as ReturnType<typeof vi.fn>;

      const observerInstance = mockObserver.mock.results[0].value;
      observerInstance.trigger(false);

      await waitFor(() => {
        expect(screen.queryByTestId('custom-base-dropdown-menu-floating-panel')).toBeNull();
      });
    });

    describe('Advanced Props', () => {
      it.each(['absolute', 'fixed'])(
        `set the correct position "%s" for menu box`,
        async (position) => {
          render(BaseDropdownMenu, {
            props: {
              dataTestid: 'custom-base-dropdown-menu',
              menuStrategy: position as 'absolute' | 'fixed',
            },
          });
          const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
          await fireEvent.click(dropdownButton);
          const dropdownMenu = await screen.findByTestId(
            'custom-base-dropdown-menu-floating-panel',
          );
          expect(dropdownMenu).toBeInTheDocument();
          expect(dropdownMenu.style.position).toBe(position);
        },
      );
      it.each(['z-sb-base-5', 'z-sb-dropdown'])(
        `set the correct z-index "%s" for menu box`,
        async (zIndex) => {
          render(BaseDropdownMenu, {
            props: {
              dataTestid: 'custom-base-dropdown-menu',
              zIndex: zIndex as 'z-sb-base-5' | 'z-sb-dropdown',
            },
          });
          const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
          await fireEvent.click(dropdownButton);
          const dropdownMenu = await screen.findByTestId(
            'custom-base-dropdown-menu-floating-panel',
          );
          expect(dropdownMenu).toBeInTheDocument();
          expect(dropdownMenu).toHaveClass(zIndex);
        },
      );
    });
  });

  describe('Slot Rendering', () => {
    it('render the slot content', async () => {
      render(BaseDropdownMenu, {
        props: {
          dataTestid: 'custom-base-dropdown-menu',
        },
        slots: {
          'dropdown-section-content': () => 'Slot Content',
        },
      });

      const dropdownButton = screen.getByTestId('custom-base-dropdown-menu-button');
      await fireEvent.click(dropdownButton);
      const dropdownMenu = await screen.findByTestId('custom-base-dropdown-menu-floating-panel');
      expect(dropdownMenu).toHaveTextContent('Slot Content');
    });
  });
});
