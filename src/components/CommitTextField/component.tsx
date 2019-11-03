import * as React from "react";

import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export type CommitTextFieldProps = TextFieldProps & {
  onCommit?(value: string): void;
};

interface State {
  value: string | null;
}
class CommitTextField extends React.Component<CommitTextFieldProps, State> {
  constructor(props: CommitTextFieldProps) {
    super(props);

    this.state = {
      value: null
    };
  }

  render() {
    const {
      onCommit,
      onChange,
      onBlur,
      onKeyPress,
      value: prevValue,
      ...props
    } = this.props;
    const { value: editValue } = this.state;
    const displayValue = (editValue == null) ? prevValue : editValue;
    return (
      <TextField
        {...props}
        value={displayValue}
        onChange={this._onChange}
        onBlur={this._onBlur}
        onKeyPress={this._onKeyPress}
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

  private _onKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { onKeyPress } = this.props;
    if (onKeyPress) {
      onKeyPress(e);
    }

    if (e.key === "Enter") {
      this._commit();
    }
  };

  private _onBlur = (e: React.FocusEvent) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(e);
    }

    this._commit();
  };

  private _commit() {
    const { value: prevValue, onCommit } = this.props;
    const { value } = this.state;
    if (onCommit && value && value !== prevValue) {
      onCommit(value);
    }

    this.setState({
      value: null
    });
  }
}

export default CommitTextField;
