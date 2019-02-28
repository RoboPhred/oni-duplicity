import * as React from "react";
import { connect } from "react-redux";

import { AbstractGameObjectListProps } from "./props";
import mapStateToProps, { StateProps } from "./state-props";

type Props = AbstractGameObjectListProps & StateProps;
class AbstractGameObjectList extends React.Component<Props> {
  render() {
    const { gameObjectIds, children } = this.props;
    return React.Children.only(children({ gameObjectIds }));
  }
}
export default connect(mapStateToProps)(AbstractGameObjectList);
