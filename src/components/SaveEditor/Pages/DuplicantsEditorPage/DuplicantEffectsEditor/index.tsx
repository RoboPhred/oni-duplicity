
import * as React from "react";

import {
    autobind
} from "core-decorators";

import Select, { Option } from "react-select";

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";

import RaisedButton from "material-ui/RaisedButton";


import {
    GameObject
} from "oni-save-parser";

import {
    MinionEffectsBehavior,
    EffectInstance,
    getBehavior
} from "../../../../../behaviors";


const EFFECT_NAMES: string[] = [
    "UncomfortableSleep",
    "Sleep",
    "NarcolepticSleep",
    "RestfulSleep",
    "AnewHope",
    "Mourning",
    "DisturbedSleep",
    "NewCrewArrival",
    "UnderWater",
    "FullBladder",
    "StressfulyEmptyingBladder",
    "RedAlert",
    "MentalBreak",
    "CoolingDown",
    "WarmingUp",
    "Darkness",
    "SteppedInContaminatedWater",
    "WellFed",
    "StaleFood",
    "SmelledPutridOdour",
    "Vomiting",
    "DirtyHands",
    "Unclean",
    "LightWounds",
    "ModerateWounds",
    "SevereWounds",
    "WasAttacked",
    "SoreBack",
    "WarmAir",
    "ColdAir",
    "Hypothermia",
    "Hyperthermia"
];


const style_button: React.CSSProperties = {
    margin: "5px"
};

export interface DuplicantEffectsEditorProps {
    minion: GameObject
}

interface State {
    newEffectId: string | null;
    newEffectTimeRemaining: number;
    selectedRows: number[];
}

export default class DuplicantEffectsEditor extends React.Component<DuplicantEffectsEditorProps, State> {
    constructor(props: DuplicantEffectsEditorProps) {
        super(props);
        this.state = {
            newEffectId: null,
            newEffectTimeRemaining: 1000,
            selectedRows: []
        };
    }

    render() {
        // TODO: Rework this.  Whole thing is messy.

        const {
            minion
        } = this.props;
        const {
            newEffectId,
            newEffectTimeRemaining,
            selectedRows
        } = this.state;

        const effects = getBehavior(minion, MinionEffectsBehavior);
        if (!effects) {
            return <div>Error: No {MinionEffectsBehavior} behavior.</div>;
        }

        const rows = effects.parsedData.saveLoadEffects.map((effect, i) => (
            <TableRow key={effect.id} selected={selectedRows.indexOf(i) !== -1}>
                <EffectRowContent effect={effect} />
            </TableRow>
        ));

        return (
            <div className="fill-parent layout-vertical scrolling-content">
                <Table
                    className="layout-item"
                    selectable={true}
                    multiSelectable={true}
                    onRowSelection={this._onRowSelected}
                >
                    {/*
                        Tried to enable select all, but it seems broken.
                        Or I mucked up the state.  Either way, it re-selects-all and gets stuck on
                    */}
                    <TableHeader displaySelectAll={false} enableSelectAll={false}>
                        <TableRow>
                            <TableRowColumn>Effect</TableRowColumn>
                            <TableRowColumn>Remaining Time (ms)</TableRowColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={true} stripedRows={true} deselectOnClickaway={false}>
                        {rows}
                    </TableBody>
                </Table>
                <div>
                    <RaisedButton style={style_button} onClick={this._deleteSelectedRows}>Delete Selected</RaisedButton>
                    <Select
                        options={EFFECT_NAMES.map(x => ({ label: x, value: x }))}
                        value={newEffectId ? ({ label: newEffectId, value: newEffectId }) : undefined}
                        closeOnSelect={true}
                        placeholder="Add an Effect"
                        onChange={this._onNewEffectIdChange}
                    />
                    <input
                        type="number"
                        value={newEffectTimeRemaining}
                        min={0}
                        onChange={this._onNewEffectTimeRemainingChange}
                    />
                    <RaisedButton style={style_button} onClick={this._onAddEffectClick}>Add</RaisedButton>
                </div>
            </div>
        );
    }

    @autobind()
    private _onRowSelected(selectedRows: number[]) {
        this.setState(s => ({
            ...s,
            selectedRows
        }));
    }

    @autobind()
    private _deleteSelectedRows() {
        const {
            selectedRows
        } = this.state;
        const minion = this.props.minion;
        const behavior = getBehavior(minion, MinionEffectsBehavior);
        if (!behavior) {
            return;
        }
        const effects = behavior.parsedData.saveLoadEffects;

        selectedRows.sort().reverse();
        for(let index of selectedRows) {
            effects.splice(index, 1);
        }
        this.setState(s => ({
            ...s,
            selectedRows: []
        }));

        // Force update because instance data changed.
        this.forceUpdate();
    }

    @autobind()
    private _onNewEffectIdChange(_value: any) {
        const value = _value as Option;
        this.setState(s => ({
            ...s,
            newEffectId: value.value as string
        }));
    }

    @autobind()
    private _onNewEffectTimeRemainingChange(change: React.ChangeEvent<HTMLInputElement>) {
        let value = Number(change.target.value);
        if (value < 0) {
            value = 0;
        }

        this.setState(s => ({
            ...s,
            newEffectTimeRemaining: value
        }));
    }

    @autobind()
    private _onAddEffectClick() {
        const {
            minion
        } = this.props;
        const effects = getBehavior(minion, MinionEffectsBehavior);
        if (!effects) {
            return;
        }

        const saveLoadEffects = effects.parsedData.saveLoadEffects;

        const {
            newEffectId,
            newEffectTimeRemaining
        } = this.state;

        if (!newEffectId || saveLoadEffects.find(x => x.id === newEffectId)) {
            return;
        }

        saveLoadEffects.push({
            id: newEffectId,
            timeRemaining: newEffectTimeRemaining
        });

        this.setState(s => ({
            ...s,
            newEffectId: null,
            newEffectTimeRemaining: 1000
        }));

        // Even though the state should update it, force a reload
        this.forceUpdate();
    }
}

interface EffectRowProps {
    effect: EffectInstance;
}
class EffectRowContent extends React.Component<EffectRowProps> {
    render() {
        const {
            effect: {
                id,
                timeRemaining
            }
        } = this.props;

        return [
            <TableRowColumn>{id}</TableRowColumn>,
            <TableRowColumn>
                <input
                    type="number"
                    min={0}
                    value={timeRemaining}
                    onChange={this._onChange}
                />
            </TableRowColumn>
        ];
    }

    @autobind()
    private _onChange(change: React.ChangeEvent<HTMLInputElement>) {
        let value = Number(change.target.value);
        if (value < 0) {
            value = 0;
        }
        this.props.effect.timeRemaining = value;
        this.forceUpdate();
    }
}
