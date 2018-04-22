
import * as React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { HEALTH_STATE_NAMES, MINION_IDENTITY_GENDERS, MinionGender, HealthBehavior, MinionIdentityBehavior } from "oni-save-parser";

import { Button, MenuItem, NumericInput } from "@blueprintjs/core";
import { Select, IItemRendererProps } from "@blueprintjs/select";

const GenderSelect = Select.ofType<MinionGender>();
const StringSelect = Select.ofType<string>();
const NumberSelect = Select.ofType<number>();

import { GameObjectModel } from "@/services/save-editor";


export interface DuplicantGeneralProps {
    duplicant: GameObjectModel;
};


// We only care about > 0
const MIN_SCALE = Number.EPSILON;

type Props = DuplicantGeneralProps;
@observer
class DuplicantGeneralPage extends React.Component<Props> {
    render() {
        const { duplicant } = this.props;

        const scaleX = duplicant.scale.x;
        const scaleY = duplicant.scale.y;

        const healthBehavior = duplicant.getBehavior(HealthBehavior);
        if (!healthBehavior) return <div>Error: HealthBehavior not found</div>;
        const healthState = healthBehavior.templateData.State;

        const identityBehavior = duplicant.getBehavior(MinionIdentityBehavior);
        if (!identityBehavior) return <div>Error: MinionIdentityBehavior not found</div>;
        const {
            gender,
            voiceIdx
        } = identityBehavior.templateData;

        let healthStateStr: string;
        if (healthState != null && healthState >= 0 && healthState < HEALTH_STATE_NAMES.length) {
            healthStateStr = HEALTH_STATE_NAMES[healthState];
        }
        else {
            healthStateStr = `<Unknown Health State ${healthState}>`;
        }

        return (
            <div className="fill-parent">
                <div className="pt-form-group pt-inline">
                    <label className="pt-label">
                        Gender
                    </label>
                    <div className="pt-form-content">
                        <GenderSelect
                            // TODO: Export from oni-save-parser
                            items={MINION_IDENTITY_GENDERS}
                            itemRenderer={this._renderItem}
                            onItemSelect={this._onGenderSelected}
                            filterable={false}
                            resetOnClose={true}
                            resetOnSelect={true}
                            popoverProps={{ minimal: true }}
                        >
                            <Button rightIcon="caret-down" text={gender || "MALE"} />
                        </GenderSelect>
                    </div>
                </div>
                <div className="pt-form-group pt-inline">
                    <label className="pt-label">
                        Voice
                    </label>
                    <div className="pt-form-content">
                        <NumberSelect
                            // TODO: get from oni-save-parser
                            items={[0, 1, 2, 3, 4]}
                            itemRenderer={this._renderItem}
                            onItemSelect={this._onVoiceSelected}
                            filterable={false}
                            resetOnClose={true}
                            resetOnSelect={true}
                            popoverProps={{ minimal: true }}
                        >
                            <Button rightIcon="caret-down" text={`Voice ${voiceIdx || 0}`} />
                        </NumberSelect>
                    </div>
                </div>
                <div className="pt-form-group pt-inline">
                    <label className="pt-label">
                        Scale
                    </label>
                    <div className="pt-form-content">
                        <div className="pt-input-group">
                            <span>Horizontal</span>
                            <NumericInput min={MIN_SCALE} clampValueOnBlur={true} value={scaleX} onValueChange={this._onScaleX} />
                        </div>
                        <div className="pt-input-group">
                            <span>Vertical</span>
                            <NumericInput min={MIN_SCALE} clampValueOnBlur={true} value={scaleY} onValueChange={this._onScaleY} />
                        </div>
                    </div>
                </div>
                <div className="pt-form-group pt-inline">
                    <label className="pt-label">
                        Health State
                    </label>
                    <div className="pt-form-content">
                        <StringSelect
                            items={HEALTH_STATE_NAMES}
                            itemRenderer={this._renderItem}
                            onItemSelect={this._onHealthStateSelected}
                            filterable={false}
                            resetOnClose={true}
                            resetOnSelect={true}
                            popoverProps={{ minimal: true }}
                        >
                            <Button rightIcon="caret-down" text={healthStateStr} />
                        </StringSelect>
                        <div className="pt-form-helper-text">The duplicant's current overall health condition.</div>
                    </div>
                </div>
            </div>
        );
    }

    @autobind()
    private _renderItem(effect: string | number, itemProps: IItemRendererProps) {
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
    private _onHealthStateSelected(healthState: string) {
        const { duplicant } = this.props;

        const healthBehavior = duplicant.getBehavior(HealthBehavior);
        if (!healthBehavior) return;

        // Need to get the enum value of the display text.
        const stateIndex = HEALTH_STATE_NAMES.indexOf(healthState);
        if (stateIndex === -1) {
            return;
        }

        healthBehavior.templateData.State = stateIndex;
    }

    @action.bound
    private _onGenderSelected(gender: MinionGender) {
        const { duplicant } = this.props;
        const identityBehavior = duplicant.getBehavior(MinionIdentityBehavior);
        if (!identityBehavior) return;
        identityBehavior.templateData.gender = gender;
        identityBehavior.templateData.genderStringKey = gender;
    }

    @action.bound
    private _onVoiceSelected(voiceIdx: number) {
        const { duplicant } = this.props;
        const identityBehavior = duplicant.getBehavior(MinionIdentityBehavior);
        if (!identityBehavior) return;
        identityBehavior.templateData.voiceIdx = voiceIdx;
    }

    @action.bound
    private _onScaleX(value: number) {
        const { duplicant } = this.props;

        // Negative numbers dont render; probably because sprite normal faces
        //  away from game camera.
        if (value === 0 || isNaN(value)) {
            value = 1;
        }

        duplicant.scale.x = value;
    }

    @action.bound
    private _onScaleY(value: number) {
        const { duplicant } = this.props;

        // Negative numbers dont render; probably because sprite normal faces
        //  away from game camera.
        if (value === 0 || isNaN(value)) {
            value = 1;
        }

        duplicant.scale.y = value;
    }
}
export default DuplicantGeneralPage;
