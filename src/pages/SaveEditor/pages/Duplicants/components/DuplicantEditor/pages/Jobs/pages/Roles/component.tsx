
import * as React from "react";
import { connect } from "react-redux";
import { NumericInput } from "@blueprintjs/core";
import { autobind } from "core-decorators";


import DuplicantJobsPageProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";


type Props = DuplicantJobsPageProps & StateProps;
class DuplicantJobsPage extends React.Component<Props> {
    render() {
        const {
            currentRole,
            targetRole,
            roles
        } = this.props;
        const rows = roles.map(x => (
            <JobRow key={x.name} jobID={x.name} mastery={x.mastery} experience={x.experience} setMastery={this._setMastery} setExperience={this._setExperience} />
        ));
        return (
            <div className={`ui-duplicant-jobs fill-parent container-scroll`}>
                <div className="layout-vertical">
                    <div className="layout-horizontal">
                        <div className="layout-item-fill">
                            Current Role: {currentRole}
                        </div>
                        <div className="layout-item-fill">
                            Target Role: {targetRole}
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

    @autobind()
    private _setMastery(jobID: string, mastery: boolean) {

    }

    @autobind()
    private _setExperience(jobID: string, experience: number) {

    }
}
export default connect(mapStateToProps)(DuplicantJobsPage);


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