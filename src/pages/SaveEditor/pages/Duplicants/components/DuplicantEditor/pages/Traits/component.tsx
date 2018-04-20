
import * as React from "react";
import { action } from "mobx";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

import { MenuItem, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { MultiSelect, ItemRenderer, IItemRendererProps } from "@blueprintjs/select";
const TraitMultiSelect = MultiSelect.ofType<string>();

import { GameObjectModel } from "@/services/save-editor";

import TRAITS from "./traits";
import { AITraitsBehavior } from "oni-save-parser";

export interface DuplicantTraitsProps {
    duplicant: GameObjectModel;
};


type Props = DuplicantTraitsProps;
@observer
class DuplicantTraits extends React.Component<Props> {
    render() {
        const { duplicant } = this.props;

        const traitsBehavior = duplicant.getBehavior(AITraitsBehavior);
        if (!traitsBehavior) return <div>Error: Game object lacks a AITraitsBehavior.</div>;
        const traits = traitsBehavior.templateData.TraitIds;

        return (
            <div className={`fill-parent ui-duplicant-traits`}>
                <TraitMultiSelect
                    className="fill-parent-width"
                    items={TRAITS}
                    selectedItems={traits}
                    onItemSelect={this._onTagSelected}
                    itemPredicate={this._filterItem}
                    itemRenderer={this._renderItem}
                    tagRenderer={tag => tag}
                    tagInputProps={{ onRemove: this._onTagRemoved }}
                    noResults={<MenuItem disabled={true} text="No results." />}
                    popoverProps={{ minimal: true }}
                />
            </div>
        )
    }

    @action.bound
    private _onTagSelected(tag: string) {
        const { duplicant } = this.props;
        const traitsBehavior = duplicant.getBehavior(AITraitsBehavior);
        if (!traitsBehavior) return;
        const traits = traitsBehavior.templateData.TraitIds;

        if (traits.indexOf(tag) !== -1) {
            return;
        }

        traits.push(tag);
    }

    @autobind()
    private _onTagRemoved(tag: string) {
        const { duplicant } = this.props;
        const traitsBehavior = duplicant.getBehavior(AITraitsBehavior);
        if (!traitsBehavior) return;
        const traits = traitsBehavior.templateData.TraitIds;

        const index = traits.indexOf(tag);
        if (index === -1) return;

        traits.splice(index, 1);
    }

    private _filterItem(query: string, trait: string) {
        return trait.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    }

    @autobind()
    private _renderItem(trait: string, itemProps: IItemRendererProps) {
        const {
            modifiers,
            handleClick
        } = itemProps;

        if (!modifiers.matchesPredicate) {
            return null;
        }

        let isSelected = false;
        
        // TODO: Ensure that mobx is caching this stuff, as this is called for every item.
        const traitsBehavior = this.props.duplicant.getBehavior(AITraitsBehavior);
        if (traitsBehavior) {
            const traits = traitsBehavior.templateData.TraitIds;
            isSelected = traits.indexOf(trait) !== -1;
        }

        return (
            <MenuItem
                active={modifiers.active}
                icon={isSelected ? IconNames.TICK : IconNames.BLANK}
                key={trait}
                onClick={handleClick}
                text={trait}
                shouldDismissPopover={false}
            />
        );
    };

}
export default DuplicantTraits;
