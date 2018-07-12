import * as React from "react";

import FormGroup from "@/components/FormGroup";

import { EditorFieldProps } from "./connect-field";

import NumericField from "./NumericField";

const Vector2IField: React.SFC<EditorFieldProps> = ({ path }) => (
  <div>
    <FormGroup label="X">
      <NumericField precision="int32" path={[...path, "x"]} />
    </FormGroup>
    <FormGroup label="Y">
      <NumericField precision="int32" path={[...path, "y"]} />
    </FormGroup>
  </div>
);
Vector2IField.displayName = "Vector2IField";
export default Vector2IField;
