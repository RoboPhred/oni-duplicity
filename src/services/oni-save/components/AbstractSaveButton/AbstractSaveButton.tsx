import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

export interface AbstractSaveButtonProps {
  children(props: AbstractSaveButtonRenderProps): React.ReactChild;
}
export interface AbstractSaveButtonRenderProps {
  disabled: boolean;
  onClick(): void;
}

type Props = AbstractSaveButtonProps & StateProps & DispatchProps;

class AbstractSaveButton extends React.Component<Props> {
  render() {
    const { children, disabled, saveOniSave } = this.props;
    return React.Children.only(
      children({ disabled, onClick: () => saveOniSave() })
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbstractSaveButton);
