
import { observable, toJS } from "mobx";
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

    @observable.deep
    position: Vector3;

    @observable.deep
    scale: Vector3;

    private _gameObject: GameObject;

    private _behaviors = new Map<string, GameObjectBehaviorModelImpl[]>();

    constructor(type: string, gameObject: GameObject) {
        this.type = type;
        this._gameObject = gameObject;

        this.position = gameObject.position;
        this.scale = gameObject.scale;

        for (let behavior of gameObject.behaviors) {
            let array = this._behaviors.get(behavior.name);
            if (!array) {
                array = [];
                this._behaviors.set(behavior.name, array);
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
        const entries = this._behaviors.get(behaviorName);
        if (entries) return entries[0] as any;
        return undefined;
    }

    /*
    getAllBehaviors: GameObjectModel["getAllBehaviors"] = createTransformer((behaviorName: string) => {
        return this._gameObject.behaviors.filter(x => x.name === behaviorName).map(x => new GameObjectBehaviorModelImpl(x));
    });
    */

    getAllBehaviors<TBehavior extends GameObjectBehavior>(behaviorName: BehaviorName<TBehavior>): GameObjectBehaviorModel<TBehavior>[] {
        return this._behaviors.get(behaviorName) || [] as any;
    }

    syncChanges() {
        // Sigh...
        this._gameObject.position.x = this.position.x;
        this._gameObject.position.y = this.position.y;
        this._gameObject.position.z = this.position.z;

        this._gameObject.scale.x = this.scale.x;
        this._gameObject.scale.y = this.scale.y;
        this._gameObject.scale.z = this.scale.z;

        for (let [_, values] of this._behaviors) {
            values.forEach(x => x.syncChanges());
        }
    }
}
