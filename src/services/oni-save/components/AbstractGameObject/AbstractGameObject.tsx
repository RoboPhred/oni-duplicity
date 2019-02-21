import * as React from "react";
import { connect } from "react-redux";

import { AbstractGameObjectProps } from "./props";
import mapStateToProps, { StateProps } from "./state-props";

type Props = AbstractGameObjectProps & StateProps;
class AbstractGameObject extends React.Component<Props> {
  render() {
    const { children, gameObjectType } = this.props;
    return React.Children.only(children({ gameObjectType }));
  }
}
export default connect(mapStateToProps)(AbstractGameObject);
