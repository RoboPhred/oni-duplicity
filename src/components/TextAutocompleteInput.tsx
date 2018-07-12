import * as React from "react";

import { autobind } from "core-decorators";

import Autocomplete from "@/components/Autocomplete";

export interface TextAutocompleteInputProps {
  value: string;
  minLength?: number;
  maxLength?: number;
  items: string[];
  onCommit(value: string): void;
}

type Props = TextAutocompleteInputProps;
interface State {
  editValue: string | null;
  isValid: boolean;
}
export default class TextAutocompleteInput extends React.Component<
  Props,
  State
> {
  private _inputRef = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      editValue: null,
      isValid: true
    };
  }

  render() {
    const { value, minLength, maxLength, items } = this.props;
    const { editValue } = this.state;

    const currentValue = editValue != null ? editValue : value;

    return (
      <Autocomplete
        value={currentValue}
        items={items}
        minLength={minLength}
        maxLength={maxLength}
        getItemValue={x => x}
        onChange={this._onValueChange}
        onSelect={this._onValueSelect}
        selectOnBlur
      />
    );
  }

  @autobind()
  private _onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    this._setEditValue(value);
  }

  @autobind()
  private _onValueSelect(value: string) {
    this._setEditValue(value);
    this._commitEdit();
  }

  // @autobind()
  // private _onInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === Keys.Enter) {
  //     this._commitEdit();
  //   }
  // }

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
