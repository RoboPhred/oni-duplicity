import produce from "immer";

import { get } from "lodash-es";

import { GameObject } from "oni-save-parser";

import { AppState } from "@/state";

import { getSelectedGameObjectPath } from "@/selectors/game-object";

export function produceFromGameObject(
  state: AppState,
  producer: (gameObject: GameObject) => void
): AppState {
  if (state.loadingState !== "ready") {
    return state;
  }

  const path = getSelectedGameObjectPath(state);
  if (!path) {
    return state;
  }

  return produce(state, state => {
    const gameObject: GameObject = get(state.oniSave, path);
    if (!gameObject) {
      return;
    }

    return producer(gameObject);
  });
}
