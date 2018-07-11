import * as React from "react";
import { connect } from "react-redux";

import { AccessoryType, ACCESSORY_TYPES } from "oni-save-parser";

import ACCESSORIES_BY_TYPE from "./accessories-by-type";

import { Intent } from "@/theme";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import FormGroup from "@/components/FormGroup";
import NullableInput, {
  InputCompatibleProps
} from "@/components/NullableInput";
import TextInput from "@/components/TextInput";
import EditModeCondition from "@/components/EditModeCondition";
import NumericField from "@/pages/SaveEditor/components/fields/NumericField";
import Text from "@/components/Text";
import TextAutocompleteInput from "@/components/TextAutocompleteInput";

export interface MinionAppearanceTabProps {
  gameObjectPath: string[];
}

const TDText = Text.withComponent("td");

const NoAccessory = <Text intent={Intent.Secondary}>None</Text>;
const NoAccessoryMouth = <Text intent={Intent.Dangerous}>I Must Scream</Text>;

type Props = MinionAppearanceTabProps & StateProps & DispatchProps;
class MinionAppearanceTab extends React.Component<Props> {
  render() {
    const { gameObjectPath } = this.props;
    const fields = ACCESSORY_TYPES.map(type =>
      this._renderAccessoryField(type)
    );
    return (
      <React.Fragment>
        <table>
          <tbody>{fields}</tbody>
        </table>
        <FormGroup>
          <FormGroup.Label>Scale</FormGroup.Label>
          <FormGroup.Content>
            <FormGroup>
              <FormGroup.Label>X</FormGroup.Label>
              <FormGroup.Content>
                <NumericField path={[...gameObjectPath, "scale", "x"]} />
              </FormGroup.Content>
            </FormGroup>
            <FormGroup>
              <FormGroup.Label>Y</FormGroup.Label>
              <FormGroup.Content>
                <NumericField path={[...gameObjectPath, "scale", "y"]} />
              </FormGroup.Content>
            </FormGroup>
          </FormGroup.Content>
        </FormGroup>
      </React.Fragment>
    );
  }

  private _renderAccessoryField(type: AccessoryType) {
    // FIXME: Code smell: pulling in a state prop just to pass to dispatch.
    const { onSetAccessory, selectedPath } = this.props;
    let editGroup = (
      <tr key={type}>
        <TDText>{type}</TDText>
        <td>
          <NullableInput
            renderInput={props => this._renderAccessorySelector(type, props)}
            renderNull={type !== "mouth" ? NoAccessory : NoAccessoryMouth}
            value={this.props[type]}
            defaultValue={(ACCESSORIES_BY_TYPE[type] || [])[0] || ""}
            onCommit={onSetAccessory.bind(this, selectedPath, type)}
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
