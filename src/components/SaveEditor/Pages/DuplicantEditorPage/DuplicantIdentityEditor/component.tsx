
import * as React from "react";

import {
    GameObject
} from "oni-save-parser";

import {
    getBehavior,
    MinionIdentityBehavior
} from "../../../../../behaviors";
import { autobind } from "core-decorators";

export interface DuplicantIdentityEditorProps {
    minion: GameObject;
}

const style_input: React.CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    padding: "5px"
};
const style_row_filler: React.CSSProperties = {
    height: "100%"
};

export default class DuplicantIdentityEditor extends React.Component<DuplicantIdentityEditorProps> {

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
                    <IdentityRow identity={identity} name={"Name"} type="text" parseDataPath={["name"]}/>
                    <tr>
                        {/*
                            This isnt part of the identity, but we include it
                            for the entertainment value.
                            Min value is a rough guestimate.  Might want to look up
                            the closest-to-zero (epsilon?) decimal representation of a single precision value.
                            We expose this as a single scale, and set x/y/z.
                            Probably don't require z, and it might interfere with things
                            in the future.  Should investigate this further.
                         */}
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
                    <tr style={style_row_filler}/>
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

interface IdentityRowProps {
    identity: MinionIdentityBehavior;
    name: string;
    type: "number" | "text";
    parseDataPath: string[];
}

class IdentityRow extends React.Component<IdentityRowProps, IdentityRowProps> {
    render() {
        const {
            name,
            type
        } = this.props;
        return (
            <tr>
                <td>{name}</td>
                <td>
                    <input
                        style={style_input}
                        type={type}
                        value={this._getValue()}
                        onChange={this._valueChanged}
                    />
                </td>
            </tr>
        )
    }

    private _getValue(): any {
        const {
            identity,
            parseDataPath
        } = this.props;
        
        let curObj: any = identity.parsedData;
        for(let i = 0; i < parseDataPath.length; i++) {
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
            identity,
            parseDataPath,
            type
        } = this.props;
        
        let curObj: any = identity.parsedData;
        // Stop one early, we need the ref to set.
        for(let i = 0; i < parseDataPath.length - 1; i++) {
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
        switch(type) {
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