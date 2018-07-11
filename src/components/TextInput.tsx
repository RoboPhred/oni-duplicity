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
  private _inputRef = React.createRef<HTMLInputElement>();

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
        innerRef={this._inputRef}
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
    this._setEditValue(value);
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

  private _setEditValue(value: string) {
    const validation = this._validate(value);
    const isValid = !validation;

    if (this._inputRef.current) {
      this._inputRef.current.setCustomValidity(validation || "");
    }

    this.setState({
      editValue: value,
      isValid
    });
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
