import * as React from "react";

import { autobind } from "core-decorators";

import Keycodes from "@/keycodes";

import { Intent } from "@/theme";

import Text from "@/components/Text";

export interface EditableTextProps {
  intent?: Intent;
  value: string;
  onChange(value: string): void;
}
interface State {
  isEditing: boolean;
  editValue: string | null;
}
type Props = EditableTextProps;
export default class EditableText extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isEditing: false,
      editValue: null
    };
  }
  render() {
    const { intent, value } = this.props;
    const { isEditing, editValue } = this.state;
    if (isEditing) {
      return (
        <input
          autoFocus
          type="text"
          onChange={this._onInputChange}
          onKeyPress={this._onInputKeyPress}
          onBlur={this._onInputBlur}
          value={editValue || ""}
        />
      );
    } else {
      return (
        <Text intent={intent} onClick={this._onTextClick}>
          {value}
        </Text>
      );
    }
  }

  @autobind()
  private _onTextClick() {
    const { value } = this.props;
    this.setState({
      isEditing: true,
      editValue: value
    });
  }

  @autobind()
  private _onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      editValue: e.target.value
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
    const { editValue } = this.state;
    const { onChange } = this.props;

    onChange(editValue || "");

    this.setState({
      isEditing: false,
      editValue: null
    });
  }
}
