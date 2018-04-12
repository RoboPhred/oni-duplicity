
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import DuplicantPortrait from "../DuplicantPortrait";


import mapStateToProps, { StateProps } from "./selectors";


export interface DuplicantsListProps {
    className?: string;
    selectedDuplicantID?: number | null;
    onDuplicantClick?(duplicantID: number): void;
}

type Props = DuplicantsListProps & StateProps;
class DuplicantsList extends React.Component<Props> {
    render() {
        const {
            className,
            duplicantsIDs,
            selectedDuplicantID
        } = this.props;

        const elements = duplicantsIDs.map(x => <DuplicantPortrait key={x} className={x === selectedDuplicantID ? "pt-active" : ""} duplicantID={x} onClick={this._onDuplicantClick} />);

        return (
            <div className={`${className || ''} ui-duplicant-list`}>
                <div className={`fill-parent layout-horizontal layout-wrap container-scroll`}>
                    {elements}
                </div>
            </div>
        );
    }

    @autobind()
    private _onDuplicantClick(duplicantID: number) {
        const {
            onDuplicantClick
        } = this.props;

        if (onDuplicantClick) {
            onDuplicantClick(duplicantID);
        }
    }
}
export default connect(mapStateToProps)(DuplicantsList);