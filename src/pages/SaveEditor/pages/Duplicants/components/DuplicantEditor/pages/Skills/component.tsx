
import * as React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

import { NumericInput } from "@blueprintjs/core";

import { GameObjectModel } from "@/services/save-editor";
import { AIAttributeLevelsBehavior } from "oni-save-parser";

export interface DuplicantSkillsProps {
    duplicant: GameObjectModel;
};


type Props = DuplicantSkillsProps;
@observer
class DuplicantSkills extends React.Component<Props> {
    render() {
        const { duplicant } = this.props;

        const skillsBehavior = duplicant.getBehavior(AIAttributeLevelsBehavior);
        if (!skillsBehavior) return <div>Error: Game object lacks a AIAttributeLevelsBehavior behavior.</div>;
        const skills = skillsBehavior.templateData.saveLoadLevels;

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
            <div className={`ui-duplicant-skills fill-parent container-scroll`}>
                <table className="pt-html-table pt-html-table-striped">
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

    @action.bound
    private _onChangeLevel(id: string, level: number) {
        const { duplicant } = this.props;
        const skillsBehavior = duplicant.getBehavior(AIAttributeLevelsBehavior);
        if (!skillsBehavior) return;
        const skills = skillsBehavior.templateData.saveLoadLevels;
        const skill = skills.find(x => x.attributeId === id);
        if (!skill) return;
        skill.level = level;
    }

    @action.bound
    private _onChangeExperience(id: string, experience: number) {
        const { duplicant } = this.props;
        const skillsBehavior = duplicant.getBehavior(AIAttributeLevelsBehavior);
        if (!skillsBehavior) return;
        const skills = skillsBehavior.templateData.saveLoadLevels;
        const skill = skills.find(x => x.attributeId === id);
        if (!skill) return;
        skill.experience = experience;
    }
}
export default DuplicantSkills;


interface DuplicantSkillRowProps {
    id: string;
    level: number;
    experience: number;
    onChangeLevel(id: string, level: number): void;
    onChangeExperience(id: string, level: number): void;
}

class DuplicantSkillRow extends React.Component<DuplicantSkillRowProps> {
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
        const {
            id,
            onChangeLevel
        } = this.props;

        value = Math.round(value);
        if (value < 0 || isNaN(value)) {
            value = 0;
        }
        
        onChangeLevel(id, value);
    }

    @autobind()
    private _onExperienceChange(value: number) {
        const {
            id,
            onChangeExperience
        } = this.props;

        if (value < 0 || isNaN(value)) {
            value = 0;
        }

        onChangeExperience(id, value);
    }
}
