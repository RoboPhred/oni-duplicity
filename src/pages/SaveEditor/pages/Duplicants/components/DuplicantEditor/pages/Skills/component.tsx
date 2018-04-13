
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import { NumericInput } from "@blueprintjs/core";

import DuplicantSkillsProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";


type Props = DuplicantSkillsProps & StateProps & DispatchProps;
class DuplicantSkills extends React.Component<Props> {
    render() {
        const {
            className,
            skills
        } = this.props;

        const rows = skills.map(x => 
            <DuplicantSkillRow
                key={x.attributeId}
                id={x.attributeId}
                level={x.level}
                experience={x.experience}
                onChangeLevel={this._onChangeLevel}
                onChangeExperience={this._onChangeExperience}
        />);

        return (
            <div className={`fill-parent container-scroll ${className}`}>
                <table className="fill-parent pt-html-table pt-html-table-striped">
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Level</th>
                            <th>Experience</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }

    @autobind()
    private _onChangeLevel(id: string, level: number) {
        const {
            duplicantID,
            setLevel
        } = this.props;
        setLevel({duplicantID: duplicantID, skillId: id, level});
    }

    @autobind()
    private _onChangeExperience(id: string, experience: number) {
        const {
            duplicantID,
            setExperience
        } = this.props;
        setExperience({duplicantID: duplicantID, skillId: id, experience});
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DuplicantSkills);


interface DuplicantSkillRowProps {
    id: string;
    level: number;
    experience: number;
    onChangeLevel(id: string, level: number): void;
    onChangeExperience(id: string, level: number): void;
}

class DuplicantSkillRow extends React.Component<DuplicantSkillRowProps> {
    constructor(props: DuplicantSkillRowProps) {
        super(props);

        this.state = {
            editLevel: null,
            editExperience: null
        };
    }

    render() {
        const {
            id,
            level,
            experience
        } = this.props;

        return (
            <tr>
                <td>{id}</td>
                <td><NumericInput
                    value={level}
                    clampValueOnBlur={true}
                    min={0}
                    onValueChange={this._onLevelChange}
                /></td>
                <td><NumericInput
                    value={experience}
                    clampValueOnBlur={true}
                    min={0}
                    onValueChange={this._onExperienceChange}
                /></td>
            </tr>
        );
    }

    @autobind()
    private _onLevelChange(value: number) {
        value = Math.round(value);
        if (value < 0 || isNaN(value)) value = 0;
        this.props.onChangeLevel(this.props.id, value);
    }

    @autobind()
    private _onExperienceChange(value: number) {
        if (value < 0 || isNaN(value)) value = 0;
        this.props.onChangeExperience(this.props.id, value);
    }
}
