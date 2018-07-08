import * as React from "react";

import FormGroup from "@/components/FormGroup";

import { EditorFieldProps } from "./connect-field";

import NumericField from "./NumericField";

const Vector2Field: React.SFC<EditorFieldProps> = ({ path }) => (
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
  </div>
);
Vector2Field.displayName = "Vector2Field";
export default Vector2Field;
