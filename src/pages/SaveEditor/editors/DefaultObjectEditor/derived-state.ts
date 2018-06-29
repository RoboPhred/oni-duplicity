import { createSelector, createStructuredSelector } from "reselect";

import { isObject } from "lodash-es";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save-selector";
import selectedPath from "@/selectors/selected-path";

import { getSaveItemValue } from "@/services/save-structure";

export interface FieldEditable {
  title: string;
  key: string;
  fieldType: "editable";
  value: any;
}
export interface FieldLink {
  title: string;
  key: string;
  fieldType: "link";
  linkTitle: string;
  path: string[];
}
export interface FieldUnknown {
  title: string;
  key: string;
  fieldType: "unknown";
  value: any;
}
export type FieldRow = FieldEditable | FieldLink | FieldUnknown;

const fields = createSelector(
  selectedPath,
  oniSave,
  (path, saveGame): FieldRow[] => {
    if (!saveGame) {
      return [];
    }

    const obj = getSaveItemValue(path, saveGame);
    if (isPrimitive(obj)) {
      // Cannot edit things in a primitive.
      return [];
    }

    return Object.keys(obj).map(key => {
      const value = obj[key];
      if (isPrimitive(value)) {
        const editable: FieldEditable = {
          title: key,
          key,
          fieldType: "editable",
          value
        };
        return editable;
      } else if (isObject(value)) {
        const link: FieldLink = {
          title: key,
          key,
          fieldType: "link",
          linkTitle: `[${value ? typeof value : "null"}]`,
          path: [...path, key]
        };
        return link;
      } else {
        const unknown: FieldUnknown = {
          title: key,
          key,
          fieldType: "unknown",
          value: value === null ? "[null]" : "[undefined]"
        };
        return unknown;
      }
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
