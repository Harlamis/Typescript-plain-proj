export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalAction {
  label: string;
  variant: 'primary' | 'secondary';
  onClick: () => void;
}

export interface ModalConfig {
  title: string;
  content: string;
  actions: ModalAction[];
  size?: ModalSize;
  onClose?: () => void;
}
