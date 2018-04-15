
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import { NumericInput, MenuItem, Button } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Select, IItemRendererProps } from "@blueprintjs/select";
const StringSelect = Select.ofType<string>();


import EFFECTS from "./effects";


import DuplicantEffectsProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";


type Props = DuplicantEffectsProps & StateProps & DispatchProps;
class DuplicantEffects extends React.Component<Props> {
    render() {
        const {
            effects
        } = this.props;

        const rows = effects.map(x =>
            <DuplicantEffectRow
                key={x.id}
                id={x.id}
                timeRemaining={x.timeRemaining}
                onChangeTime={this._onEffectChangeTime}
                onRemove={this._onEffectRemoved}
            />);

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
                        items={EFFECTS}
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

    @autobind()
    private _onEffectSelected(effectID: string) {
        const {
            duplicantID,
            addEffect
        } = this.props;
        addEffect({ duplicantID, effectID, timeRemaining: 5000 });
    }

    @autobind()
    private _onEffectChangeTime(effectID: string, timeRemaining: number) {
        const {
            duplicantID,
            setEffectTime
        } = this.props;
        setEffectTime({ duplicantID, effectID, timeRemaining });
    }

    @autobind()
    private _onEffectRemoved(effectID: string) {
        const {
            duplicantID,
            removeEffect
        } = this.props;
        removeEffect({ duplicantID, effectID });
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DuplicantEffects);


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
