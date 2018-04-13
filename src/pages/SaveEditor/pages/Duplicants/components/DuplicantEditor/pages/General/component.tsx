
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import { Button, MenuItem, NumericInput } from "@blueprintjs/core";
import { Select, IItemRendererProps } from "@blueprintjs/select";
const StringSelect = Select.ofType<string>();


import DuplicantGeneralProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";


const HEALTH_STATE: string[] = [
    // The order of these is important!
    //  The value is stored in-game as an int32 enum,
    //  and the order of these correspond to the
    //  enum's integer value.
    "Perfect",
    "Alright",
    "Scuffed",
    "Injured",
    "Critical",
    "Incapacited",
    "Dead",
    "Invincible"
];


// We only care about > 0
const MIN_SCALE = Number.EPSILON;

type Props = DuplicantGeneralProps & StateProps & DispatchProps;
class DuplicantGeneralPage extends React.Component<Props> {
    render() {
        const {
            healthState,
            scale
        } = this.props;

        const scaleX = scale ? scale.x : 1;
        const scaleY = scale ? scale.y : 1;

        let healthStateStr: string;
        if (healthState != null && healthState >= 0 && healthState < HEALTH_STATE.length) {
            healthStateStr = HEALTH_STATE[healthState];
        }
        else {
            healthStateStr = `<Unknown Health State ${healthState}>`;
        }

        return (
            <div className="fill-parent">
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
                            <NumericInput min={MIN_SCALE} clampValueOnBlur={true} value={scaleY} onValueChange={this._onScaleY}/>
                        </div>
                    </div>
                </div>
                <div className="pt-form-group pt-inline">
                    <label className="pt-label">
                        Health State
                    </label>
                    <div className="pt-form-content">
                        <StringSelect
                            items={HEALTH_STATE}
                            itemRenderer={this._renderItem}
                            onItemSelect={this._onHealthStateSelected}
                            filterable={false}
                            resetOnClose={true}
                            resetOnSelect={true}
                            popoverProps={{ minimal: true }}
                        >
                            <Button rightIcon="caret-down" text={healthStateStr} />
                        </StringSelect>
                        <div className="pt-form-helper-text">State affects the duplicant's behavior, but not their health points.</div>
                    </div>
                </div>
            </div>
        );
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
    private _onHealthStateSelected(healthState: string) {
        const {
            duplicantID,
            setHealthState
        } = this.props;

        // Need to get the enum value of the display text.
        const stateIndex = HEALTH_STATE.indexOf(healthState);
        if (stateIndex === -1) {
            return;
        }

        setHealthState({ duplicantID, healthState: stateIndex });
    }

    @autobind()
    private _onScaleX(value: number) {
        const {
            duplicantID,
            setScale
        } = this.props;

        // Negative numbers dont render; probably because sprite normal faces
        //  away from game camera.
        if (value === 0 || isNaN(value)) {
            value = 1;
        }

        setScale({duplicantID, scaleX: value});
    }

    @autobind()
    private _onScaleY(value: number) {
        const {
            duplicantID,
            setScale
        } = this.props;

        // Negative numbers dont render; probably because sprite normal faces
        //  away from game camera.
        if (value <= 0 || isNaN(value)) {
            value = 1;
        }

        setScale({duplicantID, scaleY: value});
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DuplicantGeneralPage);
