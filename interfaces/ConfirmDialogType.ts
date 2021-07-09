export default interface ConfirmDialogType {
  isOpen: boolean;
  title: string;
  subTitle: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
}
