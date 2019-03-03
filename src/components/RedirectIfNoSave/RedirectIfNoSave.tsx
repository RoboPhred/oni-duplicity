import * as React from "react";
import { connect } from "react-redux";

import { Redirect } from "react-router-dom";

import mapStateToProps, { StateProps } from "./state-props";

type Props = StateProps;

const RedirectIfNoSave: React.SFC<Props> = ({ noSave }) => (
  <React.Fragment>{noSave && <Redirect to="/" />}</React.Fragment>
);

export default connect(mapStateToProps)(RedirectIfNoSave);
