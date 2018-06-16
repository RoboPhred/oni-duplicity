import { GameObjectBehaviorModel } from "./interfaces";
import { GameObjectBehavior } from "oni-save-parser";
import { observable, toJS } from "mobx";

export class GameObjectBehaviorModelImpl implements GameObjectBehaviorModel {
  get name(): string {
    return this._behavior.name;
  }

  @observable.deep templateData: any | null;

  constructor(private _behavior: GameObjectBehavior) {
    this.templateData = _behavior.templateData || null;
  }

  syncChanges() {
    this._behavior.templateData = toJS(this.templateData, {
      exportMapsAsObjects: false
    });
  }
}
