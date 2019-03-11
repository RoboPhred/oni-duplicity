import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

export * from "./props";
export type WithMaterialList = StateProps & DispatchProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
);
