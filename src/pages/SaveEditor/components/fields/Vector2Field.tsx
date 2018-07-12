import * as React from "react";

import FormGroup from "@/components/FormGroup";

import { EditorFieldProps } from "./connect-field";

import NumericField from "./NumericField";

const Vector2Field: React.SFC<EditorFieldProps> = ({ path }) => (
  <div>
    <FormGroup label="X">
      <NumericField precision="single" path={[...path, "x"]} />
    </FormGroup>
    <FormGroup label="Y">
      <NumericField precision="single" path={[...path, "y"]} />
    </FormGroup>
  </div>
);
Vector2Field.displayName = "Vector2Field";
export default Vector2Field;
