import * as React from "react";
import { connect } from "react-redux";

import { GeyserTypeNames } from "oni-save-parser";

import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import EditorContainer from "../../components/EditorContainer";
import GameObjectHeader from "../components/GameObjectHeader";

import HelpText from "@/components/HelpText";
import SelectInput from "@/components/SelectInput";
import NonIdealState from "@/components/NonIdealState";
import FormGroup from "@/components/FormGroup";
import NumericInput from "@/components/NumericInput";

import NumericField from "@/pages/SaveEditor/components/fields/NumericField";

type Props = StateProps & DispatchProps;
class GeyserEditor extends React.Component<Props> {
  render() {
    const {
      geyserType,
      onGeyserTypeChanged,
      emissionRate,
      onEmissionRateChanged,
      yearLengthRoll,
      onYearLengthRollChanged,
      yearPercentRoll,
      onYearPercentRollChanged,
      iterationLengthRoll,
      onIterationLengthRollChanged,
      iterationPercentRoll,
      onIterationPercentRollChanged
    } = this.props;

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
        <HelpText>
          The following values are percentage decimals between 0 (0%) and 1
          (100%). They indicate what percentage of the min/max value to use for
          their values.<br />
          The values they represent are determined by the game on a
          per-geyser-type basis, and cannot be changed beyond this percentage
        </HelpText>
        <FormGroup label="Emission&nbsp;Rate">
          <HelpText>
            The percentage selecting the rate of element emission for the geyser
            when the geyser is active.
          </HelpText>
          <NumericInput
            minValue={0}
            maxValue={1}
            precision="single"
            value={emissionRate || 0}
            onCommit={onEmissionRateChanged}
          />
        </FormGroup>
        <FormGroup label="Lifecycle Percentages">
          <FormGroup label="Awake / Dormant">
            <FormGroup label="Total Time">
              <HelpText>
                The percentage selecting the total time period for a full awake
                / dormant cycle of the geyser.
              </HelpText>
              <NumericInput
                minValue={0}
                maxValue={1}
                precision="single"
                value={yearLengthRoll || 0}
                onCommit={onYearLengthRollChanged}
              />
            </FormGroup>
            <FormGroup label="Awake Fraction">
              <HelpText>
                The fraction of the total lifecycle time the geyser remains
                non-dormant.
              </HelpText>
              <NumericInput
                minValue={0}
                maxValue={1}
                precision="single"
                value={yearPercentRoll || 0}
                onCommit={onYearPercentRollChanged}
              />
            </FormGroup>
          </FormGroup>
        </FormGroup>
        <FormGroup label="Active / Idle">
          <FormGroup label="Cycle Time">
            <HelpText>
              The total length of time for the active and idle period to cycle.
            </HelpText>
            <NumericInput
              minValue={0}
              maxValue={1}
              precision="single"
              value={iterationLengthRoll || 0}
              onCommit={onIterationLengthRollChanged}
            />
          </FormGroup>
          <FormGroup label="Active Time">
            <HelpText>
              The fraction of the cycle time the geyser spends actively emitting
              material.
            </HelpText>
            <NumericInput
              minValue={0}
              maxValue={1}
              precision="single"
              value={iterationPercentRoll || 0}
              onCommit={onIterationPercentRollChanged}
            />
          </FormGroup>
        </FormGroup>
      </EditorContainer>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeyserEditor);
