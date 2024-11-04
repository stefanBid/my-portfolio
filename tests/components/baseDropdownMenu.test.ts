import { render, fireEvent, waitFor } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import { BaseDropdownMenu } from '@/components';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

describe('BaseDropdownMenu.vue', () => {
  describe('Button rendering and behavior', () => {
    it('renders BaseButton with correct properties', () => {
      const { getByTestId } = render(BaseDropdownMenu, {
        props: {
          dataTestid: 'base-dropdown-menu',
          label: 'Options',
        },
      });

      const button = getByTestId('base-dropdown-menu-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Options');
      expect(button).toHaveClass('border-2 !justify-between group');
    });

    it('renders icon component when provided', () => {
      const { getByTestId } = render(BaseDropdownMenu, {
        props: {
          dataTestid: 'base-dropdown-menu',
          icon: ChevronDownIcon,
        },
      });

      const button = getByTestId('base-dropdown-menu-button');
      const icon = button.querySelector('svg');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('shrink-0');
    });

    it('changes button style on state change', async () => {
      const { getByTestId } = render(BaseDropdownMenu, {
        props: {
          dataTestid: 'base-dropdown-menu',
        },
      });

      const button = getByTestId('base-dropdown-menu-button');
      await fireEvent.click(button);
      expect(button).toHaveClass('border-sb-tertiary-100 bg-sb-tertiary-100 text-black');

      await fireEvent.click(button);
      expect(button).toHaveClass('bg-sb-secondary-300 border-sb-secondary-200');

      await fireEvent.mouseOver(button);
      expect(button).toHaveClass('hover:bg-sb-tertiary-200 hover:border-sb-tertiary-200');
    });
  });

  describe('Dropdown visibility', () => {
    it('toggles visibility of dropdown on button click', async () => {
      const { getByTestId, findByTestId } = render(BaseDropdownMenu, {
        props: {
          dataTestid: 'base-dropdown-menu',
        },
      });

      const button = getByTestId('base-dropdown-menu-button');
      await fireEvent.click(button);

      const floatingPanel = await findByTestId('base-dropdown-menu-floating-panel');
      expect(floatingPanel).toBeVisible();
      expect(floatingPanel).toHaveClass('border-sb-secondary-100 bg-sb-secondary-100 shadow-black');

      await fireEvent.click(button);
      expect(floatingPanel).not.toBeVisible();
    });

    it('closes dropdown when clicking outside', async () => {
      const { getByTestId, findByTestId } = render(BaseDropdownMenu, {
        props: {
          dataTestid: 'base-dropdown-menu',
        },
      });

      const button = getByTestId('base-dropdown-menu-button');
      await fireEvent.click(button);
      const floatingPanel = await findByTestId('base-dropdown-menu-floating-panel');
      expect(floatingPanel).toBeVisible();

      await fireEvent.click(document.body);
      expect(floatingPanel).not.toBeVisible();
    });

    it('should close menu when button goes out of view', async () => {
      const mockIntersectionObserver = vi.fn((callback) => {
        callback([{ isIntersecting: true }]);
        return {
          observe: vi.fn(),
          disconnect: vi.fn(),
          unobserve: vi.fn(),
          takeRecords: vi.fn(),
          root: null,
          rootMargin: '',
          thresholds: [],
        };
      });

      // Mock the IntersectionObserver globally
      window.IntersectionObserver = mockIntersectionObserver;

      const { getByTestId, findByTestId } = render(BaseDropdownMenu, {
        props: {
          dataTestid: 'base-dropdown-menu',
          intersectionObserverSettings: {
            rootElement: null,
            rootMargin: '-80px 0px 0px 0px',
            threshold: 0.05,
          },
        },
      });

      const button = getByTestId('base-dropdown-menu-button');
      await fireEvent.click(button);

      const floatingPanel = await findByTestId('base-dropdown-menu-floating-panel');
      expect(floatingPanel).toBeVisible();

      mockIntersectionObserver.mock.calls[0][0]([{ isIntersecting: false }]);
      await waitFor(() => expect(floatingPanel).not.toBeInTheDocument());
    });
  });

  describe('Dropdown positioning and styling', () => {
    it('applies correct z-index class based on props', async () => {
      const { getByTestId, findByTestId } = render(BaseDropdownMenu, {
        props: {
          dataTestid: 'base-dropdown-menu',
          zIndex: 'z-sb-base-5',
        },
      });
      const button = getByTestId('base-dropdown-menu-button');
      await fireEvent.click(button);

      const floatingPanel = await findByTestId('base-dropdown-menu-floating-panel');
      expect(floatingPanel).toHaveClass('z-sb-base-5');
    });

    it('applies default z-index when no zIndex prop is provided', async () => {
      const { getByTestId, findByTestId } = render(BaseDropdownMenu, {
        props: {
          dataTestid: 'base-dropdown-menu',
        },
      });

      const button = getByTestId('base-dropdown-menu-button');
      await fireEvent.click(button);

      const floatingPanel = await findByTestId('base-dropdown-menu-floating-panel');
      expect(floatingPanel).toHaveClass('z-sb-dropdown');
    });

    it.each(['absolute', 'fixed'])('uses menu strategy "%s"', async (strategy) => {
      const { getByTestId, findByTestId } = render(BaseDropdownMenu, {
        props: {
          dataTestid: 'base-dropdown-menu',
          menuStrategy: strategy as 'absolute' | 'fixed',
        },
      });

      const button = getByTestId('base-dropdown-menu-button');
      await fireEvent.click(button);

      const floatingPanel = await findByTestId('base-dropdown-menu-floating-panel');
      expect(floatingPanel.style.position).toBe(strategy);
    });
  });
});
