
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";
import { NumericInput } from "@blueprintjs/core";

import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";

type Props = StateProps & DispatchProps;
class GeneralPage extends React.Component<Props> {
    render() {
        const {
            cycles,
            nextSpawn,
            isSpawnReady
        } = this.props;
        return (
            <div className="ui-page ui-page-general fill-parent layout-vertical">
                <div className="pt-form-group">
                    <label className="pt-label">
                        <h5>World Time</h5>
                    </label>
                    <div className="pt-form-content">
                        <div className="pt-input-group">
                            <span>Cycles</span>
                            <NumericInput min={0} value={cycles} onValueChange={this._onCycleChange} clampValueOnBlur={true} />
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
                            <NumericInput min={0} clampValueOnBlur={true} value={nextSpawn} onValueChange={this._nextSpawnChange} />
                        </div>
                        <div className="pt-input-group">
                            <label className="pt-control pt-checkbox">
                                <input type="checkbox" checked={isSpawnReady} onChange={this._spawnReadyChange} />
                                <span className="pt-control-indicator"></span>
                                Spawn Ready
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    @autobind()
    private _onCycleChange(cycle: number) {
        this.props.setCycle({cycle});
    }

    @autobind()
    private _nextSpawnChange(time: number) {
        this.props.setImmigrationTimer({time});
    }

    @autobind()
    private _spawnReadyChange(change: React.ChangeEvent<HTMLInputElement>) {
        const ready = change.target.checked;
        this.props.setImmigrationReady({ready});
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralPage);
