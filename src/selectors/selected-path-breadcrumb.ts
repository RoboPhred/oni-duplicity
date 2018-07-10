import { createSelector } from "reselect";

import { getSaveItemBreadcrumb } from "@/services/save-structure";

import selectedPath from "./selected-path";
import oniSave from "./oni-save";

const selectedPathBreadcrumbSelector = createSelector(
  selectedPath,
  oniSave,
  (selectedPath, oniSave) =>
    oniSave ? getSaveItemBreadcrumb(selectedPath, oniSave) : []
);
export default selectedPathBreadcrumbSelector;
