
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import {
    EditableText,
    Tabs,
    Tab,
    NonIdealState
} from "@blueprintjs/core";

import { error, FAILURE_TYPE } from "../../../../../../logging";


import DuplicantEditorProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";


import AppearancePage from "./pages/Appearance";
import SkillsPage from "./pages/Skills";


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
            identityBehavior
        } = this.props;

        const {
            rename
        } = this.state;

        if (!identityBehavior) {
            error("Duplicant identity behavior missing", FAILURE_TYPE.MISSING_BEHAVIOR);
            return (
                <NonIdealState visual="error">
                    Duplicant has no identity behavior.
                </NonIdealState>
            )
        }
        
        const name = rename || identityBehavior.parsedData.name;
        
        return (
            <div className={`ui-duplicant-editor ${className}`}>
                <h1 className="ui-title">
                    <EditableText
                        value={name}
                        onChange={this._onNameChange}
                        onConfirm={this._onRename}
                    />
                </h1> <span className="pt-text-muted">(click to edit)</span>
                <Tabs id="DuplicantEditCategories" className="ui-category-tabs layout-item-fill">
                    <Tab id="appearance" title="Appearance" panel={<AppearancePage />} />
                    <Tab id="skills" title="Skills" panel={<SkillsPage />} />
                </Tabs>
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
        this.props.renameDuplicant({prefabID: this.props.duplicantID, name});
        this.setState(s => ({
            ...s,
            rename: null
        }));
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DuplicantEditor);