
import * as React from "react";

import {
    Tabs,
    Tab
} from "material-ui/Tabs";

import { GameObject } from "oni-save-parser";

import {
    MinionIdentityBehavior,
    AttributeLevelBehavior,
    getBehavior
} from '../../../../../behaviors';


import DuplicantSkillsEditor from "../DuplicantSkillsEditor";

const EDITORS = {
    "skills": DuplicantSkillsEditor
};

export interface DuplicantEditorProps {
    minion: GameObject;
}

interface State {
    selectedTab: keyof typeof EDITORS;
}

export default class DuplicantEditor extends React.Component<DuplicantEditorProps, State> {
    constructor(props: DuplicantEditorProps) {
        super(props);
        this.state = {
            selectedTab: "skills"
        };
    }

    render() {
        const {
            minion
        } = this.props;

        const {
            selectedTab
        } = this.state;

        const identBehavior = getBehavior(minion, MinionIdentityBehavior);
        if (!identBehavior) {
            return <div>Error: No MinionIdentity behavior found for dup.</div>;
        }

        const SelectedComponent = EDITORS[selectedTab];

        return (
            <div className="fill-parent layout-vertical">
                <span className="layout-item">Name: {identBehavior.parsedData.name}</span>
                <Tabs className="layout-item">
                    <Tab label="Skills" value="skills"/>
                </Tabs>
                {/* 
                    Select the component based on the selected tab.
                    This is a workaround to the tab container breaking our scroll decisions by
                    providing infinite space.
                */}
                <div className="layout-item-fill scrolling-content">
                    <SelectedComponent minion={minion}/>
                </div>
            </div>
        );
    }
}