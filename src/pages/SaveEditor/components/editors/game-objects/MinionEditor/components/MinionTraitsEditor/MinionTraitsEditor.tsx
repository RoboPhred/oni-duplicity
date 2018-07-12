import * as React from "react";
import { connect } from "react-redux";

import { AI_TRAIT_IDS } from "oni-save-parser";

import mapStateToProps, { StateProps } from "./derived-state";

import SelectField from "@/pages/SaveEditor/components/fields/SelectField";
import { Option } from "@/components/Select";

type Props = StateProps;
class MinionTraitsEditor extends React.Component<Props> {
  render() {
    const { traitsDataPath } = this.props;
    if (!traitsDataPath) {
      return "No Klei.AI.Traits Behavior.";
    }

    // This looks terrible and is difficult to use.
    //  We should use a checkbox table that provides descriptions and effects.
    const options: Option[] = AI_TRAIT_IDS.map(x => ({
      label: x,
      value: x
    }));
    return (
      <SelectField
        multi
        joinValues={false}
        simpleValue={false}
        closeOnSelect={false}
        options={options}
        path={[...traitsDataPath, "TraitIds"]}
      />
    );
  }
}
export default connect(mapStateToProps)(MinionTraitsEditor);
