
import * as React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

import { NumericInput, Button, MenuItem } from "@blueprintjs/core";
import { Select, IItemRendererProps } from "@blueprintjs/select";
const StringSelect = Select.ofType<string>();

import { GameObjectModel } from "@/services/save-editor";
import { MinionResumeBehavior } from "oni-save-parser";

import "./style.scss";

export interface DuplicantJobsPageProps {
    duplicant: GameObjectModel;
}

type Props = DuplicantJobsPageProps;
@observer
class DuplicantRolesPage extends React.Component<Props> {
    render() {
        const { duplicant } = this.props;

        const resumeBehavior = duplicant.getBehavior(MinionResumeBehavior);
        if (!resumeBehavior) return <div>Error: GameObject lacks a MinionResumeBehavior.</div>;

        const {
            currentRole,
            targetRole,
            ExperienceByRoleID,
            MasteryByRoleID
        } = resumeBehavior.templateData;

        if (!ExperienceByRoleID || !MasteryByRoleID || !currentRole) {
            return <div>Error: Empty MinionResume behavior data.</div>;
        }

        // Might want to make a constant for this, but this is better for future compatibility.
        const knownRoles = Array.from(ExperienceByRoleID.keys());

        const rows = knownRoles.map(x => {
            const experience = ExperienceByRoleID.get(x) || 0;
            const mastery = MasteryByRoleID.get(x) || false;
            return <RoleRow key={x} roleID={x} mastery={mastery} experience={experience} setMastery={this._setMastery} setExperience={this._setExperience} />
        });

        return (
            <div className={`ui-duplicant-roles fill-parent container-scroll`}>
                <div className="layout-vertical">
                    <div className="layout-horizontal">
                        <div className="ui-current-role pt-form-group pt-inline">
                            <label className="pt-label">
                                Current Role
                            </label>
                            <div className="pt-form-content">
                                <StringSelect
                                    items={knownRoles}
                                    itemPredicate={this._filterItem}
                                    itemRenderer={this._renderItem}
                                    onItemSelect={this._onCurrentRoleSelected}
                                    filterable={true}
                                    resetOnClose={true}
                                    resetOnSelect={true}
                                    popoverProps={{ minimal: true }}
                                >
                                    <Button rightIcon="caret-down" text={currentRole || "[Unknown]"} />
                                </StringSelect>
                            </div>
                        </div>
                        <div className="ui-target-role pt-form-group pt-inline">
                            <label className="pt-label">
                                Target Role
                            </label>
                            <div className="pt-form-content">
                                <StringSelect
                                    items={knownRoles}
                                    itemPredicate={this._filterItem}
                                    itemRenderer={this._renderItem}
                                    onItemSelect={this._onTargetRoleSelected}
                                    filterable={true}
                                    resetOnClose={true}
                                    resetOnSelect={true}
                                    popoverProps={{ minimal: true }}
                                >
                                    <Button rightIcon="caret-down" text={targetRole || "[Unknown]"} />
                                </StringSelect>
                            </div>
                        </div>
                    </div>
                    <table className="pt-html-table pt-html-table-striped fill-parent-width layout-item">
                        <thead>
                            <tr>
                                <th>Job Name</th>
                                <th>Mastery</th>
                                <th>Experience</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private _filterItem(query: string, item: string) {
        return item.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    }

    @autobind()
    private _renderItem(effect: string, itemProps: IItemRendererProps) {
        const {
            modifiers,
            handleClick
        } = itemProps;

        if (!modifiers.matchesPredicate) {
            return null;
        }

        return (
            <MenuItem
                active={modifiers.active}
                key={effect}
                onClick={handleClick}
                text={effect}
            />
        );
    };

    @action.bound
    private _onCurrentRoleSelected(roleID: string) {
        const { duplicant } = this.props;
        const resumeBehavior = duplicant.getBehavior(MinionResumeBehavior);
        if (!resumeBehavior) return;
        resumeBehavior.templateData.currentRole = roleID;
    }

    @action.bound
    private _onTargetRoleSelected(roleID: string) {
        const { duplicant } = this.props;
        const resumeBehavior = duplicant.getBehavior(MinionResumeBehavior);
        if (!resumeBehavior) return;
        resumeBehavior.templateData.targetRole = roleID;
    }

    @action.bound
    private _setMastery(roleID: string, mastery: boolean) {
        const { duplicant } = this.props;
        const resumeBehavior = duplicant.getBehavior(MinionResumeBehavior);
        if (!resumeBehavior) return;
        resumeBehavior.templateData.MasteryByRoleID!.set(roleID, mastery);
    }

    @action.bound
    private _setExperience(roleID: string, experience: number) {
        const { duplicant } = this.props;
        const resumeBehavior = duplicant.getBehavior(MinionResumeBehavior);
        if (!resumeBehavior) return;
        resumeBehavior.templateData.ExperienceByRoleID!.set(roleID, experience);
    }
}
export default DuplicantRolesPage;


interface JobRowProps {
    roleID: string;
    mastery: boolean;
    experience: number;
    setMastery(roleID: string, mastery: boolean): void;
    setExperience(roleID: string, experience: number): void;
}
class RoleRow extends React.Component<JobRowProps> {
    render() {
        const {
            roleID,
            mastery,
            experience
        } = this.props;

        return (
            <tr>
                <td>{roleID}</td>
                <td>
                    <label className="pt-control pt-checkbox">
                        <input type="checkbox" checked={mastery} onChange={this._onSetMastery} />
                        <span className="pt-control-indicator"></span>
                    </label>
                </td>
                <td>
                    <NumericInput
                        value={experience}
                        clampValueOnBlur={true}
                        min={0}
                        onValueChange={this._onSetExperience}
                    />
                </td>
            </tr>
        );
    }

    @autobind()
    _onSetMastery(change: React.ChangeEvent<HTMLInputElement>) {
        const checked = change.target.checked;
        const {
            roleID,
            setMastery
        } = this.props;
        setMastery(roleID, checked);
    }

    @autobind()
    private _onSetExperience(value: number) {
        if (value < 0) {
            value = 0;
        }

        const {
            roleID,
            setExperience
        } = this.props;
        setExperience(roleID, value);
    }
}