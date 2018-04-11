
import * as React from "react";
import { connect } from "react-redux";

import { MinionIdentityBehavior, getBehavior } from "../../../../utils";

import DuplicantPortrait from "../DuplicantPortrait";

import mapStateToProps, { StateProps } from "./selectors";

const style_portrait_container: React.CSSProperties = {
    boxSizing: "border-box",
    // Room for 2 portraits and their margins
    height: 150 * 2 + 10 * 4
}

export interface DuplicantsListProps {
    className?: string;
}

type Props = DuplicantsListProps & StateProps;
class DuplicantsList extends React.Component<Props> {
    render() {
        const {
            className,
            minions
        } = this.props;

        const elements = minions.map((x, i) => <DuplicantPortrait key={i} minion={x} />);

        return (
            <div className={className}>
                <div style={style_portrait_container} className={`layout-fill layout-horizontal layout-wrap scrolling-content`}>
                    {elements}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(DuplicantsList);