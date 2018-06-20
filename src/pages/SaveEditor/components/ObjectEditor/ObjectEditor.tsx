import * as React from "react";

import { autobind } from "core-decorators";
import { isObject } from "lodash-es";

export interface ObjectEditorProps {
  path: string[];
  obj: any;
}

type Props = ObjectEditorProps;
export default class ObjectEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { path, obj } = this.props;
    const primitiveKeys = Object.keys(obj).filter(key => !isObject(obj[key]));

    const fields = primitiveKeys.map(key => this._renderField(key));

    return (
      <div>
        <h3>{path.join(".")}</h3>
        {fields}
      </div>
    );
  }

  private _renderField(key: string) {
    const { obj } = this.props;
    return (
      <div key={key}>
        <span>{key}</span>
        <ObjectEditorField
          propKey={key}
          value={obj[key]}
          onChange={this._onFieldChange}
        />
      </div>
    );
  }

  @autobind()
  private _onFieldChange(key: string, value: any) {
    const { obj } = this.props;
    obj[key] = value;
    this.forceUpdate();
  }
}

interface ObjectEditorFieldProps {
  propKey: string;
  value: any;
  onChange(propKey: string, value: any): void;
}
class ObjectEditorField extends React.Component<ObjectEditorFieldProps> {
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
