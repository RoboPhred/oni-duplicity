export interface AbstractRawEditorProps {
  path: string[];
  children(props: AbstractRawEditorRenderProps): React.ReactChild;
}
export interface AbstractRawEditorRenderProps {
  value: string | null;
  onChange(value: string): void;
  onApply(): void;
  onReset(): void;
  valid: boolean;
}
