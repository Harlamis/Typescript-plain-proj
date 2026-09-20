import { Modal } from '../ui/components/Modal';

export class NotificationService {
  static showBorrowPrompt(
    bookTitle: string,
    onConfirm: (userId: string) => void,
    onCancel: () => void,
  ): void {
    const modal = new Modal({
      title: 'Введіть ID користувача для позичення книги:',
      size: 'md',
      onClose: onCancel,
      content: `
        <div class="space-y-4">
          <div class="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
            ${bookTitle}
          </div>
          <label class="block">
            <span class="sr-only">ID</span>
            <input
              type="text"
              id="borrow-user-id"
              class="w-full rounded border border-gray-300 px-3 py-2 text-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="ID"
              inputmode="numeric"
            />
          </label>
        </div>
      `,
      actions: [
        {
          label: 'Скасувати',
          variant: 'secondary',
          onClick: onCancel,
        },
        {
          label: 'Зберегти',
          variant: 'primary',
          onClick: () => {
            const input = document.getElementById('borrow-user-id') as HTMLInputElement | null;
            const value = input?.value.trim() ?? '';
            if (value) {
              onConfirm(value);
            }
          },
        },
      ],
    });

    modal.show();
  }

  static showInfo(message: string, buttonText: string, onClose?: () => void): void {
    const modal = new Modal({
      title: '',
      size: 'md',
      onClose: onClose ?? (() => undefined),
      content: `<p class="text-xl leading-relaxed text-gray-900">${message}</p>`,
      actions: [
        {
          label: buttonText,
          variant: 'primary',
          onClick: onClose ?? (() => undefined),
        },
      ],
    });

    modal.show();
  }
}
