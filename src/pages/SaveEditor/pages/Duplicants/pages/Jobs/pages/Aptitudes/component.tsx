
import * as React from "react";
import { NonIdealState  } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { action } from "mobx";

import {
    APTITUDE_NAMES,
    APTITUDE_HASH_NAMES,
    APTITUDE_NAME_HASHES,
    AptitudeName,
    MinionResumeBehavior
} from "oni-save-parser";

import { GameObjectModel, GameObjectBehaviorModel } from "@/services/save-editor";


// These are not saved, and probably are not functional yet.
const SKIP_APTITUDES = new Set(["Management", "Suits", "MedicalAid"]);

export interface AptitudePageProps {
    className?: string;
    duplicant: GameObjectModel;
}
@observer
export default class AptitudePage extends React.Component<AptitudePageProps> {
    render() {
        const {
            className,
            duplicant
        } = this.props;

        const behavior = duplicant.getBehavior(MinionResumeBehavior);
        if (!behavior) {
            return (
                <NonIdealState visual={IconNames.WARNING_SIGN}>
                    No resume behavior exists on this duplicant.  Jobs may not have been initialized.
                </NonIdealState>
            );
        }

        const rows = APTITUDE_NAMES.filter(x => !SKIP_APTITUDES.has(x)).map(name => (
            <AptitudeRow key={name} aptitudeID={name} interested={hasAptitude(behavior, name)} setInterest={this._setInterested} />
        ));

        return (
            <div className={`fill-parent container-scroll ${className || ""}`}>
                <table className="pt-html-table pt-html-table-striped fill-parent">
                    <thead>
                        <tr>
                            <th>Aptitude Type</th>
                            <th>Interested</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }

    @action.bound
    private _setInterested(aptitudeID: AptitudeName, interested: boolean) {
        const { duplicant } = this.props;
        const behavior = duplicant.getBehavior(MinionResumeBehavior);
        if (!behavior || !behavior.templateData || !behavior.templateData.AptitudeByRoleGroup) return;
        const aptitudes = behavior.templateData.AptitudeByRoleGroup;

        // This is dumb, but the keys of this are ONI HashStrings, which only save their key as a nested property.
        const hash = APTITUDE_NAME_HASHES[aptitudeID];
        if (hash == null) return false;
        for (let [key, value] of aptitudes.entries()) {
            if (key.hash === hash) {
                aptitudes.set(key, interested ? 1 : 0);
                return;
            }
        }
    }
}

interface AptitudeRowProps {
    aptitudeID: string;
    interested: boolean;
    setInterest(aptitudeID: string, interested: boolean): void;
}
class AptitudeRow extends React.Component<AptitudeRowProps> {
    render() {
        const {
            aptitudeID,
            interested
        } = this.props;
        return (
            <tr>
                <td>{aptitudeID}</td>
                <td>
                    <label className="pt-control pt-checkbox">
                        <input type="checkbox" checked={interested} onChange={this._onInterestChange} />
                        <span className="pt-control-indicator"></span>
                    </label>
                </td>
            </tr>
        );
    }

    @autobind()
    private _onInterestChange(change: React.ChangeEvent<HTMLInputElement>) {
        const {
            aptitudeID,
            setInterest
        } = this.props;
        setInterest(aptitudeID, change.target.checked);
    }
}

function hasAptitude(behavior: GameObjectBehaviorModel<MinionResumeBehavior>, aptitude: AptitudeName): boolean {
    if (!behavior.templateData || !behavior.templateData.AptitudeByRoleGroup) return false;

    const hash = APTITUDE_NAME_HASHES[aptitude];
    if (hash == null) return false;

    for (let [key, value] of behavior.templateData.AptitudeByRoleGroup.entries()) {
        if (key.hash === hash) return value > 0;
    }
    return false;
}
