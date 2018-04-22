
import * as React from "react";
import { observer } from "mobx-react";

import { GameObjectModel } from "@/services/save-editor";

import { Card } from "@blueprintjs/core";
import { autobind } from "core-decorators";

import { error, FAILURE_TYPE } from "@/logging";
import { MinionIdentityBehavior, MinionResumeBehavior } from "oni-save-parser";

import "./style.scss";


export interface DuplicantPortraitProps {
    className?: string;
    duplicant: GameObjectModel;
    onClick?(duplicant: GameObjectModel): void;
}


type Props = DuplicantPortraitProps;
@observer
class DuplicantPortrait extends React.Component<Props> {
    render() {
        const {
            className,
            duplicant
        } = this.props;

        const identity = duplicant.getBehavior(MinionIdentityBehavior);
        const resume = duplicant.getBehavior(MinionResumeBehavior);

        let outerClassName = `ui-duplicant-portrait ${className}`;

        let name: string;
        let role: string;

        if (identity) {
            name = identity.templateData.name;
        }
        else {
            error("Duplicant not found or identity behavior missing.", FAILURE_TYPE.MISSING_BEHAVIOR);
            name = "[IDENTITY MISSING]";
        }

        if (resume && resume.templateData.currentRole) {
            role = resume.templateData.currentRole;
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
            duplicant,
            onClick
        } = this.props;
        if (onClick) onClick(duplicant);
    }
}
export default DuplicantPortrait;
