import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import {
  DuplicantContainer,
  Hair,
  Head,
  Eyes,
  Body
} from "react-oni-duplicant";

import {
  AccessoriesByType,
  AccessoryTypes,
  MINION_IDENTITY_GENDERS,
  AccessoryType
} from "oni-save-parser";

import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import Flex from "@/components/Flex";
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
    const {
      gender,
      onSetGender,
      scale,
      hair,
      body,
      eyes,
      headshape
    } = this.props;

    const fields = AccessoryTypes.map(type => this._renderAccessoryField(type));

    const genderOpts: Option[] = MINION_IDENTITY_GENDERS.map(ident => ({
      label: ident,
      value: ident
    }));

    const hairOrdinal = extractOrdinal(hair);
    const bodyOrdinal = extractOrdinal(body);
    const eyesOrdinal = extractOrdinal(eyes);
    const headOrdinal = extractOrdinal(headshape);

    return (
      <Flex direction="row">
        <div>
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
            <FormGroup label="X" inline>
              <NumericInput
                value={scale ? scale.x : 1}
                precision="single"
                onCommit={this._setScaleX}
              />
            </FormGroup>
            <FormGroup label="Y" inline>
              <NumericInput
                value={scale ? scale.y : 1}
                precision="single"
                onCommit={this._setScaleY}
              />
            </FormGroup>
          </FormGroup>
        </div>
        <div style={{ marginTop: 200, marginLeft: 100 }}>
          <DuplicantContainer>
            {bodyOrdinal && <Body ordinal={bodyOrdinal} />}
            {headOrdinal && <Head ordinal={headOrdinal} />}
            {eyesOrdinal && <Eyes ordinal={eyesOrdinal} />}
            {hairOrdinal && <Hair ordinal={hairOrdinal} />}
          </DuplicantContainer>
        </div>
      </Flex>
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
            defaultValue={(AccessoriesByType[type] || [])[0] || ""}
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
    const accessoryNames = AccessoriesByType[type];
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

function extractOrdinal(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const match = /[a-z]+_(\d)+/.exec(value);
  if (match) {
    return Number(match[1]);
  }
  return null;
}
