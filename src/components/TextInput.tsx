import * as React from "react";

import { autobind } from "core-decorators";

import Keys from "@/keys";

import Input from "@/components/Input";

export interface TextInputProps {
  value: string;
  minLength?: number;
  maxLength?: number;
  onCommit(value: string): void;
}

type Props = TextInputProps;
interface State {
  editValue: string | null;
  isValid: boolean;
}
export default class TextInput extends React.Component<Props, State> {
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

    const currentValue = editValue != null ? editValue : value;

    return (
      <Input
        type="text"
        minLength={minLength}
        maxLength={maxLength}
        value={currentValue}
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
    if (e.key === Keys.Enter) {
      this._commitEdit();
    }
  }

  @autobind()
  private _onInputBlur() {
    this._commitEdit();
  }

  private _commitEdit() {
    const { editValue, isValid } = this.state;
    const { onCommit } = this.props;

    this.setState({
      editValue: null
    });

    if (!editValue || !isValid) {
      return;
    }

    onCommit(editValue);
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
