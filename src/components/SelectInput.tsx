import * as React from "react";

import Select, { SelectProps, Option } from "@/components/Select";

export type SelectInputProps = Omit<
  SelectProps,
  "value" | "options" | "onChange"
> & {
  value: any;
  options: Option<any>[];
  onCommit(value: any): void;
};

type Props = SelectInputProps;
export default class SelectInput extends React.Component<Props> {
  static defaultProps = {
    clearable: false
  };

  render() {
    const { value, options, onCommit, ...props } = this.props;

    return (
      <Select {...props} value={value} options={options} onChange={onCommit} />
    );
  }
}
