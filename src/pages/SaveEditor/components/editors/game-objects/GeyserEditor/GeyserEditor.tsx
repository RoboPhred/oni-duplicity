import * as React from "react";
import { connect } from "react-redux";

import { GeyserTypeNames } from "oni-save-parser";

import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import EditorContainer from "../../components/EditorContainer";
import GameObjectHeader from "../components/GameObjectHeader";

import SelectInput from "@/components/SelectInput";
import NonIdealState from "@/components/NonIdealState";
import FormGroup from "@/components/FormGroup";

type Props = StateProps & DispatchProps;
class GeyserEditor extends React.Component<Props> {
  render() {
    const { geyserType, onGeyserTypeChanged } = this.props;

    if (geyserType == null) {
      return (
        <NonIdealState header="Unknown geyser type" intent={Intent.Dangerous}>
          The geyser type was not recognized.
        </NonIdealState>
      );
    }

    const options = GeyserTypeNames.map(x => ({
      label: x,
      value: x
    }));

    return (
      <EditorContainer header={<GameObjectHeader>Geyser</GameObjectHeader>}>
        <FormGroup inline label="Emission&nbsp;Type">
          <SelectInput
            options={options}
            value={geyserType}
            onCommit={onGeyserTypeChanged}
          />
        </FormGroup>
      </EditorContainer>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeyserEditor);
