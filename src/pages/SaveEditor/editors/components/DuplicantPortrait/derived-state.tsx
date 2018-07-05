import createCachedSelector from "re-reselect";
import { MinionIdentityBehavior, getBehavior } from "oni-save-parser";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save-selector";

import { DuplicantPortraitProps } from "./props";

const gameObjectIndex = (_: AppState, props: DuplicantPortraitProps) =>
  props.gameObjectIndex;

const generateCacheKey = gameObjectIndex;

const gameObject = createCachedSelector(
  oniSave,
  gameObjectIndex,
  (oniSave, gameObjectIndex) => {
    if (!oniSave) {
      return null;
    }
    const duplicants = oniSave.gameObjects.find(x => x.name === "Minion");
    if (!duplicants) {
      return null;
    }

    return duplicants.gameObjects[gameObjectIndex] || null;
  }
)(generateCacheKey);

const duplicantIdentity = createCachedSelector(gameObject, gameObject => {
  if (!gameObject) {
    return null;
  }
  const identBehavior = getBehavior(gameObject, MinionIdentityBehavior);
  if (!identBehavior || !identBehavior.templateData) {
    return null;
  }
  return identBehavior.templateData;
})(generateCacheKey);

const path = (state: AppState, props: DuplicantPortraitProps) => {
  const gameSave = oniSave(state);
  if (!gameSave) {
    return null;
  }
  const groupIndex = gameSave.gameObjects.findIndex(x => x.name === "Minion");
  if (groupIndex === -1) {
    return null;
  }
  const index = gameObjectIndex(state, props);
  return ["gameObjects", `${groupIndex}`, "gameObjects", `${index}`];
};

const name = (state: AppState, props: DuplicantPortraitProps) => {
  const ident = duplicantIdentity(state, props);
  return (ident && ident.name) || null;
};

const gender = (state: AppState, props: DuplicantPortraitProps) => {
  const ident = duplicantIdentity(state, props);
  return (ident && ident.genderStringKey) || null;
};

const arrivalCycle = (state: AppState, props: DuplicantPortraitProps) => {
  const ident = duplicantIdentity(state, props);
  return (ident && (ident.arrivalTime / 200).toFixed(1)) || null;
};

function mapStateToProps(state: AppState, props: DuplicantPortraitProps) {
  return {
    path: path(state, props),
    name: name(state, props),
    gender: gender(state, props),
    arrivalCycle: arrivalCycle(state, props)
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
