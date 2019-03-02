export interface AbstractCopyButtonProps {
  gameObjectId: number;
  children(props: AbstractCopyButtonRenderProps): React.ReactChild;
}
export interface AbstractCopyButtonRenderProps {
  onCopy(behaviors: string[]): void;
}
