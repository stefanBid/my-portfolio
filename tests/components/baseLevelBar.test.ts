import { render } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { BaseLevelBar } from '@/components';

describe('BaseLevelBar.vue', () => {
  describe('Label rendering', () => {
    it('renders label when provided', () => {
      const { getByTestId } = render(BaseLevelBar, {
        props: {
          label: 'Skill Level',
          level: 5,
          dataTestId: 'base-level-bar',
        },
      });

      const label = getByTestId('base-level-bar-label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Skill Level');
      expect(label).toHaveClass('text-white font-roboto');
    });

    it('does not render label when not provided', () => {
      const { queryByTestId } = render(BaseLevelBar, {
        props: {
          level: 5,
          dataTestId: 'base-level-bar',
        },
      });

      const label = queryByTestId('base-level-bar-label');
      expect(label).toBeNull();
    });
  });

  describe('Level Bar Width with Boundary Values', () => {
    it.each([
      { level: -5, scale: 'decimal', expectedWidth: '0%' },
      { level: 0, scale: 'decimal', expectedWidth: '0%' },
      { level: 5, scale: 'decimal', expectedWidth: '50%' },
      { level: 10, scale: 'decimal', expectedWidth: '100%' },
      { level: 15, scale: 'decimal', expectedWidth: '100%' },
      { level: -10, scale: 'percentage', expectedWidth: '0%' },
      { level: 0, scale: 'percentage', expectedWidth: '0%' },
      { level: 50, scale: 'percentage', expectedWidth: '50%' },
      { level: 100, scale: 'percentage', expectedWidth: '100%' },
      { level: 150, scale: 'percentage', expectedWidth: '100%' },
    ])(
      'calculates correct width for level $level on $scale scale',
      ({ level, scale, expectedWidth }) => {
        const { getByTestId } = render(BaseLevelBar, {
          props: {
            level,
            scale: scale as 'decimal' | 'percentage',
            dataTestId: 'base-level-bar',
          },
        });

        const bar = getByTestId('base-level-bar').querySelector('.bg-sb-tertiary-100');
        expect((bar as HTMLElement).style.width).toBe(expectedWidth);
      },
    );
  });

  describe('Score Display with Boundary Values', () => {
    it.each([
      { level: -5, scale: 'decimal', expectedScore: '0.0 / 10' },
      { level: 0, scale: 'decimal', expectedScore: '0.0 / 10' },
      { level: 5, scale: 'decimal', expectedScore: '5.0 / 10' },
      { level: 10, scale: 'decimal', expectedScore: '10 / 10' },
      { level: 15, scale: 'decimal', expectedScore: '10 / 10' },
      { level: -10, scale: 'percentage', expectedScore: '0.0%' },
      { level: 0, scale: 'percentage', expectedScore: '0.0%' },
      { level: 50, scale: 'percentage', expectedScore: '50.0%' },
      { level: 100, scale: 'percentage', expectedScore: '100.0%' },
      { level: 150, scale: 'percentage', expectedScore: '100.0%' },
    ])(
      'displays correct score for level $level on $scale scale',
      ({ level, scale, expectedScore }) => {
        const { getByText } = render(BaseLevelBar, {
          props: {
            level,
            scale: scale as 'decimal' | 'percentage',
            dataTestId: 'base-level-bar',
          },
        });

        const score = getByText(expectedScore);
        expect(score).toBeInTheDocument();
      },
    );
  });

  describe('Responsive bar height', () => {
    it('applies large height class for larger breakpoints', () => {
      const { getByTestId } = render(BaseLevelBar, {
        props: {
          level: 5,
          dataTestId: 'base-level-bar',
        },
      });

      const bar = getByTestId('base-level-bar').querySelector('.relative');
      expect(bar).toHaveClass('h-2.5');
    });
  });
});
