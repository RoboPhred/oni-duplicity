
import { GameObjectBehaviorModel } from "./interfaces";
import { GameObjectBehavior } from "oni-save-parser";
import { typedKeys } from "utils";
import { observable, toJS } from "mobx";

export class GameObjectBehaviorModelImpl implements GameObjectBehaviorModel {
    private _observableTemplate: any;

    get name(): string {
        return this._behavior.name;
    }

    get templateData(): any {
        return this._observableTemplate;
    }

    set templateData(value: any) {
        this._observableTemplate = observable(value, {}, {
            name: "GameObjectBehaviorModelImpl._observableTemplate"
        });
        this._behavior.parsedData = toJS(value);
    }

    constructor(private _behavior: GameObjectBehavior) {
        this._observableTemplate = observable(_behavior.parsedData);
    }
}