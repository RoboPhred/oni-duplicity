import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save-selector";
import selectedPath from "@/selectors/selected-path-selector";

import { TemplateObjectEditorProps } from "./props";

const templateName = (_: AppState, props: TemplateObjectEditorProps) =>
  props.templateName;

const template = createSelector(
  oniSave,
  templateName,
  (oniSave, templateName) => {
    if (!oniSave) {
      return null;
    }

    return oniSave.templates.find(x => x.name === templateName) || null;
  }
);

const structuredSelector = {
  template,
  selectedPath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<
  AppState,
  TemplateObjectEditorProps,
  StateProps
>(structuredSelector);
export default mapStateToProps;
