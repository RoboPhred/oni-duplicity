import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
import FormGroup from "@/components/FormGroup";
import NumericField from "@/pages/SaveEditor/components/fields/NumericField";
import EditModeCondition from "@/components/EditModeCondition";

type Props = StateProps;
const MinionPositionTab: React.SFC<Props> = ({ gameObjectPath }) => {
  if (gameObjectPath == null) {
    return <Text intent={Intent.Default}>No game object selected</Text>;
  }
  return (
    <React.Fragment>
      <FormGroup label="X">
        <NumericField
          precision="single"
          path={[...gameObjectPath, "position", "x"]}
        />
      </FormGroup>
      <FormGroup label="Y">
        <NumericField
          precision="single"
          path={[...gameObjectPath, "position", "y"]}
        />
      </FormGroup>
      <EditModeCondition editMode="advanced">
        <FormGroup label="Z">
          <NumericField
            precision="single"
            path={[...gameObjectPath, "position", "z"]}
          />
        </FormGroup>
      </EditModeCondition>
    </React.Fragment>
  );
};
MinionPositionTab.displayName = "MinionPositionTab";
export default connect(mapStateToProps)(MinionPositionTab);
