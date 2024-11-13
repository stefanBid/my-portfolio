import { render, waitFor, screen } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import { BaseSection } from '@/components';

describe('BaseSection Unit Tests', () => {
  describe('Props', () => {
    it('set the correct section title and paragraph', () => {
      render(BaseSection, {
        props: {
          dataTestid: 'custom-base-section',
          title: 'Test Section Title',
          paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      });

      expect(screen.getByTestId('custom-base-section')).toHaveTextContent('Test Section Title');
      expect(screen.getByTestId('custom-base-section')).toHaveTextContent(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      );
    });

    it.each([undefined, 'Test Section Subtitle'])(
      'set the correct section subtitle "%s"',
      (subtitle) => {
        render(BaseSection, {
          props: {
            dataTestid: 'custom-base-section',
            title: 'Test Section Title',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            subtitle,
          },
        });

        if (subtitle)
          expect(screen.getByTestId('custom-base-section')).toHaveTextContent(
            'Test Section Subtitle',
          );
        else
          expect(screen.getByTestId('custom-base-section')).not.toHaveTextContent(
            'Test Section Subtitle',
          );
      },
    );

    it.each([true, false])(
      'set the correct section organization when inverted is "%s"',
      (inverted) => {
        render(BaseSection, {
          props: {
            dataTestid: 'custom-base-section',
            title: 'Test Section Title',
            paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            inverted,
          },
        });

        const section = screen.getByTestId('custom-base-section');

        if (inverted) {
          expect(section).not.toHaveClass('flex-row');
          expect(section).toHaveClass('flex-row-reverse');
        } else {
          expect(section).not.toHaveClass('flex-row-reverse');
          expect(section).toHaveClass('flex-row');
        }
      },
    );
  });

  describe('State', () => {
    it('set the correct opacity state when section is in the viewport', async () => {
      render(BaseSection, {
        props: {
          dataTestid: 'custom-base-section',
          title: 'Test Section Title',
          paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      });
      const mockObserver = global.IntersectionObserver as unknown as ReturnType<typeof vi.fn>;

      const observerInstance = mockObserver.mock.results[0].value;
      observerInstance.trigger(true);

      await waitFor(() => {
        expect(screen.getByTestId('custom-base-section')).toHaveClass('opacity-100');
      });
    });

    it('set the correct opacity state when section is out of the viewport', async () => {
      render(BaseSection, {
        props: {
          dataTestid: 'custom-base-section',
          title: 'Test Section Title',
          paragraph: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      });

      const mockObserver = global.IntersectionObserver as unknown as ReturnType<typeof vi.fn>;

      const observerInstance = mockObserver.mock.results[0].value;
      observerInstance.trigger(false);

      await waitFor(() => {
        expect(screen.getByTestId('custom-base-section')).toHaveClass('opacity-0');
      });
    });
  });
});
