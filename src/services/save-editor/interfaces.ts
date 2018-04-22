import { Vector3, BehaviorName, GameObjectBehavior } from "oni-save-parser";

export interface SaveEditor {
    readonly saveName: string | null;

    readonly isSaveLoading: boolean;
    readonly isSaveLoaded: boolean;

    readonly loadError: Error | null;

    readonly isSaveSaving: boolean;

    readonly gameObjects: GameObjectModel[];

    load(file: File): void;

    renameSave(name: string): void;

    save(): void;

    getGameObjects(type: string): GameObjectModel[];
}

export interface GameObjectModel {
    readonly kPrefabID: number;
    readonly type: string;
    
    position: Vector3;
    scale: Vector3;

    getBehavior<TBehavior extends GameObjectBehavior>(behaviorName: BehaviorName<TBehavior>): GameObjectBehaviorModel<TBehavior> | undefined;
    getAllBehaviors<TBehavior extends GameObjectBehavior>(behaviorName: BehaviorName<TBehavior>): GameObjectBehaviorModel<TBehavior>[];
}

// Flatten parsedData into the model proper.
//  TODO: revisit when further in with mobx; might not be possible.
//  Replace with func getter/setter with path if needed.
export interface GameObjectBehaviorModel<TBehavior extends GameObjectBehavior = GameObjectBehavior> {
    readonly name: string;
    templateData: TBehavior["parsedData"];
};
