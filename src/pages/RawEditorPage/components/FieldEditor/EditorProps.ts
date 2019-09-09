export interface EditorProps {
  path: string[];
}

export interface UnconnectedEditorProps extends EditorProps {
  value: any;
  onValueChanged(value: any): void;
}
