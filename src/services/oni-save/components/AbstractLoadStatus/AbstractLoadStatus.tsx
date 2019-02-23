import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./state-props";

export interface AbstractLoadStatusProps {
  children(props: AbstractLoadStatusRenderProps): React.ReactChild;
}
export interface AbstractLoadStatusRenderProps {
  isLoading: boolean;
  message: string | null;
}

type Props = AbstractLoadStatusProps & StateProps;
class AbstractLoadStatus extends React.Component<Props> {
  render() {
    const { children, isLoading, message } = this.props;
    return React.Children.only(children({ isLoading, message }));
  }
}

export default connect(mapStateToProps)(AbstractLoadStatus);
