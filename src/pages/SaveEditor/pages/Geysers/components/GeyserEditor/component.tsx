
import * as React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { GeyserBehavior, GEYSER_TYPE_NAMES, getGeyserTypeName, getGeyserTypeHash } from "oni-save-parser";
import { Button, MenuItem, NumericInput, Slider } from "@blueprintjs/core";
import { Select, IItemRendererProps } from "@blueprintjs/select";
const StringSelect = Select.ofType<string>();

import { GameObjectModel } from "@/services/save-editor";
import { typedKeys } from "@/utils";

import "./style.scss";

export interface GeyserEditorProps {
    className?: string;
    gameObject: GameObjectModel;
}
@observer
export default class GeyserEditor extends React.Component<GeyserEditorProps> {
    render() {
        const {
            className,
            gameObject
        } = this.props;

        const behavior = gameObject.getBehavior(GeyserBehavior);
        const config = behavior && behavior.templateData.configuration;
        if (!config) {
            return (
                <div>
                    This geyser has not been initialized, and cannot be edited.  Probably because it has not yet been discovered in-game.
                </div>
            );
        }

        const materialType = getGeyserTypeName(config.typeId.hash) || "[Unknown]";
        return (
            <div className={`layout-vertical ui-page-geyser-editor container-scroll ${className || ""}`}>
                <div className="pt-form-group pt-inline">
                    <label className="pt-label">
                        Type
                    </label>
                    <div className="pt-form-content">
                        <div className="pt-input-group">
                            <StringSelect
                                items={GEYSER_TYPE_NAMES}
                                itemRenderer={this._renderGeyserTypeItem}
                                itemPredicate={this._filterItem}
                                onItemSelect={this._onGeyserTypeSelect}
                                filterable={true}
                                popoverProps={{ minimal: true }}
                            >
                                <Button rightIcon="caret-down" text={materialType} />
                            </StringSelect>
                            <div className="pt-form-helper-text">
                                Geyser types are predefined in the game assembly, and determine the emitted element
                                and range of possible emit / idle / dormant times.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-form-group">
                    <div className="pt-form-helper-text ui-geyser-factor-explain">
                        The following factor values are percentages of the min/max value defined
                        by the geyser type.  Factors above 100% do not have an effect.
                    </div>
                    <label className="pt-label">Emit Rate Factor</label>
                    <div className="pt-form-content ui-slider-inset">
                        <Slider
                            value={config.rateRoll}
                            min={0}
                            max={1}
                            stepSize={0.001}
                            labelRenderer={this._percentageRenderer}
                            onChange={this._setRateRoll}
                        />
                        <div className="pt-form-helper-text">Mass per cycle</div>
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label">Active Cycle Length Factor</label>
                    <div className="pt-form-content ui-slider-inset">
                        <Slider
                            value={config.iterationLengthRoll}
                            min={0}
                            max={1}
                            stepSize={0.001}
                            labelRenderer={this._percentageRenderer}
                            onChange={this._setIterationLengthRoll}
                        />
                        <div className="pt-form-helper-text">The total length of the active (emit and idle) stage.</div>
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label">Active Emitting Percentage Factor</label>
                    <div className="pt-form-content ui-slider-inset">
                        <Slider
                            value={config.iterationPercentRoll}
                            min={0}
                            max={1}
                            stepSize={0.001}
                            labelRenderer={this._percentageRenderer}
                            onChange={this._setIterationPercentRoll}
                        />
                        <div className="pt-form-helper-text">The percentage of the active stage that is spent emitting material.</div>
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label">Lifecycle Length Factor</label>
                    <div className="pt-form-content ui-slider-inset">
                        <Slider
                            value={config.yearLengthRoll}
                            min={0}
                            max={1}
                            stepSize={0.001}
                            labelRenderer={this._percentageRenderer}
                            onChange={this._setYearLengthRoll}
                        />
                        <div className="pt-form-helper-text">The total length of its active/dormant cycle.</div>
                    </div>
                </div>
                <div className="pt-form-group">
                    <label className="pt-label">Lifecycle Active Percentage Factor</label>
                    <div className="pt-form-content ui-slider-inset">
                        <Slider
                            value={config.yearPercentRoll}
                            min={0}
                            max={1}
                            stepSize={0.001}
                            labelRenderer={this._percentageRenderer}
                            onChange={this._setYearPercentRoll}
                        />
                        <div className="pt-form-helper-text">The percentage of its lifecycle that is spent in an active (not dormant) state.</div>
                    </div>
                </div>
            </div>
        );
    }

    private _filterItem(query: string, value: string) {
        return value.indexOf(query) !== -1;
    }

    @action.bound
    private _onGeyserTypeSelect(typeName: string) {
        const { gameObject } = this.props;
        const behavior = gameObject.getBehavior(GeyserBehavior);
        const config = behavior && behavior.templateData.configuration;
        if (!config) return;
        const hash = getGeyserTypeHash(typeName);
        if (hash != null) config.typeId.hash = hash;
    }

    private _renderGeyserTypeItem(value: string, itemProps: IItemRendererProps) {
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
                key={value}
                onClick={handleClick}
                text={value}
            />
        );
    }

    private _percentageRenderer(value: number): string {
        return `${(value * 100).toFixed(1)}%`;
    }

    @action.bound
    private _setRateRoll(value: number) {
        const { gameObject } = this.props;
        const behavior = gameObject.getBehavior(GeyserBehavior);
        const config = behavior && behavior.templateData.configuration;
        if (!config) return;
        config.rateRoll = value;
    }

    @action.bound
    private _setIterationLengthRoll(value: number) {
        const { gameObject } = this.props;
        const behavior = gameObject.getBehavior(GeyserBehavior);
        const config = behavior && behavior.templateData.configuration;
        if (!config) return;
        config.iterationLengthRoll = value;
    }

    @action.bound
    private _setIterationPercentRoll(value: number) {
        const { gameObject } = this.props;
        const behavior = gameObject.getBehavior(GeyserBehavior);
        const config = behavior && behavior.templateData.configuration;
        if (!config) return;
        config.iterationPercentRoll = value;
    }

    @action.bound
    private _setYearLengthRoll(value: number) {
        const { gameObject } = this.props;
        const behavior = gameObject.getBehavior(GeyserBehavior);
        const config = behavior && behavior.templateData.configuration;
        if (!config) return;
        config.yearLengthRoll = value;
    }

    @action.bound
    private _setYearPercentRoll(value: number) {
        const { gameObject } = this.props;
        const behavior = gameObject.getBehavior(GeyserBehavior);
        const config = behavior && behavior.templateData.configuration;
        if (!config) return;
        config.yearPercentRoll = value;
    }
}
