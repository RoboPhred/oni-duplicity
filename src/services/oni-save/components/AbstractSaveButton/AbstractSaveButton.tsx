import * as React from "react";
import { connect } from "react-redux";

import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

export interface AbstractSaveButtonProps {
  children(props: AbstractSaveButtonRenderProps): React.ReactChild;
}
export interface AbstractSaveButtonRenderProps {
  onClick(): void;
}

type Props = AbstractSaveButtonProps & DispatchProps;

class AbstractSaveButton extends React.Component<Props> {
  render() {
    const { children, saveOniSave } = this.props;
    return React.Children.only(children({ onClick: () => saveOniSave() }));
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AbstractSaveButton);
