import * as React from "react";

import { autobind } from "core-decorators";

import Keys from "@/keys";

import { NumberPrecision, clamp } from "@/math";

import Input from "@/components/Input";

import connectEditorField, {
  EditorFieldProps,
  InjectedProps
} from "./connect-field";

export interface NumericFieldProps extends EditorFieldProps {
  minValue?: number;
  maxValue?: number;
  precision?: NumberPrecision;
}

type Props = NumericFieldProps & InjectedProps;
interface State {
  editValue: string | null;
  isValid: boolean;
}
class NumericField extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editValue: null,
      isValid: true
    };
  }

  render() {
    const { value, minValue, maxValue } = this.props;
    const { editValue } = this.state;

    const currentValue = editValue || value;
    return (
      <Input
        type="number"
        min={minValue}
        max={maxValue}
        value={currentValue !== undefined ? currentValue : null}
        onChange={this._onValueChange}
        onKeyPress={this._onInputKeyPress}
        onBlur={this._onInputBlur}
      />
    );
  }

  @autobind()
  private _onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.valueAsNumber;
    const clampValue = this._clamp(value);
    const isValid = e.target.valueAsNumber === clampValue;
    e.target.setCustomValidity(isValid ? "" : "Value out of range");
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

  private _clamp(value: number): number {
    const { precision = "int32", minValue, maxValue } = this.props;
    value = clamp(precision, value);
    if (maxValue != null) {
      value = Math.min(value, maxValue);
    }
    if (minValue != null) {
      value = Math.max(value, minValue);
    }
    return value;
  }
}
export default connectEditorField()(NumericField);
