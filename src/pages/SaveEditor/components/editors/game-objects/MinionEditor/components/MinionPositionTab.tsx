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
    <FormGroup>
      <FormGroup.Label>X</FormGroup.Label>
      <FormGroup.Content>
        <NumericField
          precision="single"
          path={[...gameObjectPath, "position", "x"]}
        />
      </FormGroup.Content>
    </FormGroup>
    <FormGroup>
      <FormGroup.Label>Y</FormGroup.Label>
      <FormGroup.Content>
        <NumericField
          precision="single"
          path={[...gameObjectPath, "position", "y"]}
        />
      </FormGroup.Content>
    </FormGroup>
    <EditModeCondition editMode="advanced">
      <FormGroup>
        <FormGroup.Label>Z</FormGroup.Label>
        <FormGroup.Content>
          <NumericField
            precision="single"
            path={[...gameObjectPath, "position", "z"]}
          />
        </FormGroup.Content>
      </FormGroup>
    </EditModeCondition>
  </React.Fragment>
);
MinionPositionTab.displayName = "MinionPositionTab";
export default MinionPositionTab;
