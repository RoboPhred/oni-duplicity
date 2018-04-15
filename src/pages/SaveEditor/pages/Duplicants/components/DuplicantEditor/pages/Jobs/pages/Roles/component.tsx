
import * as React from "react";
import { connect } from "react-redux";
import { NumericInput, Button, MenuItem } from "@blueprintjs/core";
import { Select, IItemRendererProps } from "@blueprintjs/select";
const StringSelect = Select.ofType<string>();

import { autobind } from "core-decorators";


import DuplicantJobsPageProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";


type Props = DuplicantJobsPageProps & StateProps & DispatchProps;
class DuplicantJobsPage extends React.Component<Props> {
    render() {
        const {
            currentRole,
            targetRole,
            roles
        } = this.props;

        // Might want to make a constant for this, but this is better for future compatibility.
        const knownRoles = Array.from(new Set(roles.map(x => x.name)));

        const rows = roles.map(x => (
            <JobRow key={x.name} jobID={x.name} mastery={x.mastery} experience={x.experience} setMastery={this._setMastery} setExperience={this._setExperience} />
        ));

        return (
            <div className={`ui-duplicant-jobs fill-parent container-scroll`}>
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

    @autobind()
    private _onCurrentRoleSelected(roleID: string) {
        const {
            duplicantID,
            setCurrentRole
        } = this.props;
        setCurrentRole({ duplicantID, roleID });
    }

    @autobind()
    private _onTargetRoleSelected(roleID: string) {
        const {
            duplicantID,
            setTargetRole
        } = this.props;
        setTargetRole({ duplicantID, roleID });
    }

    @autobind()
    private _setMastery(roleID: string, mastery: boolean) {
        const {
            duplicantID,
            setMastery
        } = this.props;
        setMastery({ duplicantID, roleID, mastery });
    }

    @autobind()
    private _setExperience(roleID: string, experience: number) {
        const {
            duplicantID,
            setExperience
        } = this.props;
        setExperience({ duplicantID, roleID, experience });
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DuplicantJobsPage);


interface JobRowProps {
    jobID: string;
    mastery: boolean;
    experience: number;
    setMastery(jobID: string, mastery: boolean): void;
    setExperience(jobID: string, experience: number): void;
}
class JobRow extends React.Component<JobRowProps> {
    render() {
        const {
            jobID,
            mastery,
            experience
        } = this.props;

        return (
            <tr>
                <td>{jobID}</td>
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
            jobID,
            setMastery
        } = this.props;
        setMastery(jobID, checked);
    }

    @autobind()
    private _onSetExperience(value: number) {
        if (value < 0) {
            value = 0;
        }

        const {
            jobID,
            setExperience
        } = this.props;
        setExperience(jobID, value);
    }
}