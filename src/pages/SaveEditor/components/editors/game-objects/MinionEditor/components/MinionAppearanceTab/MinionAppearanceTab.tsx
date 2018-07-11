import * as React from "react";
import { connect } from "react-redux";

import { AccessoryType, ACCESSORY_TYPES } from "oni-save-parser";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import FormGroup from "@/components/FormGroup";

import NumericInput from "@/components/NumericInput";

export interface MinionAppearanceTabProps {
  gameObjectPath: string[];
}

type Props = MinionAppearanceTabProps & StateProps & DispatchProps;
class MinionAppearanceTab extends React.Component<Props> {
  render() {
    const fields = ACCESSORY_TYPES.map(type =>
      this._renderAccessoryField(type)
    );
    return <React.Fragment>{fields}</React.Fragment>;
  }

  private _renderAccessoryField(type: AccessoryType) {
    // FIXME: Code smell: pulling in a state prop just to pass to dispatch.
    const { onSetAccessory, selectedPath } = this.props;
    return (
      <FormGroup>
        <FormGroup.Label>{type}</FormGroup.Label>
        <FormGroup.Content>
          <NumericInput
            value={this.props[type]}
            minValue={1}
            onCommit={onSetAccessory.bind(this, selectedPath, type)}
          />
        </FormGroup.Content>
      </FormGroup>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionAppearanceTab);
