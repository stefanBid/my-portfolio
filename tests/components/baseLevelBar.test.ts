import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { BaseLevelBar } from '../../src/components';

describe('BaseLevelBar Unit Tests', () => {
  describe('Props', () => {
    it.each([
      { scale: 'decimal', level: -1, expectedWidth: '0%' },
      { scale: 'decimal', level: 0, expectedWidth: '0%' },
      { scale: 'decimal', level: 5, expectedWidth: '50%' },
      { scale: 'decimal', level: 10, expectedWidth: '100%' },
      { scale: 'decimal', level: 11, expectedWidth: '100%' },
      { scale: 'percentage', level: -1, expectedWidth: '0%' },
      { scale: 'percentage', level: 0, expectedWidth: '0%' },
      { scale: 'percentage', level: 50, expectedWidth: '50%' },
      { scale: 'percentage', level: 100, expectedWidth: '100%' },
      { scale: 'percentage', level: 101, expectedWidth: '100%' },
    ])(
      'set the correct width level "$level" for scale "$scale" ',
      ({ scale, level, expectedWidth }) => {
        render(BaseLevelBar, {
          props: {
            scale: scale as 'decimal' | 'percentage',
            level,
            dataTestid: 'custom-base-level-bar',
          },
        });

        const levelBar = screen.getByTestId('custom-base-level-bar');
        expect(levelBar).toHaveStyle(`width: ${expectedWidth}`);
      },
    );

    it.each([
      { scale: 'decimal', level: -1, expectedScore: '0 / 10' },
      { scale: 'decimal', level: 0, expectedScore: '0 / 10' },
      { scale: 'decimal', level: 5, expectedScore: '5.0 / 10' },
      { scale: 'decimal', level: 10, expectedScore: '10 / 10' },
      { scale: 'decimal', level: 11, expectedScore: '10 / 10' },
      { scale: 'percentage', level: -1, expectedScore: '0%' },
      { scale: 'percentage', level: 0, expectedScore: '0%' },
      { scale: 'percentage', level: 50, expectedScore: '50.0%' },
      { scale: 'percentage', level: 100, expectedScore: '100%' },
      { scale: 'percentage', level: 101, expectedScore: '100%' },
    ])(
      'set the correct level "$level" score when scale is "$scale"',
      async ({ scale, level, expectedScore }) => {
        render(BaseLevelBar, {
          props: {
            scale: scale as 'decimal' | 'percentage',
            level,
            dataTestid: 'custom-base-level-bar',
          },
        });

        expect(screen.getByText(expectedScore)).toBeInTheDocument();
        expect(screen.getByText(expectedScore)).toHaveTextContent(expectedScore);
      },
    );

    it.each([undefined, 'Custom label'])('render label correctly when provided "%s"', (label) => {
      render(BaseLevelBar, {
        props: {
          dataTestid: 'custom-base-level-bar',
          level: 5,
          label,
        },
      });

      const labelElement = screen.queryByTestId('custom-base-level-bar-label');
      if (label) {
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent(label);
      } else {
        expect(labelElement).toBeNull();
      }
    });
  });
});
