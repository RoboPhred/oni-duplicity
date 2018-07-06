import * as React from "react";

import { autobind } from "core-decorators";

import Keycodes from "@/keycodes";

import Input from "@/components/Input";

import connectEditorField, {
  EditorFieldProps,
  InjectedProps
} from "./connect-field";

export interface TextFieldProps extends EditorFieldProps {
  minLength?: number;
  maxLength?: number;
}

type Props = TextFieldProps & InjectedProps;
interface State {
  editValue: string | null;
  isValid: boolean;
}
class TextField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editValue: null,
      isValid: true
    };
  }

  render() {
    const { value, minLength, maxLength } = this.props;
    const { editValue } = this.state;

    const currentValue = editValue || value;
    return (
      <Input
        type="text"
        minLength={minLength}
        maxLength={maxLength}
        value={currentValue !== undefined ? currentValue : null}
        onChange={this._onValueChange}
        onKeyPress={this._onInputKeyPress}
        onBlur={this._onInputBlur}
      />
    );
  }

  @autobind()
  private _onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const validation = this._validate(value);
    const isValid = !validation;
    e.target.setCustomValidity(validation || "");
    this.setState({
      editValue: e.target.value,
      isValid
    });
  }

  @autobind()
  private _onInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.charCode === Keycodes.Enter) {
      this._commitEdit();
    }
  }

  @autobind()
  private _onInputBlur() {
    this._commitEdit();
  }

  private _commitEdit() {
    const { editValue, isValid } = this.state;
    const { onChange } = this.props;

    this.setState({
      editValue: null
    });

    if (!editValue || !isValid) {
      return;
    }

    onChange(editValue);
  }

  private _validate(value: string): string | null {
    const { minLength, maxLength } = this.props;
    if (minLength != null && (!value || value.length < minLength)) {
      return `Value must be at least ${minLength} characters.`;
    }

    if (maxLength != null && value.length > maxLength) {
      return `Value must be less than ${maxLength} characters.`;
    }

    return null;
  }
}
export default connectEditorField()(TextField);
