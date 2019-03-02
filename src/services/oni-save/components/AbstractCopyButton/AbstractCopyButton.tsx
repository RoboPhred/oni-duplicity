import * as React from "react";
import { connect } from "react-redux";

import { AbstractCopyButtonProps } from "./props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = AbstractCopyButtonProps & DispatchProps;
const AbstractCopyButton: React.SFC<Props> = ({ onCopy, children }) => (
  <>{React.Children.only(children({ onCopy }))}</>
);

export default connect(
  null,
  mapDispatchToProps
)(AbstractCopyButton);
