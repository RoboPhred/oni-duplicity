import * as React from "react";

import { GameObject } from "oni-save-parser";

import {
    MinionIdentityBehavior,
    AttributeLevelBehavior,
    getBehavior
} from '../../behaviors';

import AttributeEditor from "./AttributeEditor";

export interface DuplicantEditorProps {
    minion: GameObject;
}
export default class DuplicantEditor extends React.Component<DuplicantEditorProps> {
    render() {
        const identBehavior = getBehavior(this.props.minion, MinionIdentityBehavior);
        if (!identBehavior) {
            return <div>Error: No MinionIdentity behavior found for dup.</div>;
        }

        return (
            <div className="ui-container layout-vertical">
                <span className="layout-item">Name: {identBehavior.parsedData.name}</span>
                <div className="layout-item-fill ui-container">
                    <span>Attributes</span>
                    <div className="ui-container">
                        {this._renderAttributes()}
                    </div>
                </div>
            </div>
        );
    }

    private _renderAttributes() {
        const levelBehavior = getBehavior(this.props.minion, AttributeLevelBehavior);
        if (!levelBehavior) {
            return <div>Error: No AttributeLevel behavior found for dup.</div>;
        }

        const attributeEditors: React.ReactFragment[] = [];
        for (let attribute of levelBehavior.parsedData.saveLoadLevels) {
            attributeEditors.push(
                <div key={attribute.attributeId}>
                    <span>{attribute.attributeId}</span>
                    <div className="ui-container">
                        <AttributeEditor attribute={attribute}/>
                    </div>
                </div>
            );
        }

        return (
            <div className="layout-vertical">
                {attributeEditors}
            </div>
        );
    }
}