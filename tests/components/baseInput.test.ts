import { render, fireEvent, waitFor } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import { BaseInput } from '@/components';

describe('BaseInput.vue', () => {
  // Test props
  describe('Basic rendering and behavior ', () => {
    it.each([
      ['Test Label', 'text', undefined],
      ['Search Label', 'search', 'Search a value'],
      ['Email Label', 'email', 'Enter an email address (ex: example@ex.com)'],
    ])(
      'should render with label "%s", type "%s", and placeholder "%s"',
      async (label, type, placeholder) => {
        const { getByTestId } = render(BaseInput, {
          props: {
            dataTestid: 'base-input',
            label,
            type: type as 'text' | 'search' | 'email',
            placeholder,
            inputValue: '',
          },
        });

        if (!label) {
          expect(getByTestId('base-input-label')).toBeNull();
        } else {
          expect(getByTestId('base-input-label')).not.toBeNull();
          expect(getByTestId('base-input-label')).toHaveTextContent(label);
        }

        const input = getByTestId('base-input');
        expect(input).toHaveAttribute('type', type);
        expect(input).toHaveAttribute('placeholder', placeholder || 'Enter a value');
      },
    );

    it.each([true, false])('should render menu button when withMenu is %s', async (withMenu) => {
      const { queryByTestId } = render(BaseInput, { props: { withMenu, inputValue: '' } });

      if (withMenu) {
        expect(queryByTestId('base-input-button-menu')).toBeTruthy();
      } else {
        expect(queryByTestId('base-input-button-menu')).toBeNull();
      }
    });
  });

  // Test input field interactions
  describe('Input Field Behavior', () => {
    it('should update the input value when inputValue changes', async () => {
      const { getByTestId, emitted } = render(BaseInput, {
        props: { dataTestid: 'base-input', inputValue: '' },
      });

      const input = getByTestId('base-input');
      await fireEvent.update(input, 'test value');

      expect(emitted()['update:inputValue']).toBeTruthy();
      expect(emitted()['update:inputValue'][0]).toEqual(['test value']);
    });

    it('should apply appropriate styles based on input value presence', async () => {
      const { getByTestId } = render(BaseInput, { props: { inputValue: '' } });
      const input = getByTestId('base-input');

      expect(input).toHaveClass('bg-transparent');
      await fireEvent.update(input, 'non-empty');
      expect(input).toHaveClass('bg-sb-secondary-100/50');
    });
  });

  // Test menu button and floating panel interactions
  describe('Menu Interactions', () => {
    it('should open and close menu on button click when withMenu is true', async () => {
      const { getByTestId, queryByTestId } = render(BaseInput, {
        props: { dataTestid: 'base-input', withMenu: true, inputValue: '' },
      });

      const button = getByTestId('base-input-button-menu');
      await fireEvent.click(button);

      // Check menu is open
      const menuBox = await queryByTestId('base-input-input-menu-box');
      expect(menuBox).toBeTruthy();

      // Close the menu and check again
      await fireEvent.click(button);
      await waitFor(() => expect(menuBox).not.toBeInTheDocument());
    });

    it('should close menu on click outside', async () => {
      const { getByTestId, queryByTestId } = render(BaseInput, {
        props: { dataTestid: 'base-input', withMenu: true, inputValue: '' },
      });

      const button = getByTestId('base-input-button-menu');
      await fireEvent.click(button);

      const menuBox = await queryByTestId('base-input-input-menu-box');
      expect(menuBox).toBeTruthy();

      // Simulate clicking outside
      await fireEvent.click(document.body);
      await waitFor(() => expect(menuBox).not.toBeInTheDocument());
    });
  });

  // Test Intersection Observer
  describe('Intersection Observer', () => {
    it('should close menu when input goes out of view', async () => {
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

      const { getByTestId, findByTestId } = render(BaseInput, {
        props: {
          dataTestid: 'base-input',
          withMenu: true,
          intersectionObserverSettings: {
            rootElement: null,
            rootMargin: '-80px 0px 0px 0px',
            threshold: 0.05,
          },
          inputValue: '',
        },
      });

      const button = getByTestId('base-input-button-menu');
      await fireEvent.click(button);

      const menuBox = await findByTestId('base-input-input-menu-box');
      expect(menuBox).toBeTruthy();

      // Trigger the IntersectionObserver callback to simulate going out of view
      mockIntersectionObserver.mock.calls[0][0]([{ isIntersecting: false }]);
      await waitFor(() => expect(menuBox).not.toBeInTheDocument());
    });
  });
});
