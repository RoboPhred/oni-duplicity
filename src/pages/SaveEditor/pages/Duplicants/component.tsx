
import * as React from "react";
import { autobind } from "core-decorators";

import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { SaveEditorProps, withSaveEditor, GameObjectModel } from "@/services/save-editor";


import DuplicantsList from "./components/DuplicantsList";
import DuplicantEditor from "./components/DuplicantEditor";


type Props = SaveEditorProps;
interface State {
    selectedDuplicant: GameObjectModel | null;
}
class DuplicantsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedDuplicant: null
        };
    }

    render() {
        const {
            selectedDuplicant
        } = this.state;
        const {
            saveEditor
        } = this.props;

        const duplicants = saveEditor.getGameObjects("Minion");

        let content: React.ReactFragment;
        if (selectedDuplicant != null) {
            content = <DuplicantEditor className="fill-parent" duplicant={selectedDuplicant}/>
        }
        else {
            content = (
                <NonIdealState visual={IconNames.MUGSHOT}>
                    Select a duplicant to edit
                </NonIdealState>
            );
        }

        return (
            <div className="ui-page ui-page-duplicants fill-parent layout-vertical">
                <DuplicantsList className="layout-item" duplicants={duplicants} selectedDuplicant={selectedDuplicant} onDuplicantClick={this._onDuplicantSelected} />
                <div className="layout-item-fill">
                    {content}
                </div>
            </div>
        );
    }

    @autobind()
    private _onDuplicantSelected(duplicant: GameObjectModel) {
        this.setState(s => ({
            ...s,
            selectedDuplicant: duplicant
        }));
    }
}

export default withSaveEditor(DuplicantsPage);
