import * as React from "react";

import { autobind } from "core-decorators";

import Keys from "@/keys";

import Text, { TextProps } from "../Text";

import EditableTextInput from "./components/EditableTextInput";

export interface EditableTextProps extends TextProps {
  className?: string;
  value: string;
  minLength?: number;
  maxLength?: number;
  onCommit(value: string): void;
}
type Props = EditableTextProps;
interface State {
  editValue: string | null;
}
export default class EditableText extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      editValue: null
    };
  }

  render() {
    const { className, value, intent } = this.props;
    const { editValue } = this.state;

    if (editValue !== null) {
      return (
        <EditableTextInput
          className={className}
          autoFocus
          intent={intent}
          value={editValue}
          onChange={this._onEditableChange}
          onKeyPress={this._onEditableKeyPress}
          onFocus={this._onEditableFocus}
          onBlur={this._onEditableBlur}
        />
      );
    } else {
      return (
        <Text className={className} intent={intent} onClick={this._onTextClick}>
          {value}
        </Text>
      );
    }
  }

  @autobind()
  private _onTextClick() {
    const { value } = this.props;
    this.setState({
      editValue: value
    });
  }

  @autobind()
  private _onEditableChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      editValue: e.target.value
    });
  }

  @autobind()
  private _onEditableKeyPress(e: React.KeyboardEvent) {
    switch (e.key) {
      case Keys.Enter:
        this._commit();
        break;
      case Keys.Esc:
        this._reset();
        break;
    }
  }

  @autobind()
  private _onEditableFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select();
  }

  @autobind()
  private _onEditableBlur() {
    this._commit();
  }

  private _commit() {
    const { editValue } = this.state;
    const { onCommit } = this.props;

    if (!editValue) {
      return;
    }

    onCommit(editValue);

    this._reset();
  }

  private _reset() {
    this.setState({
      editValue: null
    });
  }
}
