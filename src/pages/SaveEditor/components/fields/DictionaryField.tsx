import * as React from "react";

import { TypeInfo } from "oni-save-parser";

import Text from "@/components/Text";

import connectEditorField, {
  EditorFieldProps,
  InjectedProps
} from "./connect-field";

import { Intent } from "@/style";

import getFieldElementClass from "./from-typeinfo";

const TD = Text.withComponent("td");

export interface DictionaryFieldProps extends EditorFieldProps {
  subType: TypeInfo;
}
const DictionaryField: React.SFC<DictionaryFieldProps & InjectedProps> = ({
  path,
  subType,
  value
}) => {
  const ValueElement = getFieldElementClass(subType);
  const elements = (value as any[]).map(([key, value], i) => {
    return (
      <tr key={i}>
        <TD>{JSON.stringify(key)}</TD>
        <td>
          <ValueElement path={[...path, `${i}`, "1"]} />
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
DictionaryField.displayName = "DictionaryField";
export default connectEditorField()(DictionaryField);
