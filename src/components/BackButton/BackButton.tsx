import * as React from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

export interface BackButtonProps {
  className?: string;
}

type Props = BackButtonProps & DispatchProps;

const BackButton: React.SFC<Props> = ({ className, goBack }) => (
  <IconButton
    className={className}
    color="inherit"
    aria-label="Back"
    onClick={goBack}
  >
    <ArrowBackIcon />
  </IconButton>
);

export default connect(
  null,
  mapDispatchToProps
)(BackButton);
