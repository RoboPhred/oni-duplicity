import * as React from "react";
import { autobind } from "core-decorators";

import Flex from "@/components/Flex";
import CheckInput from "@/components/CheckInput";

export interface InputCompatibleProps<T = any> {
  value: T;
  onCommit(value: any): void;
}
export interface NullableInputProps<T = any> {
  className?: string;
  renderInput(props: InputCompatibleProps<T>): React.ReactNode;
  value: T | null;
  defaultValue: T | (() => T);
  onCommit(value: T | null): void;
}
type Props = NullableInputProps;
interface State {
  isNotNull: boolean;
}
export default class NullableInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isNotNull: this.props.value !== null
    };
  }

  componentWillReceiveProps(props: Props) {
    let isNotNull = props.value !== null;
    if (isNotNull !== this.state.isNotNull) {
      this.setState({
        isNotNull
      });
    }
  }

  render() {
    const { isNotNull } = this.state;
    const { className } = this.props;

    let element: React.ReactNode | null = null;
    if (isNotNull) {
      const { renderInput, onCommit, defaultValue } = this.props;
      const value = this.props.value || resolveDefault(defaultValue);
      element = renderInput({ value, onCommit });
    }

    return (
      <Flex className={className} direction="row">
        <CheckInput value={isNotNull} onCommit={this._onNotNullChecked} />
        {element && (
          <Flex.Item grow shrink>
            {element}
          </Flex.Item>
        )}
      </Flex>
    );
  }

  @autobind()
  private _onNotNullChecked(value: boolean) {
    this.setState({
      isNotNull: value
    });
  }
}

function resolveDefault<T>(value: T | (() => T)): T {
  if (typeof value === "function") {
    return value();
  }
  return value;
}
