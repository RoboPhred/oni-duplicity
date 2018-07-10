import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save";
import selectedPath from "@/selectors/selected-path";

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

    for (let i = 0; i < templatePath.length; i++) {
      const part = templatePath[i];

      if (template == null) {
        return null;
      }

      const member =
        template.fields.find(x => x.name === part) ||
        template.properties.find(x => x.name === part);
      if (!member) {
        return null;
      }

      const typeCode = getTypeCode(member.type.info);

      if (typeCode === SerializationTypeCode.UserDefined) {
        template = oniSave.templates.find(
          x => x.name === member.type.templateName!
        );
      } else if (
        LIST_TYPES.indexOf(typeCode) !== -1 &&
        getTypeCode(member.type.subTypes![0].info) ===
          SerializationTypeCode.UserDefined
      ) {
        i++;
        if (i === templatePath.length) {
          // Targeting an array but no index yet.
          return null;
        }

        template = oniSave.templates.find(
          x => x.name === member.type.subTypes![0].templateName
        );
      } else {
        return null;
      }
    }

    return template;
  }
);

// TODO: replace with oni-save-parser LIST_TYPES when released.
const LIST_TYPES = [
  SerializationTypeCode.Array,
  SerializationTypeCode.List,
  SerializationTypeCode.HashSet
];

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
