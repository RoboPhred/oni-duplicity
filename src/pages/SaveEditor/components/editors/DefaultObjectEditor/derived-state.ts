import { createSelector, createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import selectedPath from "@/selectors/selected-path-selector";
import selectedValue from "@/selectors/selected-value-selector";

export interface FieldEditable {
  title: string;
  key: string;
  value: any;
}
export type FieldRow = FieldEditable;

const fields = createSelector(
  selectedValue,
  (selectedValue): FieldRow[] => {
    if (!selectedValue) {
      return [];
    }

    if (isPrimitive(selectedValue)) {
      // Cannot edit things in a primitive.
      return [];
    }

    return Object.keys(selectedValue)
      .filter(key => isPrimitive(selectedValue[key]))
      .map(key => {
        const value = selectedValue[key];
        const editable: FieldEditable = {
          title: key,
          key,
          value
        };
        return editable;
      });
  }
);

const structuredSelectors = {
  selectedPath,
  fields
};
export type StateProps = StructuredStateProps<typeof structuredSelectors>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelectors
);
export default mapStateToProps;

const primitiveTypes = ["string", "number", "boolean"];
function isPrimitive(val: any) {
  const valType = typeof val;
  return primitiveTypes.indexOf(valType) !== -1;
}
