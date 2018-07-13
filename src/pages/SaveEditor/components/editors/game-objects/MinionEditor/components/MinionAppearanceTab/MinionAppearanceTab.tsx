import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import {
  ACCESSORIES_BY_TYPE,
  ACCESSORY_TYPES,
  MINION_IDENTITY_GENDERS,
  AccessoryType
} from "oni-save-parser";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import FormGroup from "@/components/FormGroup";
import NullableInput, {
  InputCompatibleProps
} from "@/components/NullableInput";
import TextInput from "@/components/TextInput";
import EditModeCondition from "@/components/EditModeCondition";
import Text from "@/components/Text";
import TextAutocompleteInput from "@/components/TextAutocompleteInput";
import { Option } from "@/components/Select";
import NumericInput from "@/components/NumericInput";
import SelectInput from "@/components/SelectInput";

const TDText = Text.withComponent("td");

const NoAccessory = <Text intent={Intent.Secondary}>None</Text>;
const NoAccessoryMouth = <Text intent={Intent.Dangerous}>I Must Scream</Text>;

type Props = StateProps & DispatchProps;
class MinionAppearanceTab extends React.Component<Props> {
  render() {
    const { gender, onSetGender, scale } = this.props;

    const fields = ACCESSORY_TYPES.map(type =>
      this._renderAccessoryField(type)
    );

    const genderOpts: Option[] = MINION_IDENTITY_GENDERS.map(ident => ({
      label: ident,
      value: ident
    }));

    return (
      <React.Fragment>
        <FormGroup label="Gender">
          <SelectInput
            value={gender || MINION_IDENTITY_GENDERS[0]}
            options={genderOpts}
            onCommit={onSetGender}
          />
        </FormGroup>
        <FormGroup label="Appearance">
          <table>
            <tbody>{fields}</tbody>
          </table>
        </FormGroup>
        <FormGroup label="Scale">
          <FormGroup label="X">
            <NumericInput
              value={scale ? scale.x : 1}
              precision="single"
              onCommit={this._setScaleX}
            />
          </FormGroup>
          <FormGroup label="Y">
            <NumericInput
              value={scale ? scale.y : 1}
              precision="single"
              onCommit={this._setScaleY}
            />
          </FormGroup>
        </FormGroup>
      </React.Fragment>
    );
  }

  @autobind()
  private _setScaleX(value: number) {
    const { scale, onSetScale } = this.props;
    onSetScale({
      x: value,
      y: scale ? scale.y : 1,
      z: scale ? scale.z : 1
    });
  }

  @autobind()
  private _setScaleY(value: number) {
    const { scale, onSetScale } = this.props;
    onSetScale({
      x: scale ? scale.x : 1,
      y: value,
      z: scale ? scale.z : 1
    });
  }

  private _renderAccessoryField(type: AccessoryType) {
    const { onSetAccessory } = this.props;
    let editGroup = (
      <tr key={type}>
        <TDText>{type}</TDText>
        <td>
          <NullableInput
            renderInput={props => this._renderAccessorySelector(type, props)}
            renderNull={type !== "mouth" ? NoAccessory : NoAccessoryMouth}
            value={this.props[type]}
            defaultValue={(ACCESSORIES_BY_TYPE[type] || [])[0] || ""}
            onCommit={onSetAccessory.bind(this, type)}
          />
        </td>
      </tr>
    );

    if (type === "hat_hair" || type === "hair_always") {
      editGroup = (
        <EditModeCondition key={type} editMode="advanced">
          {editGroup}
        </EditModeCondition>
      );
    }

    return editGroup;
  }

  private _renderAccessorySelector(
    type: AccessoryType,
    props: InputCompatibleProps<string>
  ) {
    const accessoryNames = ACCESSORIES_BY_TYPE[type];
    if (!accessoryNames || accessoryNames.length === 0) {
      return <TextInput {...props} minLength={1} />;
    } else {
      return (
        <TextAutocompleteInput
          value={props.value}
          items={accessoryNames}
          onCommit={props.onCommit}
        />
      );
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionAppearanceTab);
