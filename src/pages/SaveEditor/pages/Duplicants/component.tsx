
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import { NonIdealState } from "@blueprintjs/core";


import DuplicantsList from "./components/DuplicantsList";
import DuplicantEditor from "./components/DuplicantEditor";


type Props = {};
interface State {
    selectedDuplicantKey: string | null;
}
class DuplicantsPage extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedDuplicantKey: null
        };
    }

    render() {
        const {
            selectedDuplicantKey
        } = this.state;

        let content: React.ReactFragment;
        if (selectedDuplicantKey) {
            content = <DuplicantEditor className="fill-parent" duplicantKey={selectedDuplicantKey}/>
        }
        else {
            content = (
                <NonIdealState visual="mugshot">
                    Select a duplicant to edit
                </NonIdealState>
            );
        }

        return (
            <div className="ui-page ui-page-duplicants fill-parent layout-vertical">
                <DuplicantsList className="layout-item" selectedDuplicantKey={selectedDuplicantKey} onDuplicantClick={this._onDuplicantSelected} />
                <div className="layout-item-fill">
                    {content}
                </div>
            </div>
        );
    }

    @autobind()
    private _onDuplicantSelected(duplicantKey: string) {
        this.setState(s => ({
            ...s,
            selectedDuplicantKey: duplicantKey
        }));
    }
}

export default DuplicantsPage

