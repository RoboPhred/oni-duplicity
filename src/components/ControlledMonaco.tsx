import React from "react";
import MonacoEditor from "react-monaco-editor";

export default class ControlledMonaco extends React.Component<
  PropsOfComponent<MonacoEditor>
> {
  private _editor: any = null;
  private _monaco: any = null;

  componentDidUpdate() {
    this._updateEditor();
  }

  render() {
    const { onChange, editorDidMount, ...props } = this.props;
    return (
      <MonacoEditor
        {...props}
        editorDidMount={this._editorDidMount}
        onChange={(value, e) => {
          if (onChange) {
            onChange(value, e);
          }
          this._updateEditor();
        }}
      />
    );
  }

  private _editorDidMount = (editor: any, monaco: any) => {
    this._editor = editor;
    this._monaco = monaco;
    this._updateEditor();
    if (this.props.editorDidMount) {
      this.props.editorDidMount(editor, monaco);
    }
  };

  private _updateEditor = () => {
    if (this.props.value !== this._editor.getValue()) {
      this._editor.setValue(this.props.value);
    }
  };
}
