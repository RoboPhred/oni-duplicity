export interface ExportTarget {
  name: string;
  behavior: string;
}

export interface AbstractExportButtonProps {
  gameObjectId: number;
  targets: ExportTarget[];
  children(props: AbstractExportButtonRenderProps): React.ReactChild;
  // This is a hack, as the parent must exist during the lifetime of the dialog.
  //  We should instead trigger the dialog and its logic as a top-level component
  //  through redux.
  onComplete?(): void;
}
export interface AbstractExportButtonRenderProps {
  onClick(): void;
}
