
import * as React from "react";
import { connect } from "react-redux";

import { GameObject } from "oni-save-parser";

import { Card } from "@blueprintjs/core";
import { autobind } from "core-decorators";
import { getBehavior, MinionIdentityBehavior, MinionResumeBehavior } from "../../../../../../services/save-editor/utils";


import DuplicantPortraitProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";


type Props = DuplicantPortraitProps & StateProps;
class DuplicantPortrait extends React.Component<Props> {
    render() {
        const {
            duplicant
        } = this.props;

        if (!duplicant) {
            return (
                <Card className="ui-duplicant-portrait">
                    <div>[dup not found]</div>
                </Card>
            )
        }

        // TODO: Get these from a selector.
        //  Trouble is, we do not have a unique key to ID these guys off of.  Everything
        //  is in a game behavior, and that's an array we need to scan through.
        const identity = getBehavior(duplicant, MinionIdentityBehavior);
        const name = identity ? identity.parsedData.name : "<NO-IDENTITY>";
        const resume = getBehavior(duplicant, MinionResumeBehavior);
        const role = resume ? resume.parsedData.currentRole : "<NO-ROLE>";

        return (
            <Card className="ui-duplicant-portrait" interactive={true} onClick={this._onClick}>
                <h5 className="ui-duplicant-portrait-name">{name}</h5>
                {/* TODO render a picture.  Plenty of data in identity to do so.  Also see Accessorizer */}
                <div className="ui-duplicant-portrait-role">{role}</div>
            </Card>
        );
    }

    @autobind()
    private _onClick() {
        const {
            duplicantKey,
            onClick
        } = this.props;
        if (onClick) onClick(duplicantKey);
    }
}
export default connect(mapStateToProps)(DuplicantPortrait);