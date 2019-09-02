import * as React from "react";
import { connect } from "react-redux";

import { AbstractRawEditorProps } from "./props";

import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = AbstractRawEditorProps & StateProps & DispatchProps;
interface State {
  transientValue: string | null;
  valid: boolean;
}
class AbstractRawEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      transientValue: null,
      valid: true
    };
  }

  render() {
    const { value, children } = this.props;
    const { transientValue, valid } = this.state;
    let strValue: string | null;
    if (!value) {
      strValue = null;
    } else if (objectDepth(value, 5) >= 5) {
      strValue = null;
    } else {
      strValue = transientValue || JSON.stringify(value, null, 2);
    }
    return children({
      value: strValue,
      valid: valid,
      hasChanges: transientValue !== null,
      onChange: this._onChange,
      onApply: this._onApply,
      onReset: this._onReset
    });
  }

  private _onChange = (value: string) => {
    let isValid = true;
    try {
      JSON.parse(value);
    } catch {
      isValid = false;
    }

    this.setState({
      transientValue: value,
      valid: isValid
    });
  };

  private _onApply = () => {
    const { path, value: objValue, onModifySave } = this.props;
    const { transientValue } = this.state;
    if (!transientValue) {
      return;
    }

    try {
      const parsed = JSON.parse(transientValue);
      this.setState({
        valid: true,
        transientValue: null
      });
      onModifySave(path, parsed);
    } catch {
      this.setState({
        valid: false
      });
    }
  };

  private _onReset = () => {
    this.setState({
      transientValue: null
    });
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbstractRawEditor);

function objectDepth(obj: any, limit: number) {
  if (!obj || typeof obj !== "object") {
    return 0;
  }

  let depth = 0;
  for (const key of Object.keys(obj)) {
    const keyDepth = objectDepth(obj[key], limit) + 1;
    depth = Math.max(depth, keyDepth);
    if (depth >= limit) {
      break;
    }
  }
  return depth;
}
