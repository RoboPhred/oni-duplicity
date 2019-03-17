import * as React from "react";
import { connect } from "react-redux";

import { AbstractPlanetListProps } from "./props";
import mapStateToProps, { StateProps } from "./state-props";

type Props = AbstractPlanetListProps & StateProps;

const AbstractPlanetList: React.SFC<Props> = ({ planets, children }) => (
  <>{children({ planets })}</>
);

export default connect(mapStateToProps)(AbstractPlanetList);
