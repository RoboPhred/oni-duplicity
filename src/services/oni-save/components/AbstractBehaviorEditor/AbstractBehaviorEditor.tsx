import * as React from "react";
import { connect } from "react-redux";
import { BehaviorName, GameObjectBehavior } from "oni-save-parser";

import { attachProps } from "@/utils";

import { AbstractBehaviorEditorProps } from "./props";

import mapStateToProps, { StateProps } from "./state-props";

type Props = AbstractBehaviorEditorProps<any> & StateProps;
class AbstractBehaviorEditor extends React.Component<Props> {
  static ofType<T extends GameObjectBehavior>(
    behavior: BehaviorName<T>
  ): React.ComponentType<
    Omit<AbstractBehaviorEditorProps<T>, "gameObjectBehavior">
  > {
    return (
      props: Omit<AbstractBehaviorEditorProps<T>, "gameObjectBehavior">
    ) => (
      <ConnectedAbstractBehaviorEditor
        {...props}
        gameObjectBehavior={behavior}
      />
    );
  }

  render() {
    const { children, templateData } = this.props;
    return React.Children.only(children({ templateData }));
  }
}
const ConnectedAbstractBehaviorEditor = attachProps(
  connect(mapStateToProps)(AbstractBehaviorEditor),
  {
    ofType: AbstractBehaviorEditor.ofType
  }
);
export default ConnectedAbstractBehaviorEditor;
