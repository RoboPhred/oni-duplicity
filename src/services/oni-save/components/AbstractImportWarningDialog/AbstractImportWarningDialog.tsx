import * as React from "react";
import { connect } from "react-redux";

import { AbstractImportWarningDialogProps } from "./props";

import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = AbstractImportWarningDialogProps & StateProps & DispatchProps;

const AbstractImportWarningDialog: React.SFC<Props> = ({
  isOpen,
  onConfirm,
  onCancel,
  children
}) => <>{React.Children.only(children({ isOpen, onConfirm, onCancel }))}</>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbstractImportWarningDialog);
