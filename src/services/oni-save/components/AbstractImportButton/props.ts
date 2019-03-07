export interface AbstractImportButtonProps {
  gameObjectId: number;
  children(props: AbstractImportButtonRenderProps): React.ReactChild;
  // Hack to keep element alive while processing import.
  onComplete(): void;
}
export interface AbstractImportButtonRenderProps {
  onClick(): void;
}
