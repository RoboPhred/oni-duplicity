import * as React from "react";
import { connect } from "react-redux";
import { BehaviorName, GameObjectBehavior } from "oni-save-parser";

import { attachProps } from "@/utils";

import { AbstractBehaviorEditorProps } from "./props";

import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";
import { BehaviorDataTarget } from "../../actions/modify-behavior";

type Props = AbstractBehaviorEditorProps<any> & StateProps & DispatchProps;
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
    const { children, templateData, extraData } = this.props;
    return React.Children.only(
      children({
        templateData,
        extraData,
        onTemplateDataModify: this._onTemplateDataModify,
        onExtraDataModify: this._onExtraDataModify
      })
    );
  }

  private _onTemplateDataModify = (data: any) => {
    const { gameObjectId, gameObjectBehavior, onModifyBehavior } = this.props;
    onModifyBehavior(
      gameObjectId,
      gameObjectBehavior,
      BehaviorDataTarget.Template,
      data
    );
  };
  private _onExtraDataModify = (data: any) => {
    const { gameObjectId, gameObjectBehavior, onModifyBehavior } = this.props;
    onModifyBehavior(
      gameObjectId,
      gameObjectBehavior,
      BehaviorDataTarget.Extra,
      data
    );
  };
}
const ConnectedAbstractBehaviorEditor = attachProps(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AbstractBehaviorEditor),
  {
    ofType: AbstractBehaviorEditor.ofType
  }
);
export default ConnectedAbstractBehaviorEditor;
