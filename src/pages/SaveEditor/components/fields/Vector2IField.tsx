import * as React from "react";

import FormGroup from "@/components/FormGroup";

import { EditorFieldProps } from "./connect-field";

import NumericField from "./NumericField";

const Vector2IField: React.SFC<EditorFieldProps> = ({ path }) => (
  <div>
    <FormGroup>
      <FormGroup.Label>X</FormGroup.Label>
      <FormGroup.Content>
        <NumericField precision="int32" path={[...path, "x"]} />
      </FormGroup.Content>
    </FormGroup>
    <FormGroup>
      <FormGroup.Label>Y</FormGroup.Label>
      <FormGroup.Content>
        <NumericField precision="int32" path={[...path, "y"]} />
      </FormGroup.Content>
    </FormGroup>
  </div>
);
Vector2IField.displayName = "Vector2IField";
export default Vector2IField;
