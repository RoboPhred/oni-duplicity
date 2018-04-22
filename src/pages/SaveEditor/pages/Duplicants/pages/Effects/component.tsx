
import * as React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { AI_EFFECT_IDS, AIEffectsBehavior } from "oni-save-parser";

import { NumericInput, MenuItem, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Select, IItemRendererProps } from "@blueprintjs/select";
const StringSelect = Select.ofType<string>();

import { GameObjectModel } from "@/services/save-editor";


export interface DuplicantEffectsProps {
    duplicant: GameObjectModel
};


type Props = DuplicantEffectsProps;
@observer
class DuplicantEffects extends React.Component<Props> {
    render() {
        const { duplicant } = this.props;

        const effectsBehavior = duplicant.getBehavior(AIEffectsBehavior);
        if (!effectsBehavior) return <div>Error: No AIEffectsBehavior found.</div>;
        const effects = effectsBehavior.templateData.saveLoadEffects;

        const rows = effects.map(x =>
            <DuplicantEffectRow
                key={x.id}
                id={x.id}
                timeRemaining={x.timeRemaining}
                onChangeTime={this._onEffectChangeTime}
                onRemove={this._onEffectRemoved}
            />
        );

        return (
            <div className={`ui-duplicant-effects fill-parent layout-vertical`}>
                <div className="container-scroll layout-item-fill">
                    <table className="pt-html-table pt-html-table-striped fill-parent-width">
                        <thead>
                            <tr>
                                <th>Effect</th>
                                <th>Time Remaining (ms)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                <div>
                    <StringSelect
                        items={AI_EFFECT_IDS}
                        itemPredicate={this._filterItem}
                        itemRenderer={this._renderItem}
                        onItemSelect={this._onEffectSelected}
                        filterable={true}
                        resetOnClose={true}
                        resetOnSelect={true}
                        popoverProps={{ minimal: true }}
                    >
                        <Button rightIcon="caret-down" text="Add a new Effect" />
                    </StringSelect>
                </div>
            </div>
        )
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
    private _onEffectSelected(effectID: string) {
        const { duplicant } = this.props;
        const effectsBehavior = duplicant.getBehavior(AIEffectsBehavior);
        if (!effectsBehavior) return;
        const effects = effectsBehavior.templateData.saveLoadEffects;

        if (effects.findIndex(x => x.id === effectID) !== -1) return;

        effects.push({
            id: effectID,
            timeRemaining: 5000
        });
    }

    @action.bound
    private _onEffectChangeTime(effectID: string, timeRemaining: number) {
        const { duplicant } = this.props;
        const effectsBehavior = duplicant.getBehavior(AIEffectsBehavior);
        if (!effectsBehavior) return;
        const effects = effectsBehavior.templateData.saveLoadEffects;

        const effect = effects.find(x => x.id === effectID);
        if (!effect) return;

        effect.timeRemaining = timeRemaining;
    }

    @action.bound
    private _onEffectRemoved(effectID: string) {
        const { duplicant } = this.props;
        const effectsBehavior = duplicant.getBehavior(AIEffectsBehavior);
        if (!effectsBehavior) return;
        const effects = effectsBehavior.templateData.saveLoadEffects;

        const index = effects.findIndex(x => x.id === effectID);
        if (index === -1) return;
        effects.splice(index, 1);
    }
}
export default DuplicantEffects;


interface DuplicantEffectRowProps {
    id: string;
    timeRemaining: number;
    onChangeTime(id: string, timeRemaining: number): void;
    onRemove(id: string): void;
}

class DuplicantEffectRow extends React.Component<DuplicantEffectRowProps> {
    constructor(props: DuplicantEffectRowProps) {
        super(props);
    }

    render() {
        const {
            id,
            timeRemaining
        } = this.props;

        return (
            <tr>
                <td>{id}</td>
                <td>
                    <NumericInput
                        value={timeRemaining}
                        clampValueOnBlur={true}
                        min={0}
                        onValueChange={this._onTimeRemainingChange}
                    />
                </td>
                <td>
                    <Button icon={IconNames.SMALL_CROSS} onClick={this._onRemove} />
                </td>
            </tr>
        );
    }

    @autobind()
    private _onTimeRemainingChange(value: number) {
        const {
            id,
            onChangeTime
        } = this.props;

        if (value < 0 || isNaN(value)) {
            value = 0;
        }

        onChangeTime(id, value);
    }

    @autobind()
    private _onRemove() {
        const {
            id,
            onRemove
        } = this.props;
        onRemove(id);
    }
}
