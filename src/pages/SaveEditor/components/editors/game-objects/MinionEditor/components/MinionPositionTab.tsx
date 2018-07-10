import * as React from "react";

import FormGroup from "@/components/FormGroup";
import NumericField from "@/pages/SaveEditor/components/fields/NumericField";

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
  </React.Fragment>
);
MinionPositionTab.displayName = "MinionPositionTab";
export default MinionPositionTab;
