import * as React from "react";

import { autobind } from "core-decorators";

import styled from "@/theme";

import { InputStyleProps, inputStyle } from "@/components/Input";

const SelectElement = styled<InputStyleProps, "select">("select")`
  ${inputStyle};
`;

export interface Option<T extends string | number = string | number> {
  label?: string;
  value: T;
}
export interface SelectProps<T extends string | number = string | number>
  extends InputStyleProps {
  options: Option<T>[];
  value: T;
  onChange(value: T): void;
}

export default class Select extends React.Component<SelectProps> {
  render() {
    const { options, value, children, onChange, ...rest } = this.props;
    return (
      <SelectElement {...rest} value={value} onChange={this._onChange}>
        {options.map(x => (
          <option key={x.value} value={x.value}>
            {x.label}
          </option>
        ))}
      </SelectElement>
    );
  }

  @autobind()
  private _onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { onChange } = this.props;
    const value = e.target.value;
    onChange(value);
  }
}
