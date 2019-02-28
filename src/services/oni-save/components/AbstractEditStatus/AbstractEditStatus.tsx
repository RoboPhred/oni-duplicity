import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./state-props";

export interface AbstractEditStatusProps {
  children(props: AbstractEditStatusRenderProps): React.ReactChild;
}
export interface AbstractEditStatusRenderProps {
  hasChanges: boolean;
}

type Props = AbstractEditStatusProps & StateProps;
class AbstractEditStatus extends React.Component<Props> {
  render() {
    const { children, hasChanges } = this.props;
    return React.Children.only(children({ hasChanges }));
  }
}

export default connect(mapStateToProps)(AbstractEditStatus);
