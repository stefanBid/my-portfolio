import { render, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { BaseDialog } from '@/components';

describe('BaseDialog.vue', () => {
  const onCloseModal = vi.fn();

  afterEach(() => {
    onCloseModal.mockReset();
  });

  describe('Basic rendering and behavior', () => {
    it('renders the dialog with title when isOpen is true', async () => {
      const { findByTestId } = render(BaseDialog, {
        props: { isOpen: true, dialogTitle: 'Test Dialog', onCloseModal },
      });

      const dialogPanel = await findByTestId('base-dialog');
      expect(dialogPanel).toBeVisible();
      expect(dialogPanel).toHaveTextContent('Test Dialog');

      const title = dialogPanel.querySelector('#modal-title');
      expect(title).toHaveTextContent('Test Dialog');
      expect(title).toHaveClass('font-medium', 'text-white');
    });

    it('closes the dialog on close button click', async () => {
      const { findByTestId } = render(BaseDialog, {
        props: { isOpen: true, onCloseModal },
      });

      const closeButton = await findByTestId('base-button');
      await fireEvent.click(closeButton);

      expect(onCloseModal).toHaveBeenCalledWith(false);
    });
  });

  describe('Dialog size and header orientation', () => {
    it.each([
      ['small', 'w-[45%]'],
      ['medium', 'w-[65%]'],
      ['large', 'w-[85%]'],
    ])('applies correct width class for dialogSize "%s"', async (size, expectedClass) => {
      const { findByTestId } = render(BaseDialog, {
        props: { isOpen: true, dialogSize: size as 'small' | 'medium' | 'large', onCloseModal },
      });

      const dialogPanel = await findByTestId('base-dialog');
      expect(dialogPanel).toHaveClass(expectedClass);
    });

    it.each([
      ['left', 'text-left'],
      ['center', 'text-center'],
      ['right', 'text-right'],
    ])('applies correct class for headerOrientation "%s"', async (orientation, expectedClass) => {
      const { findByTestId } = render(BaseDialog, {
        props: {
          isOpen: true,
          dialogTitle: 'Header Test',
          headerOrientation: orientation as 'left' | 'center' | 'right',
          onCloseModal,
        },
      });

      const header = (await findByTestId('base-dialog')).querySelector('#modal-header div');
      expect(header).toHaveClass(expectedClass);
    });
  });

  describe('Dialog height behavior', () => {
    it('applies "h-full" class when blockDialogHeight is true', async () => {
      const { findByTestId } = render(BaseDialog, {
        props: { isOpen: true, blockDialogHeight: true, onCloseModal },
      });

      const dialogPanel = await findByTestId('base-dialog');
      expect(dialogPanel).toHaveClass('h-full');
    });

    it('applies "h-fit max-h-full" classes when blockDialogHeight is false', async () => {
      const { findByTestId } = render(BaseDialog, {
        props: { isOpen: true, blockDialogHeight: false, onCloseModal },
      });

      const dialogPanel = await findByTestId('base-dialog');
      expect(dialogPanel).toHaveClass('h-fit', 'max-h-full');
    });
  });
});
