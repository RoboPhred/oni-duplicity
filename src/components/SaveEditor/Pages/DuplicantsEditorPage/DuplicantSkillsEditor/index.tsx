
import * as React from "react";

import { GameObject } from "oni-save-parser";

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";


import {
    AttributeLevelBehavior,
    getBehavior,
    AttributeSaveLoadLevel
} from "../../../../../behaviors";
import { autobind } from "core-decorators";


export interface DuplicantSkillsEditorProps {
    minion: GameObject;
}

export default class DuplicantSkillsEditor extends React.Component<DuplicantSkillsEditorProps> {
    constructor(props: DuplicantSkillsEditorProps) {
        super(props);
    }

    render() {
        const levelBehavior = getBehavior(this.props.minion, AttributeLevelBehavior);
        if (!levelBehavior) {
            return <div>Error: No AttributeLevel behavior found for dup.</div>;
        }

        const attributeRows: React.ReactFragment[] = [];
        for (let attribute of levelBehavior.parsedData.saveLoadLevels) {
            attributeRows.push(
                <AttributeRow key={attribute.attributeId} attribute={attribute}/>
            );
        }

        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableRowColumn>Attribute</TableRowColumn>
                        <TableRowColumn>Level</TableRowColumn>
                        <TableRowColumn>Experience</TableRowColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {attributeRows}
                </TableBody>
            </Table>
        );
    }
}

interface AttributeRowProps {
    attribute: AttributeSaveLoadLevel;
}

class AttributeRow extends React.Component<AttributeRowProps> {
    render() {
        const {
            attribute
        } = this.props;
        return (
            <TableRow>
                <TableRowColumn>{attribute.attributeId}</TableRowColumn>
                <TableRowColumn><input type="number" value={attribute.level} onChange={this._levelChanged}/></TableRowColumn>
                <TableRowColumn><input type="number" value={attribute.experience} onChange={this._experienceChanged}/></TableRowColumn>
            </TableRow>
        );
    }

    @autobind()
    private _levelChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        let level = Number(value);
        if (isNaN(level)) {
            level = 0;
        }
        this.props.attribute.level = level;
        this.forceUpdate();
    }

    @autobind()
    private _experienceChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        let experience = Number(value);
        if (isNaN(experience)) {
            experience = 0;
        }
        this.props.attribute.experience = experience;
        this.forceUpdate();
    }
}