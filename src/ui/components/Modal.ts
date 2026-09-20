import { ModalConfig } from '../../types';

export class Modal {
  private config: ModalConfig;
  private overlay: HTMLDivElement | null = null;

  constructor(config: ModalConfig) {
    this.config = config;
  }

  public show(): void {
    this.remove();

    const root = document.getElementById('app');
    if (!root) {
      return;
    }

    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4';

    const dialog = document.createElement('div');
    dialog.className = 'relative w-full rounded-md border border-gray-200 bg-white p-6 shadow-xl';
    const widthClass =
      this.config.size === 'lg' ? 'max-w-lg' : this.config.size === 'sm' ? 'max-w-sm' : 'max-w-md';
    dialog.className += ` ${widthClass}`;

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className =
      'absolute right-4 top-4 text-2xl leading-none text-gray-400 hover:text-gray-600';
    closeButton.textContent = '×';
    closeButton.setAttribute('aria-label', 'Close');
    closeButton.addEventListener('click', () => this.close());

    const title = document.createElement('h2');
    title.className = 'mb-4 pr-8 text-lg font-semibold text-gray-900';
    title.textContent = this.config.title;

    const content = document.createElement('div');
    content.className = 'text-gray-900';
    content.innerHTML = this.config.content;

    const actions = document.createElement('div');
    actions.className = 'mt-6 flex justify-end gap-3';

    this.config.actions.forEach((action) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = action.label;
      button.className =
        action.variant === 'primary'
          ? 'rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
          : 'rounded bg-slate-600 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700';
      button.addEventListener('click', () => {
        action.onClick();
        this.close();
      });
      actions.appendChild(button);
    });

    dialog.appendChild(closeButton);
    if (this.config.title) {
      dialog.appendChild(title);
    }
    dialog.appendChild(content);
    dialog.appendChild(actions);

    overlay.appendChild(dialog);
    root.appendChild(overlay);
    this.overlay = overlay;
  }

  public close(): void {
    this.remove();
    if (this.config.onClose) {
      this.config.onClose();
    }
  }

  private remove(): void {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }
}
