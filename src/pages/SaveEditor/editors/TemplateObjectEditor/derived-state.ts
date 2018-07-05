import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save-selector";
import selectedValue from "@/selectors/selected-value-selector";

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
  value: selectedValue
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<
  AppState,
  TemplateObjectEditorProps,
  StateProps
>(structuredSelector);
export default mapStateToProps;
