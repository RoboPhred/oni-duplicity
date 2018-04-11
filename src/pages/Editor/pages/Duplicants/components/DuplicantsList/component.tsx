
import * as React from "react";
import { connect } from "react-redux";

// FIXME: direct color access.  Use CSS.
//  Need to use sass to pull values out of blueprintjs
import { Colors } from "@blueprintjs/core";

import DuplicantPortrait from "../DuplicantPortrait";

import mapStateToProps, { StateProps } from "./selectors";

const style_portrait_container: React.CSSProperties = {
    boxSizing: "border-box",
    // Room for 2 portraits and their margins
    height: 150 * 2 + 10 * 4,
    background: Colors.GRAY5
};

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
            <div className={className}>
                <div style={style_portrait_container} className={`layout-fill layout-horizontal layout-wrap container-scroll`}>
                    {elements}
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps)(DuplicantsList);