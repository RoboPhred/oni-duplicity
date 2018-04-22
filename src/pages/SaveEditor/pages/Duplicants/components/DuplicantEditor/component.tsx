
import * as React from "react";
import { action } from "mobx";
import { autobind } from "core-decorators";
import { MinionIdentityBehavior } from "oni-save-parser";

import {
    EditableText,
    Tabs,
    Tab,
    NonIdealState
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { GameObjectModel } from "@/services/save-editor";
import { error, FAILURE_TYPE } from "@/logging";


export interface DuplicantEditorProps {
    className?: string;
    duplicant: GameObjectModel;
};


import GeneralPage from "../../pages/General";
import AppearancePage from "../../pages/Appearance";
import SkillsPage from "../../pages/Skills";
import TraitsPage from "../../pages/Traits";
import JobsPage from "../../pages/Jobs";
import EffectsPage from "../../pages/Effects";


type Props = DuplicantEditorProps;
interface State {
    rename: string | null;
}
class DuplicantEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            rename: null
        };
    }

    render() {
        const {
            className,
            duplicant,
        } = this.props;

        const {
            rename
        } = this.state;

        const identityBehavior = duplicant.getBehavior(MinionIdentityBehavior);

        if (!identityBehavior) {
            error("Duplicant identity behavior missing", FAILURE_TYPE.MISSING_BEHAVIOR);
            return (
                <NonIdealState visual={IconNames.ERROR}>
                    Duplicant has no identity behavior.
                </NonIdealState>
            )
        }
        
        const name = rename || identityBehavior.templateData.name;
        
        return (
            <div className={`ui-duplicant-editor layout-vertical ${className}`}>
                <div className="layout-item">
                    <h1 className="ui-title">
                        <EditableText
                            value={name}
                            onChange={this._onNameChange}
                            onConfirm={this._onRename}
                        />
                    </h1> <span className="pt-text-muted">(click to edit name)</span>
                </div>
                <div className="layout-item-fill">
                    <Tabs id="DuplicantEditCategories" className="ui-category-tabs fill-parent layout-vertical" renderActiveTabPanelOnly={true}>
                        <Tab className="layout-item-fill" id="general" title="General" panel={<GeneralPage duplicant={duplicant} />} />
                        <Tab className="layout-item-fill" id="appearance" title="Appearance" panel={<AppearancePage duplicant={duplicant} />} />
                        <Tab className="layout-item-fill" id="skills" title="Skills" panel={<SkillsPage duplicant={duplicant}/>} />
                        <Tab className="layout-item-fill" id="traits" title="Traits" panel={<TraitsPage duplicant={duplicant}/>} />
                        <Tab className="layout-item-fill" id="jobs" title="Jobs" panel={<JobsPage duplicant={duplicant}/>} />
                        <Tab className="layout-item-fill" id="effects" title="Effects" panel={<EffectsPage duplicant={duplicant}/>} />
                    </Tabs>
                </div>
            </div>
        );
    }

    @autobind()
    private _onNameChange(str: string) {
        this.setState(s => ({
            ...s,
            rename: str
        }));
    }

    @action.bound
    private _onRename() {
        const { duplicant } = this.props;
        const name = this.state.rename;
        if (!name || name === "") return;
        const identityBehavior = duplicant.getBehavior(MinionIdentityBehavior);
        if (!identityBehavior) return;

        identityBehavior.templateData.name = name;
        this.setState(s => ({
            ...s,
            rename: null
        }));
    }
}
export default DuplicantEditor;
