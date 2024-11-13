import { render, screen, fireEvent } from '@testing-library/vue';
import { describe, it, expect, vi } from 'vitest';
import { BaseDialog } from '@/components';

describe('BaseDialog Unit Tests', () => {
  const onCloseModalMock = vi.fn((_: boolean) => {});
  describe('Props', () => {
    it.each(['small', 'medium', 'large'])('set the correct dialog size "%s"', async (size) => {
      render(BaseDialog, {
        props: {
          isOpen: true,
          dataTestid: 'custom-base-dialog',
          dialogSize: size as 'small' | 'medium' | 'large',
          onCloseModal: onCloseModalMock,
        },
      });
      const dialog = await screen.findByTestId('custom-base-dialog-panel');
      expect(dialog).toBeInTheDocument();
      if (size === 'small') expect(dialog).toHaveClass('w-[45%]');
      if (size === 'medium') expect(dialog).toHaveClass('w-[65%]');
      if (size === 'large') expect(dialog).toHaveClass('w-[85%]');
    });

    it.each([true, false])(
      'set the correct dialog height when is height block state is "%s"',
      async (state) => {
        render(BaseDialog, {
          props: {
            isOpen: true,
            dataTestid: 'custom-base-dialog',
            dialogSize: 'large',
            blockDialogHeight: state,
            onCloseModal: onCloseModalMock,
          },
        });
        const dialog = await screen.findByTestId('custom-base-dialog-panel');
        expect(dialog).toBeInTheDocument();
        if (state) expect(dialog).toHaveClass('h-full');
        if (!state) expect(dialog).toHaveClass('h-fit max-h-full');
      },
    );

    it('set the correct dialog title', async () => {
      render(BaseDialog, {
        props: {
          isOpen: true,
          dataTestid: 'custom-base-dialog',
          dialogTitle: 'test-dialog-title',
          onCloseModal: onCloseModalMock,
        },
      });
      const dialog = await screen.findByTestId('custom-base-dialog-panel');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveTextContent('test-dialog-title');
    });

    it.each(['left', 'center', 'right'])(
      'set the correct header orientation "%s"',
      async (orientation) => {
        render(BaseDialog, {
          props: {
            isOpen: true,
            dataTestid: 'custom-base-dialog',
            headerOrientation: orientation as 'left' | 'center' | 'right',
            onCloseModal: onCloseModalMock,
          },
        });
        const dialogHeader = await screen.findByTestId('custom-base-dialog-header-title');
        expect(dialogHeader).toBeInTheDocument();
        if (orientation === 'left') expect(dialogHeader).toHaveClass('text-left');
        if (orientation === 'center') expect(dialogHeader).toHaveClass('text-center');
        if (orientation === 'right') expect(dialogHeader).toHaveClass('text-right');
      },
    );
  });
  describe('Open and Close State', () => {
    it.each([true, false])('check if the dialog is open when isOpen is "%s"', async (state) => {
      render(BaseDialog, {
        props: {
          isOpen: state,
          dataTestid: 'custom-base-dialog',
          onCloseModal: onCloseModalMock,
        },
      });

      if (state) {
        expect(await screen.findByTestId('custom-base-dialog-panel')).toBeInTheDocument();
      } else {
        expect(screen.queryByTestId('custom-base-dialog-panel')).toBeNull();
      }
    });

    it('check if onCloseModal is called correctly when the close button is clicked', async () => {
      render(BaseDialog, {
        props: {
          isOpen: true,
          dataTestid: 'custom-base-dialog',
          onCloseModal: onCloseModalMock,
        },
      });
      const closeButton = await screen.findByTestId('custom-base-dialog-close-button');
      await fireEvent.click(closeButton);
      expect(onCloseModalMock).toHaveBeenCalled();
      expect(onCloseModalMock).toHaveBeenCalledWith(false);
    });

    it('check if onCloseModal is called correctly when the escape key is pressed', async () => {
      render(BaseDialog, {
        props: {
          isOpen: true,
          dataTestid: 'custom-base-dialog',
          onCloseModal: onCloseModalMock,
        },
      });
      await fireEvent.keyDown(document, { key: 'Escape' });
      expect(onCloseModalMock).toHaveBeenCalled();
      expect(onCloseModalMock).toHaveBeenCalledWith(false);
    });
  });
});
