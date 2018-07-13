import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { HealthState } from "oni-save-parser";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import FormGroup from "@/components/FormGroup";
import SelectInput from "@/components/SelectInput";
import NumericInput from "@/components/NumericInput";

type Props = StateProps & DispatchProps;
class MinionHealthTab extends React.Component<Props> {
  render() {
    const {
      healthState,
      onHealthStatusChanged,
      hitpoints,
      onHitpointsChanged,
      surfaceDiseaseId,
      surfaceDiseaseCount
    } = this.props;

    const options = Object.keys(HealthState)
      .filter(x => isNaN(parseInt(x)))
      .map(x => ({
        label: x,
        value: HealthState[x as any]
      }));

    return (
      <React.Fragment>
        <FormGroup label="Status">
          <SelectInput
            value={healthState || HealthState.Perfect}
            options={options}
            onCommit={onHealthStatusChanged}
          />
        </FormGroup>
        <FormGroup label="HitPoints">
          <NumericInput
            value={hitpoints || 0}
            onCommit={onHitpointsChanged}
            minValue={0}
          />
        </FormGroup>
        <FormGroup label="Germs">
          <FormGroup label="DiseaseID">
            <NumericInput
              value={surfaceDiseaseId ? surfaceDiseaseId.hash : 0}
              onCommit={this._onSurfaceDiseaseIdCommit}
            />
            <div>
              TODO: selector for disease type hashes with advanced mode custom
              string.
            </div>
          </FormGroup>
          <FormGroup label="Count">
            <NumericInput
              minValue={0}
              value={surfaceDiseaseCount || 0}
              onCommit={this._onSurfaceDiseaseCountCommit}
            />
          </FormGroup>
        </FormGroup>
        TODO health points, stanima, internal disease, so on.
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
