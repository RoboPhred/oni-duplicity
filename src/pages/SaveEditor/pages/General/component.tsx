
import * as React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { NumericInput } from "@blueprintjs/core";
import { GameObjectBehavior } from "oni-save-parser";

import { SaveEditorProps, withSaveEditor, GameObjectBehaviorModel } from "@/services/save-editor";

import "./style.scss";

type Props = SaveEditorProps;
class GeneralPage extends React.Component<Props> {
    render() {
        const {
            saveEditor
        } = this.props;

        const clockBehavior = this._getClockBehavior();
        if (!clockBehavior) return <div>Error: No GameClock behavior present in SaveGame object.</div>;
        const cycle = clockBehavior.templateData.cycle;

        const immigrationBehavior = this._getImmigrationBehavior();
        if (!immigrationBehavior) return <div>Error: No Immigration behavior present in SaveGame object.</div>;
        const {
            timeBeforeSpawn,
            bImmigrantAvailable
        } = immigrationBehavior.templateData;

        return (
            <div className="ui-page ui-page-general fill-parent layout-vertical">
                <div className="pt-form-group">
                    <label className="pt-label">
                        <h5>World Time</h5>
                    </label>
                    <div className="pt-form-content">
                        <div className="pt-input-group">
                            <span>Cycles</span>
                            <NumericInput min={0} value={cycle} onValueChange={this._onCycleChange} clampValueOnBlur={true} />
                        </div>
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label">
                        <h5>Duplicant Spawner</h5>
                    </label>
                    <div className="pt-form-content">
                        <div className="pt-input-group">
                            <span>Next Spawn</span>
                            <NumericInput min={0} clampValueOnBlur={true} value={timeBeforeSpawn} onValueChange={this._nextSpawnChange} />
                        </div>
                        <div className="pt-input-group">
                            <label className="pt-control pt-checkbox">
                                <input type="checkbox" checked={bImmigrantAvailable} onChange={this._spawnReadyChange} />
                                <span className="pt-control-indicator"></span>
                                Spawn Ready
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    @action.bound
    private _onCycleChange(cycle: number) {
        const behavior = this._getClockBehavior();
        if (!behavior) return;
        behavior.templateData.cycle = cycle;
    }

    @action.bound
    private _nextSpawnChange(time: number) {
        const behavior = this._getImmigrationBehavior();
        if (!behavior) return;
        behavior.templateData.timeBeforeSpawn = time;
    }

    @action.bound
    private _spawnReadyChange(change: React.ChangeEvent<HTMLInputElement>) {
        const behavior = this._getImmigrationBehavior();
        if (!behavior) return;
        behavior.templateData.bImmigrantAvailable = change.target.checked;
    }

    private _getClockBehavior(): GameObjectBehaviorModel<GameClockBehavior> | undefined {
        const { saveEditor } = this.props;
        const saveGame = saveEditor.getGameObjects("SaveGame")[0];
        if (!saveGame) return undefined;

        return saveGame.getBehavior("GameClock");
    }

    private _getImmigrationBehavior(): GameObjectBehaviorModel<ImmigrationBehavior> | undefined {
        const { saveEditor } = this.props;
        const saveGame = saveEditor.getGameObjects("SaveGame")[0];
        if (!saveGame) return undefined;

        return saveGame.getBehavior("Immigration");
    }
}

export default withSaveEditor(GeneralPage);

// TODO: move to oni-save-parser
interface GameClockBehavior extends GameObjectBehavior {
    name: "GameClock";
    parsedData: {
        cycle: number;
    }
}
interface ImmigrationBehavior extends GameObjectBehavior {
    name: "Immigration";
    parsedData: {
        timeBeforeSpawn: number;
        bImmigrantAvailable: boolean;
    }
}