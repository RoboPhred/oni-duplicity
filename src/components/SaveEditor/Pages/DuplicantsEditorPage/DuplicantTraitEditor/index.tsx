
import * as React from "react";

import Select, { Option } from "react-select";
import { autobind } from "core-decorators";

import {
    GameObject
} from "oni-save-parser";

import {
    MinionTraitBehavior,
    getBehavior
} from "../../../../../behaviors";


const TRAITS: Option[] = [
    traitToOption("None"),
    traitToOption("Stinky"),
    traitToOption("Ellie"),
    traitToOption("Joshua"),
    traitToOption("Liam"),
    traitToOption("CantResearch"),
    traitToOption("CantBuild"),
    traitToOption("CantCook"),
    traitToOption("CantDig"),
    traitToOption("Hemophobia"),
    traitToOption("MedicalAid"),
    traitToOption("ScaredyCat"),
    traitToOption("MouthBreather"),
    traitToOption("CalorieBurner"),
    traitToOption("SmallBladder"),
    traitToOption("Anemic"),
    traitToOption("SlowLearner"),
    traitToOption("NoodleArms"),
    traitToOption("InteriorDecorator"),
    traitToOption("Regeneration"),
    traitToOption("DeeperDiversLungs"),
    traitToOption("SunnyDisposition"),
    traitToOption("RockCrusher"),
    traitToOption("Uncultured"),
    traitToOption("WeakImmuneSystem"),
    traitToOption("IrritableBowel"),
    traitToOption("Flatulence"),
    traitToOption("Snorer"),
    traitToOption("Narcolepsy"),
    traitToOption("Twinkletoes"),
    traitToOption("Greasemonkey"),
    traitToOption("Snorer"),
    traitToOption("MoleHands"),
    traitToOption("FastLearner"),
    traitToOption("DiversLung"),
    traitToOption("StrongArm"),
    traitToOption("IronGut"),
    traitToOption("StrongImmuneSystem"),
    traitToOption("BedsideManner"),
    traitToOption("StrongArm"),
    traitToOption("Caring"),
    traitToOption("Aggressive"),
    traitToOption("UglyCrier"),
    traitToOption("BingeEater"),
    traitToOption("StressVomiter"),
    traitToOption("EarlyBird"),
    traitToOption("NightOwl"),
    traitToOption("Claustrophobic"),
    traitToOption("PrefersWarmer"),
    traitToOption("PrefersColder"),
    traitToOption("SensitiveFeet"),
    traitToOption("Fashionable"),
    traitToOption("Climacophobic"),
    traitToOption("SolitarySleeper"),
    traitToOption("Workaholic"),
];

export interface DuplicantTraitEditorProps {
    minion: GameObject
};

export default class DuplicantTraitEditor extends React.Component<DuplicantTraitEditorProps> {
    
    render() {
        const {
            minion
        } = this.props;
        const behavior = getBehavior(minion, MinionTraitBehavior);
        if(!behavior) {
            return <div>Error: No {MinionTraitBehavior} behavior.</div>;
        }
        const traits = behavior.parsedData.TraitIds;
        const selectedTraits: Option[] = [];
        for(let trait of traits) {
            let value = TRAITS.find(x => x.value === trait);
            if (!value) {
                value = traitToOption(trait);
            }
            selectedTraits.push(value);
        }
        return (
            <div>
                <Select
                    closeOnSelect={false}
                    multi
                    onChange={this._handleSelectChange}
					options={TRAITS}
					placeholder="Duplicant Traits"
                    removeSelected={true}
					value={selectedTraits}
                />
            </div>
        );
    }
    
    @autobind()
    private _handleSelectChange(_values: any) {
        // Types are borked
        const values = _values as Option[];
        
        const {
            minion
        } = this.props;
        const behavior = getBehavior(minion, MinionTraitBehavior);
        if(!behavior) {
            return;
        }

        behavior.parsedData.TraitIds = values.map(x => x.label as string);
        this.forceUpdate();
    }
}

function traitToOption(trait: string, name?: string): Option {
    return {
        label: name || trait,
        value: trait
    };
}