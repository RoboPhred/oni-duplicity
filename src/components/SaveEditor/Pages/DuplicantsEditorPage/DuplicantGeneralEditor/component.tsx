
import * as React from "react";

import Select, { Option } from "react-select";

import {
    autobind
} from "core-decorators";

import {
    GameObject,
    GameObjectBehavior
} from "oni-save-parser";


import {
    BehaviorName,
    MinionIdentityBehavior,
    MinionHealthBehavior,
    getBehavior
} from "../../../../../behaviors";


const style_input: React.CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    padding: "5px"
};
const style_row_filler: React.CSSProperties = {
    height: "100%"
};

export interface DuplicantIdentityEditorProps {
    minion: GameObject;
}

export default class DuplicantGeneralEditor extends React.Component<DuplicantIdentityEditorProps> {

    render() {
        const {
            minion
        } = this.props;

        const identity = getBehavior(minion, MinionIdentityBehavior);
        if (!identity) {
            return <div>Error: No minion identity behavior</div>;
        }

        return (
            <table className="fill-parent">
                <tbody>
                    <BehaviorEditableRow minion={minion} name="Name" type="text" behaviorName={MinionIdentityBehavior} parseDataPath={["name"]} />
                    <tr>
                        <td>Scale</td>
                        <td>
                            <input
                                style={style_input}
                                type="number"
                                min={0.0000001}
                                value={minion.scale.x}
                                onChange={this._onScaleChanged}
                            />
                        </td>
                    </tr>
                    <MinionHealthRow minion={minion} />
                    <tr style={style_row_filler} />
                </tbody>
            </table>
        );
    }

    @autobind()
    private _onScaleChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const {
            minion: {
                scale
            }
        } = this.props;
        let value = Number(event.target.value);
        if (value <= 0) {
            value = 0.0000001;
        }

        scale.x = value;
        scale.y = value;
        scale.z = value;
        this.forceUpdate();
    }
}

interface IdentityRowProps<T> {
    minion: GameObject,
    behaviorName: BehaviorName<T>;
    name: string;
    type: "number" | "text";
    parseDataPath: string[];
}

class BehaviorEditableRow<T extends GameObjectBehavior> extends React.Component<IdentityRowProps<T>> {
    render() {
        const {
            minion,
            behaviorName,
            name,
            type
        } = this.props;

        let content: React.ReactFragment;

        const behavior = getBehavior(minion, behaviorName);
        if (!behavior) {
            content = <span>Error: Minion behavior {behaviorName} is missing.</span>
        }
        else {
            content = (
                <input
                    style={style_input}
                    type={type}
                    value={this._getValue()}
                    onChange={this._valueChanged}
                />
            );
        }

        return (
            <tr>
                <td>{name}</td>
                <td>
                    {content}
                </td>
            </tr>
        )
    }

    private _getValue(): any {
        const {
            minion,
            behaviorName,
            parseDataPath
        } = this.props;

        const behavior = getBehavior(minion, behaviorName);
        if (!behavior) {
            return null;
        }

        let curObj: any = behavior.parsedData;
        for (let i = 0; i < parseDataPath.length; i++) {
            const p = parseDataPath[i];
            if (!Object.prototype.hasOwnProperty.call(curObj, p)) {
                return null;
            }
            curObj = curObj[p];
            if (curObj == null) {
                return null;
            }
        }
        return curObj;
    }

    @autobind()
    private _valueChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const {
            minion,
            behaviorName,
            parseDataPath,
            type
        } = this.props;

        const behavior = getBehavior(minion, behaviorName);
        if (!behavior) {
            return null;
        }

        let curObj: any = behavior.parsedData;
        // Stop one early, we need the ref to set.
        for (let i = 0; i < parseDataPath.length - 1; i++) {
            const p = parseDataPath[i];
            if (!Object.prototype.hasOwnProperty.call(curObj, p)) {
                return;
            }
            curObj = curObj[p];
            if (!curObj || typeof curObj !== "object") {
                return;
            }
        }

        let value: any = event.target.value;
        switch (type) {
            case "number":
                value = Number(value);
                break;
            case "text":
                value = String(value);
                break;
            default:
                return;
        }

        const lastKey = parseDataPath[parseDataPath.length - 1];
        curObj[lastKey] = value;

        // TODO: target plain json objects intead of live instances. 
        this.forceUpdate();
    }
}

const HEALTH_STATE_OPTIONS: Option[] = [
    { label: "Perfect", value: 0 },
    { label: "Alright", value: 1 },
    { label: "Scuffed", value: 2 },
    { label: "Injured", value: 3 },
    { label: "Critical", value: 4 },
    { label: "Incapacitated", value: 5 },
    { label: "Dead", value: 6 },
    { label: "Invincible", value: 7 }
];

interface MinionHealthRowProps {
    minion: GameObject;
}
class MinionHealthRow extends React.Component<MinionHealthRowProps> {
    render() {
        return [
            <tr key="health-state">
                <td>Health Status</td>
                <td>
                    <Select
                        value={this._getStatus()}
                        closeOnSelect={true}
                        required={true}
                        options={HEALTH_STATE_OPTIONS}
                        onChange={this._setStatus}
                    />
                </td>
            </tr>,
            <tr key="can-incapacitate">
                <td>Can Be Incapacitated</td>
                <td>
                    <input
                        type="checkbox"
                        checked={this._getCanIncapacitate()}
                        onChange={this._setCanIncapacitate}
                    />
                </td>
            </tr>
        ];
    }

    private _getStatus(): Option {
        const {
            minion
        } = this.props;

        const health = getBehavior(minion, MinionHealthBehavior);
        if (!health) {
            return {
                label: "ERROR_NO_HEALTH_BEHAVIOR",
                value: 0
            };
        }
        let statusCode = health.parsedData.State;
        let option = HEALTH_STATE_OPTIONS.find(x => x.value === statusCode);
        if (option == null) {
            return {
                label: `Unknown Status (${statusCode})`,
                value: statusCode
            };
        }

        return option;
    }

    @autobind()
    private _setStatus(_value: any) {
        const value = _value as Option;

        const {
            minion
        } = this.props;

        const health = getBehavior(minion, MinionHealthBehavior);
        if (!health) {
            return;
        }

        health.parsedData.State = Number(value.value || 0);
        this.forceUpdate();
    }

    private _getCanIncapacitate(): boolean {
        const {
            minion
        } = this.props;

        const health = getBehavior(minion, MinionHealthBehavior);
        if (!health) {
            return true;
        }

        return health.parsedData.CanBeIncapacitated;
    }

    @autobind()
    private _setCanIncapacitate(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.checked;
        const {
            minion
        } = this.props;

        const health = getBehavior(minion, MinionHealthBehavior);
        if (!health) {
            return;
        }

        health.parsedData.CanBeIncapacitated = value;
        this.forceUpdate();
    }
}