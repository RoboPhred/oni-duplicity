import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./derived-state";

import FormGroup from "@/components/FormGroup";
import SelectField from "@/pages/SaveEditor/components/fields/SelectField";
import { HealthState } from "oni-save-parser";

type Props = StateProps;
class MinionHealthTab extends React.Component<Props> {
  render() {
    const { healthStatePath } = this.props;
    if (!healthStatePath) {
      return null;
    }

    const options = Object.keys(HealthState)
      .filter(x => isNaN(parseInt(x)))
      .map(x => ({
        label: x,
        value: HealthState[x as any]
      }));

    return (
      <React.Fragment>
        <FormGroup>
          <FormGroup.Label>Status</FormGroup.Label>
          <FormGroup.Content width="100%">
            <SelectField path={healthStatePath} options={options} />
          </FormGroup.Content>
        </FormGroup>
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps)(MinionHealthTab);
