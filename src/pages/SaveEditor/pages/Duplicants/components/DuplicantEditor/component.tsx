
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import {
    EditableText,
    Tabs,
    Tab,
    NonIdealState
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { error, FAILURE_TYPE } from "../../../../../../logging";


import DuplicantEditorProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";


import GeneralPage from "./pages/General";
import AppearancePage from "./pages/Appearance";
import SkillsPage from "./pages/Skills";
import TraitsPage from "./pages/Traits";
import EffectsPage from "./pages/Effects";


type Props = DuplicantEditorProps & StateProps & DispatchProps;
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
            duplicantID,
            identityBehavior
        } = this.props;

        const {
            rename
        } = this.state;

        if (!identityBehavior) {
            error("Duplicant identity behavior missing", FAILURE_TYPE.MISSING_BEHAVIOR);
            return (
                <NonIdealState visual={IconNames.ERROR}>
                    Duplicant has no identity behavior.
                </NonIdealState>
            )
        }
        
        const name = rename || identityBehavior.parsedData.name;
        
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
                        <Tab className="layout-item-fill" id="general" title="General" panel={<GeneralPage duplicantID={duplicantID} />} />
                        <Tab className="layout-item-fill" id="appearance" title="Appearance" panel={<AppearancePage duplicantID={duplicantID} />} />
                        <Tab className="layout-item-fill" id="skills" title="Skills" panel={<SkillsPage duplicantID={duplicantID}/>} />
                        <Tab className="layout-item-fill" id="traits" title="Traits" panel={<TraitsPage duplicantID={duplicantID}/>} />
                        <Tab className="layout-item-fill" id="effects" title="Effects" panel={<EffectsPage duplicantID={duplicantID}/>} />
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

    @autobind()
    private _onRename() {
        const name = this.state.rename;
        if (!name) return;
        this.props.renameDuplicant({duplicantID: this.props.duplicantID, name});
        this.setState(s => ({
            ...s,
            rename: null
        }));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DuplicantEditor);
