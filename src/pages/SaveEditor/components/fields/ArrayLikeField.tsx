import * as React from "react";

import { TypeInfo } from "oni-save-parser";

import Text from "@/components/Text";

import connectEditorField, {
  EditorFieldProps,
  InjectedProps
} from "./connect-field";

import { Intent } from "@/theme";

import getFieldElementClass from "./from-typeinfo";

const TD = Text.withComponent("td");

export interface ArrayLikeFieldProps extends EditorFieldProps {
  subType: TypeInfo;
}
const ArrayLikeField: React.SFC<ArrayLikeFieldProps & InjectedProps> = ({
  path,
  subType,
  value
}) => {
  if (value == null) {
    return <Text intent={Intent.Hint}>Null Value</Text>;
  }
  const ValueElement = getFieldElementClass(subType);
  const elements = (value as any[]).map((_, i) => {
    return (
      <tr key={i}>
        <TD>{i}</TD>
        <td>
          <ValueElement path={[...path, `${i}`]} />
        </td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <tr>
          <th>
            <Text intent={Intent.Primary}>Key</Text>
          </th>
          <th>
            <Text intent={Intent.Primary}>Value</Text>
          </th>
        </tr>
      </thead>
      <tbody>{elements}</tbody>
    </table>
  );
};
ArrayLikeField.displayName = "ArrayLikeField";
export default connectEditorField()(ArrayLikeField);
