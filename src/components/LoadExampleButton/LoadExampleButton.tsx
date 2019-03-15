import * as React from "react";
import { connect } from "react-redux";

import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = DispatchProps;

const LoadExampleButton: React.SFC<Props> = ({ loadExampleSave }) => (
  <button onClick={loadExampleSave}>Load Example</button>
);

export default connect(
  null,
  mapDispatchToProps
)(LoadExampleButton);
