import * as React from "react";

import { autobind } from "core-decorators";

import connectEditorField, {
  EditorFieldProps,
  InjectedProps
} from "./connect-field";

import Input from "../../../../components/Input";

export interface BooleanFieldProps extends EditorFieldProps {}

type Props = BooleanFieldProps & InjectedProps;
class BooleanField extends React.Component<Props> {
  render() {
    const { value } = this.props;
    return (
      <Input type="checkbox" value={value} onChange={this._onValueChange} />
    );
  }

  @autobind()
  private _onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.checked;
    const { onChange } = this.props;
    onChange(value);
  }
}
export default connectEditorField()(BooleanField);
