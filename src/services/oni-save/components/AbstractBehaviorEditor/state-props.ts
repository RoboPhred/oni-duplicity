import { createStructuredSelector } from "reselect";
import createCachedSelector from "re-reselect";

import { AbstractBehaviorEditorProps } from "./props";
import { AppState } from "@/state";
import { gameObjectsByIdSelector } from "../../selectors/save-game";
import { getBehavior } from "oni-save-parser";

export interface StateProps {
  templateData: any;
  extraData: any;
}

const gameObjectIdSelector = (
  _: any,
  props: AbstractBehaviorEditorProps<any>
) => props.gameObjectId;
const gameObjectBehaviorSelector = (
  _: any,
  props: AbstractBehaviorEditorProps<any>
) => props.gameObjectBehavior;

const behaviorSelector = createCachedSelector(
  gameObjectIdSelector,
  gameObjectBehaviorSelector,
  gameObjectsByIdSelector,
  (id, behaviorName, gameObjectsById) => {
    const gameObject = gameObjectsById[id];
    if (!gameObject) {
      return null;
    }
    const behavior = getBehavior(gameObject, behaviorName);
    if (!behavior) {
      return null;
    }

    return behavior;
  }
)(
  (_: any, props: AbstractBehaviorEditorProps<any>) =>
    `${props.gameObjectId}:${props.gameObjectBehavior}`
);

const mapStateToProps = createStructuredSelector<
  AppState,
  AbstractBehaviorEditorProps<any>,
  StateProps
>({
  templateData: (state: AppState, props: AbstractBehaviorEditorProps<any>) => {
    const behavior = behaviorSelector(state, props);
    if (!behavior) return null;
    return behavior.templateData;
  },
  extraData: (state: AppState, props: AbstractBehaviorEditorProps<any>) => {
    const behavior = behaviorSelector(state, props);
    if (!behavior) return null;
    return behavior.extraData;
  }
});

export default mapStateToProps;
