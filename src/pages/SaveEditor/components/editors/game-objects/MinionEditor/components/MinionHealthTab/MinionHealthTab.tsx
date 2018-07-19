import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { HealthState } from "oni-save-parser";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import Text from "@/components/Text";
import VerticalTabs from "@/components/VerticalTabs";
import FormGroup from "@/components/FormGroup";
import SelectInput from "@/components/SelectInput";
import NumericInput from "@/components/NumericInput";

const TD = Text.withComponent("td");

type Props = StateProps & DispatchProps;
class MinionHealthTab extends React.Component<Props> {
  render() {
    const {
      healthState,
      onHealthStatusChanged,
      hitpoints,
      onHitpointsChanged,
      stamina,
      onStaminaChanged,
      calories,
      onCaloriesChanged,
      breath,
      onBreathChanged,
      stress,
      onStressChanged,
      bladder,
      onBladderChanged,
      surfaceDiseaseId,
      surfaceDiseaseCount,
      immuneLevel,
      onImmuneLevelChanged,
      foodPoisoning,
      onFoodPoisoningChanged,
      coldBrain,
      onColdBrainChanged,
      heatRash,
      onHeatRashChanged,
      slimeLung,
      onSlimeLungChanged,
      spores,
      onSporesChanged,
      sunburn,
      onSunburnChanged
    } = this.props;

    const options = Object.keys(HealthState)
      .filter(x => isNaN(parseInt(x)))
      .map(x => ({
        label: x,
        value: HealthState[x as any]
      }));

    // TODO: selector for disease type hashes with advanced mode custom
    // string.

    return (
      <React.Fragment>
        <div>
          <Text.H4>Wellness</Text.H4>
          <FormGroup label="Status" inline>
            <SelectInput
              value={healthState || HealthState.Perfect}
              options={options}
              onCommit={onHealthStatusChanged}
            />
          </FormGroup>
          <FormGroup label="HitPoints" inline>
            <NumericInput
              value={hitpoints || 0}
              onCommit={onHitpointsChanged}
              minValue={0}
            />
          </FormGroup>
          <FormGroup label="Stanima" inline>
            <NumericInput
              value={stamina || 0}
              precision="single"
              onCommit={onStaminaChanged}
              minValue={0}
            />
          </FormGroup>
          <FormGroup label="Calories" inline>
            <NumericInput
              value={calories || 0}
              precision="single"
              onCommit={onCaloriesChanged}
              minValue={0}
            />
          </FormGroup>
          <FormGroup label="Oxygen" inline>
            <NumericInput
              value={breath || 0}
              precision="single"
              onCommit={onBreathChanged}
              minValue={0}
            />
          </FormGroup>
          <FormGroup label="Stress" inline>
            <NumericInput
              value={stress || 0}
              precision="single"
              onCommit={onStressChanged}
              minValue={0}
            />
          </FormGroup>
          <FormGroup label="Bladder" inline>
            <NumericInput
              value={bladder || 0}
              precision="single"
              onCommit={onBladderChanged}
              minValue={0}
            />
          </FormGroup>
        </div>
        <div>
          <Text.H4>Diseases</Text.H4>
          <FormGroup label="Immune&nbsp;Level" inline>
            <NumericInput
              minValue={0}
              precision="single"
              value={immuneLevel || 0}
              onCommit={onImmuneLevelChanged}
            />
          </FormGroup>
          <FormGroup label="Surface Germs">
            <FormGroup label="DiseaseID" inline>
              <NumericInput
                value={surfaceDiseaseId ? surfaceDiseaseId.hash : 0}
                onCommit={this._onSurfaceDiseaseIdCommit}
              />
            </FormGroup>
            <FormGroup label="Count" inline>
              <NumericInput
                minValue={0}
                precision="single"
                value={surfaceDiseaseCount || 0}
                onCommit={this._onSurfaceDiseaseCountCommit}
              />
            </FormGroup>
          </FormGroup>
          <FormGroup label="Conditions">
            <table>
              <tbody>
                <tr>
                  <TD>Food Poisoning</TD>
                  <td>
                    <NumericInput
                      minValue={0}
                      precision="single"
                      value={foodPoisoning || 0}
                      onCommit={onFoodPoisoningChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <TD>Slime Lung</TD>
                  <td>
                    <NumericInput
                      minValue={0}
                      precision="single"
                      value={slimeLung || 0}
                      onCommit={onSlimeLungChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <TD>Spores</TD>
                  <td>
                    <NumericInput
                      minValue={0}
                      precision="single"
                      value={spores || 0}
                      onCommit={onSporesChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <TD>Hypothermia</TD>
                  <td>
                    <NumericInput
                      minValue={0}
                      precision="single"
                      value={coldBrain || 0}
                      onCommit={onColdBrainChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <TD>Hyperthermia</TD>
                  <td>
                    <NumericInput
                      minValue={0}
                      precision="single"
                      value={heatRash || 0}
                      onCommit={onHeatRashChanged}
                    />
                  </td>
                </tr>
                <tr>
                  <TD>Sunburn</TD>
                  <td>
                    <NumericInput
                      minValue={0}
                      precision="single"
                      value={sunburn || 0}
                      onCommit={onSunburnChanged}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </FormGroup>
        </div>
      </React.Fragment>
    );
  }

  @autobind()
  private _onSurfaceDiseaseIdCommit(value: number) {
    const { onSurfaceDiseaseChanged } = this.props;
    onSurfaceDiseaseChanged({ hash: value }, 0);
  }

  @autobind()
  private _onSurfaceDiseaseCountCommit(value: number) {
    const { surfaceDiseaseId, onSurfaceDiseaseChanged } = this.props;
    onSurfaceDiseaseChanged(surfaceDiseaseId || { hash: 0 }, value);
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinionHealthTab);
