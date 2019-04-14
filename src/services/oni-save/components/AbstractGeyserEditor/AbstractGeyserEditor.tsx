import * as React from "react";
import { connect } from "react-redux";

import { AbstractGeyserEditorProps } from "./props";
import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

type Props = AbstractGeyserEditorProps & StateProps & DispatchProps;

const AbstractGeyserEditor: React.FC<Props> = ({
  emitRate,
  geyserType,
  onChangeEmitRate,
  onChangeGeyserType,
  children
}) => (
  <>
    {React.Children.only(
      children({ emitRate, geyserType, onChangeEmitRate, onChangeGeyserType })
    )}
  </>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbstractGeyserEditor);
