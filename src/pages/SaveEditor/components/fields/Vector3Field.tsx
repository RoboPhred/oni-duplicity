import * as React from "react";

import FormGroup from "@/components/FormGroup";

import { EditorFieldProps } from "./connect-field";

import NumericField from "./NumericField";

const Vector3Field: React.SFC<EditorFieldProps> = ({ path }) => (
  <div>
    <FormGroup>
      <FormGroup.Label>X</FormGroup.Label>
      <FormGroup.Content>
        <NumericField precision="single" path={[...path, "x"]} />
      </FormGroup.Content>
    </FormGroup>
    <FormGroup>
      <FormGroup.Label>Y</FormGroup.Label>
      <FormGroup.Content>
        <NumericField precision="single" path={[...path, "y"]} />
      </FormGroup.Content>
    </FormGroup>
    <FormGroup>
      <FormGroup.Label>Z</FormGroup.Label>
      <FormGroup.Content>
        <NumericField precision="single" path={[...path, "z"]} />
      </FormGroup.Content>
    </FormGroup>
  </div>
);
Vector3Field.displayName = "Vector3Field";
export default Vector3Field;
