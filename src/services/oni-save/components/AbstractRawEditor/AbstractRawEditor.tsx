import * as React from "react";
import { connect } from "react-redux";

import { AbstractRawEditorProps } from "./props";

import mapStateToProps, { StateProps } from "./state-props";

type Props = AbstractRawEditorProps & StateProps;
interface State {
  transientValue: string | null;
  valid: boolean;
}
class AbstractRawEditor extends React.Component<Props, State> {
  state = {
    transientValue: null,
    valid: true
  };

  render() {
    const { value, children } = this.props;
    const { transientValue, valid } = this.state;
    let isTooComplex = objectDepth(value, 5) >= 5;
    const strValue = isTooComplex
      ? "< Object is too complex.  Choose a deeper path >"
      : JSON.stringify(value, null, 2);
    return children({
      value: transientValue || strValue,
      onChange: this._onChange,
      valid: valid || isTooComplex
    });
  }

  private _onChange = (value: string) => {
    const { value: objValue } = this.props;
    let isTooComplex = objectDepth(objValue, 5) >= 5;
    if (isTooComplex) {
      return;
    }

    try {
      const parsed = JSON.parse(value);
      this.setState({
        valid: true,
        transientValue: null
      });
      // TODO: Set value
    } catch {
      this.setState({
        transientValue: value,
        valid: false
      });
    }
  };
}

export default connect(mapStateToProps)(AbstractRawEditor);

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
