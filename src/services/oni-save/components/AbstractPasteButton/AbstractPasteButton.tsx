import * as React from "react";
import { connect } from "react-redux";

import { AbstractPasteButtonProps } from "./props";
import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = AbstractPasteButtonProps & StateProps & DispatchProps;
const AbstractPasteButton: React.SFC<Props> = ({
  availableBehaviors,
  disabled,
  onPaste,
  children
}) => (
  <>
    {React.Children.only(children({ availableBehaviors, disabled, onPaste }))}
  </>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbstractPasteButton);
