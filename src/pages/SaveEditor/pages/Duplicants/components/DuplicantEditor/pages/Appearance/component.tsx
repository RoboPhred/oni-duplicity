
import * as React from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";

import { getAccessoryOfType, getIndexOfAccessoryType } from "oni-save-parser";

import { Button, MenuItem } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Select, IItemRendererProps } from "@blueprintjs/select";
const StringSelect = Select.ofType<string>();

import { GameObjectModel } from "@/services/save-editor";


import { 
    ACCESSORIZER_EYE_GUIDS,
    ACCESSORIZER_HAIR_GUIDS,
    ACCESSORIZER_HEAD_GUIDS,
    ACCESSORIZER_MOUTH_GUIDS,
    ACCESSORIZER_BODY_GUIDS,
    AccessorizerBehavior
} from "oni-save-parser";
import { action } from "mobx";


export interface DuplicantAccessoryPageProps {
    duplicant: GameObjectModel;
};

type Props = DuplicantAccessoryPageProps;
@observer
class DuplicantAccessoryPage extends React.Component<Props> {
    render() {
        const { duplicant } = this.props;
        const accessorizer = duplicant.getBehavior(AccessorizerBehavior);
        if (!accessorizer) return <div>Error: No AccessorizerBehavior found</div>;
        const accessories = accessorizer.templateData.accessories;

        const eyesAccessory = getAccessoryOfType(accessories, "eyes");
        const headAccessory = getAccessoryOfType(accessories, "headshape");
        const hairAccessory = getAccessoryOfType(accessories, "hair");
        const mouthAccessory = getAccessoryOfType(accessories, "mouth");
        const bodyAccessory = getAccessoryOfType(accessories, "body");

        const eyes = eyesAccessory ? eyesAccessory.guid.Guid : "[Error: Accessory Not Found]";
        const head = headAccessory ? headAccessory.guid.Guid : "[Error: Accessory Not Found]";
        const hair = hairAccessory ? hairAccessory.guid.Guid : "[Error: Accessory Not Found]";
        const mouth = mouthAccessory ? mouthAccessory.guid.Guid : "[Error: Accessory Not Found]";
        const body = bodyAccessory ? bodyAccessory.guid.Guid : "[Error: Accessory Not Found]";

        return (
            <div className={`ui-duplicant-accessories fill-parent layout-vertical container-scroll`}>
                <AppearanceGroup name="Eyes" value={eyes} accessories={ACCESSORIZER_EYE_GUIDS} onSet={this._setEyes}/>
                <AppearanceGroup name="Head" value={head} accessories={ACCESSORIZER_HEAD_GUIDS} onSet={this._setHead}/>
                <AppearanceGroup name="Hair" value={hair} accessories={ACCESSORIZER_HAIR_GUIDS} onSet={this._setHair}/>
                <AppearanceGroup name="Mouth" value={mouth} accessories={ACCESSORIZER_MOUTH_GUIDS} onSet={this._setMouth}/>
                <AppearanceGroup name="Body" value={body} accessories={ACCESSORIZER_BODY_GUIDS} onSet={this._setBody}/>
            </div>
        );
    }

    @action.bound
    private _setEyes(value: string) {
        const { duplicant } = this.props;
        const accessorizer = duplicant.getBehavior(AccessorizerBehavior);
        if (!accessorizer) return;
        const accessories = accessorizer.templateData.accessories;
        const index = getIndexOfAccessoryType(accessories, "eyes");
        if (index == -1) return;
        accessories[index].guid.Guid = value;
    }

    @action.bound
    private _setHead(value: string) {
        const { duplicant } = this.props;
        const accessorizer = duplicant.getBehavior(AccessorizerBehavior);
        if (!accessorizer) return;
        const accessories = accessorizer.templateData.accessories;
        const index = getIndexOfAccessoryType(accessories, "headshape");
        if (index == -1) return;
        accessories[index].guid.Guid = value;
    }

    @action.bound
    private _setHair(value: string) {
        const { duplicant } = this.props;
        const accessorizer = duplicant.getBehavior(AccessorizerBehavior);
        if (!accessorizer) return;
        const accessories = accessorizer.templateData.accessories;
        const index = getIndexOfAccessoryType(accessories, "hair");
        if (index == -1) return;
        accessories[index].guid.Guid = value;
    }

    @action.bound
    private _setMouth(value: string) {
        const { duplicant } = this.props;
        const accessorizer = duplicant.getBehavior(AccessorizerBehavior);
        if (!accessorizer) return;
        const accessories = accessorizer.templateData.accessories;
        const index = getIndexOfAccessoryType(accessories, "mouth");
        if (index == -1) return;
        accessories[index].guid.Guid = value;
    }

    @action.bound
    private _setBody(value: string) {
        const { duplicant } = this.props;
        const accessorizer = duplicant.getBehavior(AccessorizerBehavior);
        if (!accessorizer) return;
        const accessories = accessorizer.templateData.accessories;
        const index = getIndexOfAccessoryType(accessories, "body");
        if (index == -1) return;
        accessories[index].guid.Guid = value;
    }
}
export default DuplicantAccessoryPage;


interface AppearanceGroupProps {
    name: string;
    accessories: string[];
    value: string | null;
    onSet(accessoryID: string): void
}
class AppearanceGroup extends React.Component<AppearanceGroupProps> {
    render() {
        const {
            name,
            accessories,
            value
        } = this.props;
        return (
            <div className="pt-form-group pt-inline">
            <label className="pt-label">
                {name}
            </label>
            <div className="pt-form-content">
                <StringSelect
                    items={accessories}
                    itemRenderer={this._renderItem}
                    onItemSelect={this._onSet}
                    filterable={false}
                    resetOnClose={true}
                    resetOnSelect={true}
                    popoverProps={{ minimal: true }}
                >
                    <Button rightIcon="caret-down" text={value || "[Accessory not Found]"} />
                </StringSelect>
            </div>
        </div>
        );
    }

    @autobind()
    private _renderItem(accessoryID: string, itemProps: IItemRendererProps) {
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
                key={accessoryID}
                onClick={handleClick}
                text={accessoryID}
            />
        );
    };

    @autobind()
    private _onSet(accessoryID: string) {
        const { onSet } = this.props;
        onSet(accessoryID);
    }
}
