import createCachedSelector from "re-reselect";
import { getBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import { gameObjectsByIdSelector } from "../../selectors/save-game";

import { createStructuredSelector } from "../utils";

import { AbstractBehaviorEditorProps } from "./props";

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

const mapStateToProps = createStructuredSelector({
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

export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
