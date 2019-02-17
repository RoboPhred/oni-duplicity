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

const AbstractSaveStatus: React.SFC<Props> = ({ children, loadingStatus }) => (
  <>{children({ loadingStatus })}</>
);

export default connect(mapStateToProps)(AbstractSaveStatus);
