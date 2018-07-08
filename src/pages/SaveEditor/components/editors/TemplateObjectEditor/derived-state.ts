import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save-selector";
import selectedPath from "@/selectors/selected-path-selector";

import { TemplateObjectEditorProps } from "./props";
import { getTypeCode, SerializationTypeCode } from "oni-save-parser";

const templateName = (_: AppState, props: TemplateObjectEditorProps) =>
  props.templateName;

const templatePath = (_: AppState, props: TemplateObjectEditorProps) =>
  props.templatePath;

const valuePath = (state: AppState, props: TemplateObjectEditorProps) =>
  props.valuePathHack || selectedPath(state);

const template = createSelector(
  oniSave,
  templateName,
  templatePath,
  (oniSave, templateName, templatePath) => {
    if (!oniSave) {
      return null;
    }

    let template = oniSave.templates.find(x => x.name === templateName);

    for (const part of templatePath) {
      if (template == null) {
        return null;
      }

      const member =
        template.fields.find(x => x.name === part) ||
        template.properties.find(x => x.name === part);
      if (!member) {
        return null;
      }
      if (getTypeCode(member.type.info) === SerializationTypeCode.UserDefined) {
        template = oniSave.templates.find(
          x => x.name === member.type.templateName!
        );
      } else {
        return null;
      }
    }

    return template;
  }
);

const structuredSelector = {
  template,
  selectedPath: valuePath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<
  AppState,
  TemplateObjectEditorProps,
  StateProps
>(structuredSelector);
export default mapStateToProps;
