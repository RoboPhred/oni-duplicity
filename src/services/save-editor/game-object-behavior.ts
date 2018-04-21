
import { GameObjectBehaviorModel } from "./interfaces";
import { GameObjectBehavior } from "oni-save-parser";
import { typedKeys } from "utils";
import { observable, toJS } from "mobx";

export class GameObjectBehaviorModelImpl implements GameObjectBehaviorModel {
    get name(): string {
        return this._behavior.name;
    }

    @observable.deep
    templateData: any | null;

    constructor(private _behavior: GameObjectBehavior) {
        this.templateData = _behavior.parsedData || null;
    }

    syncChanges() {
        this._behavior.parsedData = toJS(this.templateData, {
            exportMapsAsObjects: false
        });
    }
}