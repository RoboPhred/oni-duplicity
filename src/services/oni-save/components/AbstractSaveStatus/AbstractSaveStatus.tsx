import * as React from "react";
import { connect } from "react-redux";

import { LoadingStatus } from "../../state";

import mapStateToProps, { StateProps } from "./state-props";

export interface AbstractSaveStatusRenderProps {
  loadingStatus: LoadingStatus;
}
export interface AbstractSaveStatusProps {
  children(props: AbstractSaveStatusRenderProps): React.ReactNode;
}

type Props = AbstractSaveStatusProps & StateProps;

class AbstractSaveStatus extends React.Component<Props> {
  render() {
    const { children, loadingStatus } = this.props;
    return React.Children.only(children({ loadingStatus }));
  }
}

export default connect(mapStateToProps)(AbstractSaveStatus);
