export interface AbstractImportWarningDialogProps {
  children(props: AbstractImportWarningDialogRenderProps): React.ReactChild;
}
export interface AbstractImportWarningDialogRenderProps {
  isOpen: boolean;
  onConfirm(): void;
  onCancel(): void;
}
