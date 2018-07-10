import * as React from "react";

import { TypeInfo } from "oni-save-parser";

import Text from "@/components/Text";

import connectEditorField, {
  EditorFieldProps,
  InjectedProps
} from "./connect-field";

import { Intent } from "@/theme";

import getFieldElementClass from "./from-typeinfo";

export interface ArrayLikeFieldProps extends EditorFieldProps {
  subType: TypeInfo;
}
const ArrayLikeField: React.SFC<ArrayLikeFieldProps & InjectedProps> = ({
  path,
  subType,
  value
}) => {
  const ValueElement = getFieldElementClass(subType);
  const elements = (value as any[]).map((value, i) => {
    return (
      <tr key={i}>
        <td>{i}</td>
        <td>
          <ValueElement path={[...path, `${i}`]} />
        </td>
      </tr>
    );
  });
  return (
    <table>
      <thead>
        <th>
          <td>
            <Text intent={Intent.Primary}>Key</Text>
          </td>
          <td>
            <Text intent={Intent.Primary}>Value</Text>
          </td>
        </th>
      </thead>
      <tbody>{elements}</tbody>
    </table>
  );
};
ArrayLikeField.displayName = "ArrayLikeField";
export default connectEditorField()(ArrayLikeField);
