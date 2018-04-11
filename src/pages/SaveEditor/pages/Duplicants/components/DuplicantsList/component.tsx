
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import DuplicantPortrait from "../DuplicantPortrait";


import mapStateToProps, { StateProps } from "./selectors";


export interface DuplicantsListProps {
    className?: string;
    selectedDuplicantKey?: string | null;
    onDuplicantClick?(duplicantKey: string): void;
}

type Props = DuplicantsListProps & StateProps;
class DuplicantsList extends React.Component<Props> {
    render() {
        const {
            className,
            duplicantKeys,
            selectedDuplicantKey
        } = this.props;

        const elements = duplicantKeys.map(x => <DuplicantPortrait key={x} className={x === selectedDuplicantKey ? "pt-active" : ""} duplicantKey={x} onClick={this._onDuplicantClick} />);

        return (
            <div className={`${className || ''} ui-duplicant-list`}>
                <div className={`fill-parent layout-horizontal layout-wrap container-scroll`}>
                    {elements}
                </div>
            </div>
        );
    }

    @autobind()
    private _onDuplicantClick(duplicantKey: string) {
        const {
            onDuplicantClick
        } = this.props;

        if (onDuplicantClick) {
            onDuplicantClick(duplicantKey);
        }
    }
}
export default connect(mapStateToProps)(DuplicantsList);