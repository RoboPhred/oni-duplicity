
import { GameObjectBehaviorModel } from "./interfaces";
import { GameObjectBehavior } from "oni-save-parser";
import { typedKeys } from "utils";
import { observable, toJS } from "mobx";

export class GameObjectBehaviorModelImpl implements GameObjectBehaviorModel {
    get name(): string {
        return this._behavior.name;
    }

    // Already observable; set to ref of observable.
    readonly templateData: any | null;

    constructor(private _behavior: GameObjectBehavior) {
        this.templateData = _behavior.parsedData || null;
    }
}