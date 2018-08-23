import { createStructuredSelector, createSelector } from "reselect";

import { KPrefabIDBehavior, getBehavior, GameObject } from "oni-save-parser";

import { AppState } from "@/state";

import { getLastSaveItemOfType } from "@/services/save-structure";

import selectedValue from "@/selectors/selected-value";
import selectedPath from "@/selectors/selected-path";
import oniSave from "@/selectors/oni-save";

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

      const found = getLastSaveItemOfType(
        "game-object-group",
        selectedPath,
        oniSave
      );

      return `${found ? found.item.name : "[unknown]"} #${prefabId}`;
    }
  )
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
