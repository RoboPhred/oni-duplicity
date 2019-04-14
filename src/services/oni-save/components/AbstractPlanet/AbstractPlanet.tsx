import * as React from "react";
import { connect } from "react-redux";

import { AbstractPlanetProps } from "./props";
import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = AbstractPlanetProps & StateProps & DispatchProps;

const AbstractPlanet: React.FC<Props> = ({
  planet,
  onPlanetModify,
  children
}) => <>{children({ planet, onPlanetModify })}</>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbstractPlanet);
