import { createStructuredSelector } from "reselect";
import createCachedSelector from "re-reselect";

import { AbstractBehaviorEditorProps } from "./props";
import { AppState } from "@/state";
import { gameObjectsByIdSelector } from "../../selectors/save-game";
import { getBehavior } from "oni-save-parser";

export interface StateProps {
  templateData: any;
}

const gameObjectIdSelector = (
  _: any,
  props: AbstractBehaviorEditorProps<any>
) => props.gameObjectId;
const gameObjectBehaviorSelector = (
  _: any,
  props: AbstractBehaviorEditorProps<any>
) => props.gameObjectBehavior;

const templateDataSelector = createCachedSelector(
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

    return behavior.templateData;
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
  templateData: templateDataSelector
});

export default mapStateToProps;
