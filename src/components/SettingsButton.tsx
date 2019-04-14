import * as React from "react";
import { connect } from "react-redux";

import { push } from "connected-react-router";

import IconButton from "@material-ui/core/IconButton";

import SettingsIcon from "@material-ui/icons/Settings";

const mapDispatchToProps = {
  onClick: () => push("/settings")
};
type DispatchProps = typeof mapDispatchToProps;

type Props = DispatchProps;
const SettingsButton: React.FC<Props> = ({ onClick }) => (
  <IconButton color="inherit" onClick={onClick}>
    <SettingsIcon />
  </IconButton>
);

export default connect(
  null,
  mapDispatchToProps
)(SettingsButton);
