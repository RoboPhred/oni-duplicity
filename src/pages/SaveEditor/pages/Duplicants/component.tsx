
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import { NonIdealState } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";


import DuplicantsList from "./components/DuplicantsList";
import DuplicantEditor from "./components/DuplicantEditor";


type Props = {};
interface State {
    selectedDuplicantID: number | null;
}
class DuplicantsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedDuplicantID: null
        };
    }

    render() {
        const {
            selectedDuplicantID
        } = this.state;

        let content: React.ReactFragment;
        if (selectedDuplicantID != null) {
            content = <DuplicantEditor className="fill-parent" duplicantID={selectedDuplicantID}/>
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
                <DuplicantsList className="layout-item" selectedDuplicantID={selectedDuplicantID} onDuplicantClick={this._onDuplicantSelected} />
                <div className="layout-item-fill">
                    {content}
                </div>
            </div>
        );
    }

    @autobind()
    private _onDuplicantSelected(duplicantID: number) {
        this.setState(s => ({
            ...s,
            selectedDuplicantID: duplicantID
        }));
    }
}

export default DuplicantsPage

