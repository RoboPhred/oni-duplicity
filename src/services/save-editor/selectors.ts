
import { Selector, createSelector, ParametricSelector } from "reselect";
import { GameObject, GameObjectBehavior } from "oni-save-parser";

import { AppState } from "../../state";

import { BehaviorName, getBehavior, MinionIdentityBehavior, KPrefabIDBehavior } from "./behaviors";


export const saveEditor = (state: AppState) => state.saveEditor;

// TODO: Lots of data can be precalculated here, but then we have to update
//  it when the game objects are modified.
// May want to investigate normalizing the save file then de-normalizing it
//  to save.  This is blocked currently by needing a very deeply nested value (KPrefabID) as the
//  ID to the game object.

const saveGame = createSelector(saveEditor, saveEditor => saveEditor.saveGame);

export const gameObjects = createSelector(saveGame, saveGame => saveGame ? saveGame.body.gameObjects : null);

export function makeGetGameObjectsByType(type: string): Selector<AppState, GameObject[]> {
    return createSelector(
        gameObjects,
        gameObjects => gameObjects ? gameObjects[type] || [] : []
    );
}

// We can handle parametric or non-parametric input selectors.  We do not use the parameter, but createSelector will pass the params as required.
export function makeGetBehaviorByName<T extends GameObjectBehavior>(gameObjectSelector: Selector<AppState, GameObject | null>, behaviorName: BehaviorName<T>): Selector<AppState, T | null>;
export function makeGetBehaviorByName<Props, T extends GameObjectBehavior>(gameObjectSelector: ParametricSelector<AppState, Props, GameObject | null>, behaviorName: BehaviorName<T>): ParametricSelector<AppState, Props, T | null>;
export function makeGetBehaviorByName<T extends GameObjectBehavior>(
    gameObjectSelector: (Selector<AppState, GameObject | null> | ParametricSelector<AppState, any, GameObject | null>),
    behaviorName: BehaviorName<T>
): ParametricSelector<AppState, any, T | null> {
    return createSelector(
        gameObjectSelector,
        (gameObject) => (gameObject && gameObject.behaviors.find(x => x.name === behaviorName) as T) || null
    );
}