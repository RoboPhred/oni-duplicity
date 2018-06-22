import * as React from "React";

import { autobind } from "core-decorators";

export interface EditorFieldProps {
  propKey: string;
  value: any;
  onChange(propKey: string, value: any): void;
}
export default class EditorField extends React.Component<EditorFieldProps> {
  render() {
    const { value } = this.props;
    return (
      <input
        type="text"
        onChange={this._onChange}
        value={JSON.stringify(value)}
      />
    );
  }

  @autobind()
  private _onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { propKey, onChange } = this.props;
    const value = e.target.value;
    try {
      const parsedValue = JSON.parse(value);
      onChange(propKey, parsedValue);
    } catch {}
  }
}
