import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./state-props";

import NoSave from "./components/NoSave";
import SaveOverview from "./components/SaveOverview";

type Props = StateProps;
const Overview: React.SFC<Props> = ({ saveAvailable }) =>
  saveAvailable ? <SaveOverview /> : <NoSave />;
export default connect(mapStateToProps)(Overview);
