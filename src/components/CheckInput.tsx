import * as React from "react";

import { autobind } from "core-decorators";

import Input from "@/components/Input";

export interface CheckInputProps {
  value: boolean;
  onCommit(value: boolean): void;
}

type Props = CheckInputProps;
export default class CheckInput extends React.Component<Props> {
  render() {
    const { value } = this.props;
    return (
      <Input type="checkbox" checked={value} onChange={this._onValueChange} />
    );
  }

  @autobind()
  private _onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { onCommit } = this.props;
    const value = e.target.checked;
    onCommit(value);
  }
}
