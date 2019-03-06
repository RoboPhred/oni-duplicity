export interface CopyTarget {
  name: string;
  behavior: string;
}

export interface AbstractCopyButtonProps {
  gameObjectId: number;
  targets: CopyTarget[];
  children(props: AbstractCopyButtonRenderProps): React.ReactChild;
  // This is a hack, as the parent must exist during the lifetime of the dialog.
  //  We should instead trigger the dialog and its logic as a top-level component
  //  through redux.
  onComplete?(): void;
}
export interface AbstractCopyButtonRenderProps {
  onClick(): void;
}
