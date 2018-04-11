
import * as React from "react";
import { GameObject } from "oni-save-parser";

import { Card } from "@blueprintjs/core";
import { autobind } from "core-decorators";
import { getBehavior, MinionIdentityBehavior, MinionResumeBehavior } from "../../../../utils";

export interface DuplicantPortraitProps {
    minion: GameObject;
    onClick?(minion: GameObject): void;
}


const style_portrait: React.CSSProperties = {
    width: 150,
    height: 150,
    margin: 10,
    cursor: "pointer"
};

const style_portrait_title: React.CSSProperties = {
    textAlign: "center"
};

const style_portrait_role: React.CSSProperties = {
    textAlign: "center"
};

export default class DuplicantPortrait extends React.Component<DuplicantPortraitProps> {
    render() {
        const {
            minion
        } = this.props;

        // TODO: Get these from a selector.
        //  Trouble is, we do not have a unique key to ID these guys off of.  Everything
        //  is in a game behavior, and that's an array we need to scan through.
        const identity = getBehavior(minion, MinionIdentityBehavior);
        const name = identity ? identity.parsedData.name : "<NO-IDENTITY>";
        const resume = getBehavior(minion, MinionResumeBehavior);
        const role = resume ? resume.parsedData.currentRole : "<NO-ROLE>";

        return (
            <Card interactive={true} style={style_portrait} onClick={this._onClick}>
                <h5 style={style_portrait_title}>{name}</h5>
                {/* TODO render a picture.  Plenty of data in identity to do so.  Also see Accessorizer */}
                <div style={style_portrait_role}>{role}</div>
            </Card>
        );
    }

    @autobind()
    private _onClick() {
        const {
            minion,
            onClick
        } = this.props;
        if (onClick) onClick(minion);
    }
}