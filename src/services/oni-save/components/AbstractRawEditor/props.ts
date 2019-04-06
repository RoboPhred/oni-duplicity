export interface AbstractRawEditorProps {
  path: string[];
  children(props: AbstractRawEditorRenderProps): React.ReactChild;
}
export interface AbstractRawEditorRenderProps {
  value: string;
  onChange(value: string): void;
  valid: boolean;
}
