
import * as React from "react";
import { connect } from "react-redux";

import { GameObject } from "oni-save-parser";

import { Card } from "@blueprintjs/core";
import { autobind } from "core-decorators";

import { error, FAILURE_TYPE } from "../../../../../../logging";



import DuplicantPortraitProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";


type Props = DuplicantPortraitProps & StateProps;
class DuplicantPortrait extends React.Component<Props> {
    render() {
        const {
            className,
            identityBehavior,
            resumeBehavior
        } = this.props;

        let outerClassName = `ui-duplicant-portrait ${className}`;

        let name: string;
        let role: string;

        if (identityBehavior) {
            name = identityBehavior.parsedData.name;
        }
        else {
            error("Duplicant not found or identity behavior missing.", FAILURE_TYPE.MISSING_BEHAVIOR);
            name = "[IDENTITY MISSING]";
        }

        if (resumeBehavior) {
            role = resumeBehavior.parsedData.currentRole
        }
        else {
            error("resume behavior missing.", FAILURE_TYPE.MISSING_BEHAVIOR);
            role = "[RESUME MISSING]";
        }

        return (
            <Card className={outerClassName} interactive={true} onClick={this._onClick}>
                <h5 className="ui-duplicant-name">{name}</h5>
                {/* TODO render a picture.  Plenty of data in identity to do so.  Also see Accessorizer */}
                <div className="ui-duplicant-role">{role}</div>
            </Card>
        );
    }

    @autobind()
    private _onClick() {
        const {
            duplicantID,
            onClick
        } = this.props;
        if (onClick) onClick(duplicantID);
    }
}
export default connect(mapStateToProps)(DuplicantPortrait);