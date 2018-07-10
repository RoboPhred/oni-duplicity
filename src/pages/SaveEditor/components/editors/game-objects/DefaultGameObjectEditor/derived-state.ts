import { createStructuredSelector, createSelector } from "reselect";

import { KPrefabIDBehavior, getBehavior, GameObject } from "oni-save-parser";

import { AppState } from "@/state";

import { getPathGameObjectGroup } from "@/services/save-structure";

import selectedValue from "@/selectors/selected-value-selector";
import selectedPath from "@/selectors/selected-path-selector";
import oniSave from "@/selectors/oni-save-selector";

const structuredSelector = {
  gameObjectPath: selectedPath,
  gameObjectName: createSelector(
    selectedValue,
    selectedPath,
    oniSave,
    (selectedValue, selectedPath, oniSave) => {
      if (!oniSave) {
        return "[no save loaded]";
      }

      if (!selectedValue) {
        return "[no value selected]";
      }

      const prefabIdBehavior = getBehavior(selectedValue, KPrefabIDBehavior);
      let prefabId =
        (prefabIdBehavior &&
          prefabIdBehavior.templateData &&
          prefabIdBehavior.templateData.InstanceID) ||
        "[no instance id]";

      const group = getPathGameObjectGroup(selectedPath, oniSave);

      return `${group ? group.name : "[unknown]"} #${prefabId}`;
    }
  )
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
