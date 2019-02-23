import * as React from "react";

import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export type CommitTextFieldProps = TextFieldProps & {
  onCommit?(value: string): void;
};

interface State {
  value: string | null;
}
class CommitTextField extends React.Component<CommitTextFieldProps, State> {
  state = {
    value: null
  };

  render() {
    const {
      onCommit,
      onChange,
      onBlur,
      value: prevValue,
      ...props
    } = this.props;
    const { value: editValue } = this.state;
    return (
      <TextField
        {...props}
        value={editValue || prevValue}
        onChange={this._onChange}
        onBlur={this._onBlur}
      />
    );
  }

  private _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }

    this.setState({ value: e.target.value });
  };

  private _onBlur = (e: React.FocusEvent) => {
    const { onBlur, onCommit } = this.props;
    if (onBlur) {
      onBlur(e);
    }

    const { value: prevValue } = this.props;
    const { value } = this.state;
    if (onCommit && value && value !== prevValue) {
      onCommit(value);
    }

    this.setState({
      value: null
    });
  };
}

export default CommitTextField;
