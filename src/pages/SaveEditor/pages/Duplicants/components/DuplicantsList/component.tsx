
import * as React from "react";
import { connect } from "react-redux";


import DuplicantPortrait from "../DuplicantPortrait";

import mapStateToProps, { StateProps } from "./selectors";

export interface DuplicantsListProps {
    className?: string;
}

type Props = DuplicantsListProps & StateProps;
class DuplicantsList extends React.Component<Props> {
    render() {
        const {
            className,
            duplicantKeys
        } = this.props;

        const elements = duplicantKeys.map(x => <DuplicantPortrait key={x} duplicantKey={x} />);

        return (
            <div className={`${className || ''} ui-duplicant-portrait-list`}>
                <div className={`layout-fill layout-horizontal layout-wrap container-scroll`}>
                    {elements}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(DuplicantsList);