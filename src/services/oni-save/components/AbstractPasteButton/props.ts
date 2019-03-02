export interface AbstractPasteButtonProps {
  gameObjectId: number;
  children(props: AbstractPasteButtonRenderProps): React.ReactChild;
}
export interface AbstractPasteButtonRenderProps {
  disabled: boolean;
  availableBehaviors: string[];
  onPaste(behaviors: string[]): void;
}
