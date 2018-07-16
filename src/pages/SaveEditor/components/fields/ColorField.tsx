import * as React from "react";

import FormGroup from "@/components/FormGroup";

import { EditorFieldProps } from "./connect-field";

import NumericField from "./NumericField";

const ColorField: React.SFC<EditorFieldProps> = ({ path }) => (
  <div>
    <FormGroup label="R">
      <NumericField
        precision="single"
        minValue={0}
        maxValue={1}
        path={[...path, "r"]}
      />
    </FormGroup>
    <FormGroup label="G">
      <NumericField
        precision="single"
        minValue={0}
        maxValue={1}
        path={[...path, "g"]}
      />
    </FormGroup>
    <FormGroup label="B">
      <NumericField
        precision="single"
        minValue={0}
        maxValue={1}
        path={[...path, "b"]}
      />
    </FormGroup>
    <FormGroup label="A">
      <NumericField
        precision="single"
        minValue={0}
        maxValue={1}
        path={[...path, "a"]}
      />
    </FormGroup>
  </div>
);
ColorField.displayName = "ColorField";
export default ColorField;
