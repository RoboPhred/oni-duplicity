import * as React from "react";

import FormGroup from "@/components/FormGroup";
import NumericField from "@/pages/SaveEditor/components/fields/NumericField";
import EditModeCondition from "@/components/EditModeCondition";

export interface PositionTabContentProps {
  gameObjectPath: string[];
}
const MinionPositionTab: React.SFC<PositionTabContentProps> = ({
  gameObjectPath
}) => (
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
MinionPositionTab.displayName = "MinionPositionTab";
export default MinionPositionTab;
