import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";

import FormGroup from "@/components/FormGroup";
import SelectField from "@/pages/SaveEditor/components/fields/SelectField";
import { HealthState } from "oni-save-parser";
import NumericField from "@/pages/SaveEditor/components/fields/NumericField";

type Props = StateProps;
class MinionHealthTab extends React.Component<Props> {
  render() {
    const { healthDataPath, primaryElementDataPath } = this.props;
    if (!healthDataPath) {
      return "No Health Data";
    }

    if (!primaryElementDataPath) {
      return "No Primary Element";
    }

    const options = Object.keys(HealthState)
      .filter(x => isNaN(parseInt(x)))
      .map(x => ({
        label: x,
        value: HealthState[x as any]
      }));

    return (
      <React.Fragment>
        <FormGroup label="Status">
          <SelectField path={[...healthDataPath, "State"]} options={options} />
        </FormGroup>
        <FormGroup label="Germs">
          <FormGroup label="DiseaseID">
            <NumericField
              path={[...primaryElementDataPath, "diseaseID", "hash"]}
            />
            <div>
              TODO: selector for disease type hashes with advanced mode custom
              string.
            </div>
          </FormGroup>
          <FormGroup label="Count">
            <NumericField path={[...primaryElementDataPath, "diseaseCount"]} />
          </FormGroup>
        </FormGroup>
        TODO health points, stanima, internal disease, so on.
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps)(MinionHealthTab);
