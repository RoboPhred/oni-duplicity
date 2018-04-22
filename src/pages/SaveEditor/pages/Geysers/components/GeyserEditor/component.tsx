
import * as React from "react";
import { observer } from "mobx-react";
import { GeyserBehavior, GEYSER_TYPE_NAMES, getGeyserTypeName, getGeyserTypeHash } from "oni-save-parser";
import { Button, MenuItem } from "@blueprintjs/core";
import { Select, IItemRendererProps } from "@blueprintjs/select";
const StringSelect = Select.ofType<string>();

import { GameObjectModel } from "@/services/save-editor";
import { typedKeys } from "@/utils";
import { action } from "mobx";

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
            <div className={className || ""}>
                <StringSelect
                    items={GEYSER_TYPE_NAMES}
                    itemRenderer={this._renderMaterialItem}
                    itemPredicate={this._filterItem}
                    onItemSelect={this._onMaterialSelect}
                    filterable={true}
                    popoverProps={{ minimal: true }}
                >
                    <Button rightIcon="caret-down" text={materialType} />
                </StringSelect>
            </div>
        );
    }

    private _filterItem(query: string, value: string) {
        return value.indexOf(query) !== -1;
    }

    @action.bound
    private _onMaterialSelect(typeName: string) {
        const { gameObject } = this.props;
        const behavior = gameObject.getBehavior(GeyserBehavior);
        const config = behavior && behavior.templateData.configuration;
        if (!config) return;
        const hash = getGeyserTypeHash(typeName);
        if (hash != null) config.typeId.hash = hash;
    }

    private _renderMaterialItem(value: string, itemProps: IItemRendererProps) {
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
}
