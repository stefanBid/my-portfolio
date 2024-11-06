import { render, waitFor } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import { BaseSection } from '@/components';

describe('BaseSection.vue', () => {
  describe('Section rendering', () => {
    it('renders BaseSection with correct properties', () => {
      const { getByTestId, queryByTestId } = render(BaseSection, {
        props: {
          title: 'Section Title',
          paragraph: 'Section Paragraph',
          dataTestid: 'base-section',
        },
      });

      const section = getByTestId('base-section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent('Section Title');
      expect(section).toHaveTextContent('Section Paragraph');

      expect(queryByTestId('base-section-subtitle')).toBeNull();
    });

    it('renders BaseSection with optional subtitle', () => {
      const { getByTestId } = render(BaseSection, {
        props: {
          title: 'Section Title',
          paragraph: 'Section Paragraph',
          subtitle: 'Section Subtitle',
          dataTestid: 'base-section',
        },
      });

      const section = getByTestId('base-section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveTextContent('Section Title');
      expect(section).toHaveTextContent('Section Paragraph');
      expect(section).toHaveTextContent('Section Subtitle');
    });
  });

  describe('Section text alignment', () => {
    it.each([false, true])(
      'renders BaseSection with correct text alignment when inverted is "%s"',
      (inverted) => {
        const { getByTestId } = render(BaseSection, {
          props: {
            title: 'Section Title',
            subtitle: 'Section Subtitle',
            paragraph: 'Section Paragraph',
            dataTestid: 'base-section',
            inverted,
          },
        });

        const sectionTitle = getByTestId('base-section-title');
        const sectionSubtitle = getByTestId('base-section-subtitle');
        const sectionParagraph = getByTestId('base-section-paragraph');
        if (inverted) {
          expect(sectionTitle).toHaveClass('text-right');
          expect(sectionSubtitle).toHaveClass('text-right');
        } else {
          expect(sectionTitle).toHaveClass('text-left');
          expect(sectionSubtitle).toHaveClass('text-left');
        }
        expect(sectionParagraph).toHaveClass('text-justify');
      },
    );
  });
  describe('Section extra content slot rendering', () => {
    it('renders BaseSection with extra content slot', () => {
      const { getByTestId } = render(BaseSection, {
        props: {
          title: 'Section Title',
          paragraph: 'Section Paragraph',
          dataTestid: 'base-section',
        },
        slots: {
          'extra-content': () => 'Extra Content',
        },
      });

      expect(getByTestId('base-section')).toHaveTextContent('Extra Content');
    });
  });

  describe('Section visibility', () => {
    it('toggle visibility of section when goes out of viewport', async () => {
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

      const { getByTestId } = render(BaseSection, {
        props: {
          title: 'Section Title',
          paragraph: 'Section Paragraph',
          dataTestid: 'base-section',
          intersectionObserverSettings: {
            rootElement: null,
            rootMargin: '-80px 0px 0px 0px',
            threshold: 0.05,
          },
        },
      });

      const section = getByTestId('base-section');
      expect(section).toBeVisible();

      mockIntersectionObserver.mock.calls[0][0]([{ isIntersecting: false }]);
      await waitFor(() => expect(section).toHaveClass('opacity-0'));
    });
  });
});
