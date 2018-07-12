import * as React from "react";

import { autobind } from "core-decorators";
import { EnumerationsByName } from "oni-save-parser";

import { Intent } from "@/theme";

import Text from "@/components/Text";
import NumericInput from "@/components/NumericInput";
import Select, { Option } from "@/components/Select";

import connectEditorField, {
  EditorFieldProps,
  InjectedProps
} from "./connect-field";

export interface EnumerationFieldProps extends EditorFieldProps {
  enumerationName: string;
}

type Props = EnumerationFieldProps & InjectedProps;
class EnumerationField extends React.Component<Props> {
  render() {
    const { enumerationName, value, onCommit } = this.props;
    const enumeration = getEnumeration(enumerationName);
    if (!enumeration) {
      return (
        <span>
          <NumericInput value={value} onCommit={onCommit} />
          <Text intent={Intent.Hint}>{enumerationName} (unknown)</Text>
        </span>
      );
    } else {
      // Enumeration has keys for names and numbers.
      const nameKeys = Object.keys(enumeration).filter(
        // TODO: This is silly.  Expose a way to match the [enum]Names constants
        //  to the names of enum types.
        x => isNaN(parseInt(x))
      );
      const options: Option<number>[] = nameKeys.map(x => ({
        label: x,
        value: enumeration[x]
      }));
      return (
        <span>
          <Select
            value={value as number}
            options={options}
            searchable={options.length >= 7}
            clearable={false}
            onChange={this._onSelectInputChange}
            width="200px"
          />
        </span>
      );
    }
  }

  @autobind()
  private _onSelectInputChange(value: Option<any> | null) {
    if (!value) {
      return;
    }
    const { onCommit } = this.props;
    onCommit(value.value);
  }
}

export default connectEditorField()(EnumerationField);

function getEnumeration(
  enumerationName: string
): (Record<string, number> & Record<number, string>) | null {
  if (
    !Object.prototype.hasOwnProperty.call(EnumerationsByName, enumerationName)
  ) {
    return null;
  }

  return (EnumerationsByName as any)[enumerationName];
}
