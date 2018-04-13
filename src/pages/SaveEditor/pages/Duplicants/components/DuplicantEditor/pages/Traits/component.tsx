
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";

import { MenuItem, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { MultiSelect, ItemRenderer, IItemRendererProps } from "@blueprintjs/select";

import DuplicantTraitsProps from "./props";
import mapStateToProps, { StateProps } from "./selectors";
import mapDispatchToProps, { DispatchProps } from "./dispatch";

import TRAITS from "./traits";


const TraitMultiSelect = MultiSelect.ofType<string>();

type Props = DuplicantTraitsProps & StateProps & DispatchProps;
class DuplicantTraits extends React.Component<Props> {
    render() {
        const {
            className,
            traits
        } = this.props;


        return (
            <div className={`fill-parent ${className}`}>
                <TraitMultiSelect
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

    @autobind()
    private _onTagSelected(tag: string) {
        const {
            duplicantID,
            traits,
            setTraits
        } = this.props;

        if (traits.indexOf(tag) !== -1) {
            return;
        }

        setTraits({ duplicantID, traitIDs: traits.concat(tag) });
    }

    @autobind()
    private _onTagRemoved(tag: string) {
        const {
            duplicantID,
            traits,
            setTraits
        } = this.props;

        const index = traits.indexOf(tag);
        if (index === -1) {
            return;
        }

        const newTraits = traits.slice();
        newTraits.splice(index, 1);

        setTraits({ duplicantID, traitIDs: newTraits });
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

        const {
            traits
        } = this.props;

        const isSelected = traits.indexOf(trait) !== -1;

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
export default connect(mapStateToProps, mapDispatchToProps)(DuplicantTraits);
