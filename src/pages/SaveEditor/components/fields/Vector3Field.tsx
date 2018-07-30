import * as React from "react";

import FormGroup from "@/components/FormGroup";

import { EditorFieldProps } from "./connect-field";

import NumericField from "./NumericField";

const Vector3Field: React.SFC<EditorFieldProps> = ({ path }) => (
  <div>
    <FormGroup label="X" inline>
      <NumericField precision="single" path={[...path, "x"]} />
    </FormGroup>
    <FormGroup label="Y" inline>
      <NumericField precision="single" path={[...path, "y"]} />
    </FormGroup>
    <FormGroup label="Z" inline>
      <NumericField precision="single" path={[...path, "z"]} />
    </FormGroup>
  </div>
);
Vector3Field.displayName = "Vector3Field";
export default Vector3Field;
