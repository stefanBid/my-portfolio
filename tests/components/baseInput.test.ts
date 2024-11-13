import { render, fireEvent, screen, waitFor } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import { BaseInput } from '@/components';

describe('BaseInput Unit Tests', () => {
  describe('Props', () => {
    it.each(['Custom label', undefined])('render label correctly when provided "%s"', (label) => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          label,
          inputValue: '',
        },
      });

      const labelElement = screen.queryByTestId('custom-base-input-label');

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
        render(BaseInput, {
          props: {
            dataTestid: 'custom-base-input',
            ariaLabel,
            inputValue: '',
          },
        });

        const inputElement = screen.getByTestId('custom-base-input');
        expect(inputElement).toHaveAttribute('aria-label', ariaLabel ? ariaLabel : 'general input');
      },
    );

    it.each([
      { id: undefined, name: undefined },
      { id: 'custom-id', name: 'custom-name' },
    ])('set id and name correctly when id is "$id" and name is "$name"', ({ id, name }) => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          id,
          name,
          inputValue: '',
        },
      });

      const inputElement = screen.getByTestId('custom-base-input');
      const nanoidPattern = /^[a-zA-Z0-9_-]{21}/;

      if (id && name) {
        expect(inputElement).toHaveAttribute('id', id);
        expect(inputElement).toHaveAttribute('name', name);
      } else {
        expect(inputElement.getAttribute('id')).toMatch(
          new RegExp(`^${nanoidPattern.source}-input-id$`),
        );
        expect(inputElement.getAttribute('name')).toMatch(
          new RegExp(`^${nanoidPattern.source}-input-name$`),
        );
      }
    });

    it.each(['text', 'search', 'email'])(`set type correctly when provided "%s"`, (type) => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          type: type as 'text' | 'search' | 'email',
          inputValue: '',
        },
      });

      expect(screen.getByTestId('custom-base-input')).toHaveAttribute('type', type);
    });

    it.each([
      { placeholder: 'Custom placeholder', type: 'text' },
      { placeholder: 'Custom placeholder', type: 'search' },
      { placeholder: 'Custom placeholder', type: 'email' },
      { placeholder: undefined, type: 'text' },
      { placeholder: undefined, type: 'search' },
      { placeholder: undefined, type: 'email' },
    ])(
      'set placeholder correctly when provided "$placeholder" and type is "$type"',
      ({ placeholder, type }) => {
        render(BaseInput, {
          props: {
            dataTestid: 'custom-base-input',
            placeholder,
            type: type as 'text' | 'search' | 'email',
            inputValue: '',
          },
        });

        const inputElement = screen.getByTestId('custom-base-input');
        if (placeholder) {
          expect(inputElement).toHaveAttribute('placeholder', placeholder);
        } else if (type === 'text') {
          expect(inputElement).toHaveAttribute('placeholder', 'Enter a value');
        } else if (type === 'search') {
          expect(inputElement).toHaveAttribute('placeholder', 'Search a value');
        } else if (type === 'email') {
          expect(inputElement).toHaveAttribute(
            'placeholder',
            'Enter an email address (ex: example@ex.com)',
          );
        }
      },
    );
  });

  describe('User Interaction and State', () => {
    it('focus the input when the label is clicked', async () => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          label: 'Custom label',
          withMenu: true,
          inputValue: '',
        },
      });

      await fireEvent.click(screen.getByTestId('custom-base-input-label'));
      expect(screen.getByTestId('custom-base-input')).toHaveFocus();
    });

    it('focus the input when keydown enter on the label', async () => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          label: 'Custom label',
          withMenu: true,
          inputValue: '',
        },
      });

      await fireEvent.keyDown(screen.getByTestId('custom-base-input-label'), { key: 'Enter' });
      expect(screen.getByTestId('custom-base-input')).toHaveFocus();
    });

    it.each([true, false])('render input menu button when is state is "%s"', async (withMenu) => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          withMenu,
          inputValue: '',
        },
      });

      const inputMenuButton = screen.queryByTestId('custom-base-input-menu-button');
      if (withMenu) {
        expect(inputMenuButton).toBeInTheDocument();
      } else {
        expect(inputMenuButton).toBeNull();
      }
    });

    it('open the menu when the input menu button is clicked', async () => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          withMenu: true,
          inputValue: '',
        },
      });

      const inputMenuButton = screen.getByTestId('custom-base-input-menu-button');
      await fireEvent.click(inputMenuButton);
      const inputMenu = await screen.findByTestId('custom-base-input-floating-menu-panel');
      expect(inputMenu).toBeInTheDocument();
    });

    it('close the menu when the menu button is clicked another time', async () => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          withMenu: true,
          inputValue: '',
        },
      });

      const inputMenuButton = screen.getByTestId('custom-base-input-menu-button');
      await fireEvent.click(inputMenuButton);

      expect(
        await screen.findByTestId('custom-base-input-floating-menu-panel'),
      ).toBeInTheDocument();

      await fireEvent.click(inputMenuButton);
      expect(screen.queryByTestId('custom-base-input-floating-menu-panel')).toBeNull();
    });

    it('close the menu when the input menu button is clicked', async () => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          withMenu: true,
          inputValue: '',
        },
      });

      const inputMenuButton = screen.getByTestId('custom-base-input-menu-button');
      await fireEvent.click(inputMenuButton);

      expect(
        await screen.findByTestId('custom-base-input-floating-menu-panel'),
      ).toBeInTheDocument();

      await fireEvent.click(inputMenuButton);

      expect(screen.queryByTestId('custom-base-input-floating-menu-panel')).toBeNull();
    });

    it('close the menu when clicking outside the input menu', async () => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          withMenu: true,
          inputValue: '',
        },
      });

      const inputMenuButton = screen.getByTestId('custom-base-input-menu-button');
      await fireEvent.click(inputMenuButton);

      expect(
        await screen.findByTestId('custom-base-input-floating-menu-panel'),
      ).toBeInTheDocument();

      await fireEvent.click(document);

      await waitFor(() => {
        expect(screen.queryByTestId('custom-base-input-floating-menu-panel')).toBeNull();
      });
    });

    it('close the menu when the inputis out of viewport', async () => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          withMenu: true,
          inputValue: '',
        },
      });

      const inputMenuButton = screen.getByTestId('custom-base-input-menu-button');
      await fireEvent.click(inputMenuButton);

      expect(
        await screen.findByTestId('custom-base-input-floating-menu-panel'),
      ).toBeInTheDocument();

      const mockObserver = global.IntersectionObserver as unknown as ReturnType<typeof vi.fn>;

      const observerInstance = mockObserver.mock.results[0].value;
      observerInstance.trigger(false);

      await waitFor(() => {
        expect(screen.queryByTestId('custom-base-input-floating-menu-panel')).toBeNull();
      });
    });

    it('write the input value correctly', async () => {
      render(BaseInput, {
        props: {
          dataTestid: 'custom-base-input',
          withMenu: true,
          inputValue: '',
        },
      });

      const inputElement = screen.getByTestId('custom-base-input');
      expect(inputElement).toHaveValue('');
      await fireEvent.update(inputElement, 'test');
      expect(inputElement).toHaveValue('test');
    });
  });
});
