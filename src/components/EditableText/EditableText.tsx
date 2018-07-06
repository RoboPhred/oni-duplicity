import * as React from "react";

import Text, { TextProps } from "../Text";

import EditableTextInput from "./components/EditableTextInput";
import { autobind } from "core-decorators";

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
export class EditableText extends React.Component<Props, State> {
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
          intent={intent}
          value={editValue}
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
}
