import * as React from "react";
import { connect } from "react-redux";

import { MaterialListProps } from "./props";
import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = MaterialListProps & StateProps & DispatchProps;

const AbstractMaterialList: React.SFC<Props> = ({
  materials,
  onDeleteLooseMaterial,
  children
}) => (
  <>{React.Children.only(children({ materials, onDeleteLooseMaterial }))}</>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbstractMaterialList);
