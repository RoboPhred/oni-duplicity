import * as React from "react";

import {
    autobind
} from "core-decorators";


import {
    AttributeSaveLoadLevel
} from "../../../behaviors";


export interface AttributeEditorProps {
    attribute: AttributeSaveLoadLevel;
}

export default class AttributeEditor extends React.Component<AttributeEditorProps> {
    render() {
        const {
            experience,
            level
        } = this.props.attribute;

        return (
            <div className="layout-vertical">
                <div>Experience: <input type="number" value={experience} onChange={this._onExperienceInputChanged}/></div>
                <div>Level: <input type="number" value={level} onChange={this._onLevelInputChanged}/></div>
            </div>
        );
    }

    @autobind()
    private _onExperienceInputChanged(e: React.ChangeEvent<HTMLInputElement>) {
        // attribute is a live instance
        const val = Number(e.target.value);
        this.props.attribute.experience = (isNaN(val) || val < 0) ? 0 : val

        // Urg...
        this.forceUpdate();
    }

    @autobind()
    private _onLevelInputChanged(e: React.ChangeEvent<HTMLInputElement>) {
        // attribute is a live instance
        const val = Number(e.target.value);
        this.props.attribute.level = (isNaN(val) || val < 0) ? 0 : val

        // Urg...
        this.forceUpdate();
    }
}