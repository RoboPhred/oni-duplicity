
import { observable } from "mobx";
import { createTransformer } from "mobx-utils";

import {
    GameObject,
    Vector3,
    KPrefabIDBehavior,
    BehaviorName,
    GameObjectBehavior
} from "oni-save-parser";

import { GameObjectModel, GameObjectBehaviorModel } from "./interfaces";

import { GameObjectBehaviorModelImpl } from "./game-object-behavior";

export class GameObjectModelImpl implements GameObjectModel {
    readonly type: string;

    readonly kPrefabID: number;

    // Already observable, as gameObject is deeply observable.
    readonly scale: Vector3;

    private _gameObject: GameObject;

    private _behaviorCache = new Map<string, GameObjectBehaviorModel[]>();

    constructor(type: string, gameObject: GameObject) {
        this.type = type;
        this._gameObject = gameObject;

        // Set scale to the ref of the game object scale, so
        //  changing it will apply directly.
        this.scale = gameObject.scale;

        for (let behavior of gameObject.behaviors) {
            let array = this._behaviorCache.get(behavior.name);
            if (!array) {
                array = [];
                this._behaviorCache.set(behavior.name, array);
            }
            array.push(new GameObjectBehaviorModelImpl(behavior));
        }

        const idBehavior = this.getBehavior(KPrefabIDBehavior);
        if (idBehavior) {
            this.kPrefabID = idBehavior.templateData.InstanceID;
        }
        else {
            this.kPrefabID = NaN;
        }
    }

    // TODO: Look at why this is generating new objects every time.  Might be because the source object isnt observable?
    /*
    getBehavior: GameObjectModel["getBehavior"] = createTransformer((behaviorName: string) => {
        const behavior = this._gameObject.behaviors.find(x => x.name === behaviorName);
        if (!behavior) return undefined;
        return new GameObjectBehaviorModelImpl(behavior);
    });
    */
    getBehavior<TBehavior extends GameObjectBehavior>(behaviorName: BehaviorName<TBehavior>): GameObjectBehaviorModel<TBehavior> | undefined {
        const entries = this._behaviorCache.get(behaviorName);
        if (entries) return entries[0] as any;
        return undefined;
    }

    /*
    getAllBehaviors: GameObjectModel["getAllBehaviors"] = createTransformer((behaviorName: string) => {
        return this._gameObject.behaviors.filter(x => x.name === behaviorName).map(x => new GameObjectBehaviorModelImpl(x));
    });
    */

    getAllBehaviors<TBehavior extends GameObjectBehavior>(behaviorName: BehaviorName<TBehavior>): GameObjectBehaviorModel<TBehavior>[] {
        return this._behaviorCache.get(behaviorName) || [] as any;
    }
}
