import { createStructuredSelector, createSelector } from "reselect";

import {
  LIST_TYPES,
  getTypeCode,
  SerializationTypeCode,
  TypeInfo,
  SerializationTypeInfo
} from "oni-save-parser";

import { AppState } from "@/state";

import oniSave from "@/selectors/oni-save";
import selectedPath from "@/selectors/selected-path";

import { TemplateObjectEditorProps } from "./props";

const templateName = (_: AppState, props: TemplateObjectEditorProps) =>
  props.templateName;

const templatePath = (_: AppState, props: TemplateObjectEditorProps) =>
  props.templatePath;

const valuePath = (state: AppState, props: TemplateObjectEditorProps) =>
  props.valuePathHack || selectedPath(state);

const typeInfo = createSelector(
  oniSave,
  templateName,
  templatePath,
  (oniSave, templateName, templatePath) => {
    if (!oniSave) {
      return null;
    }

    let typeInfo: TypeInfo = {
      info: SerializationTypeInfo.UserDefined,
      templateName
    };
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

      typeInfo = member.type;

      const typeCode = getTypeCode(typeInfo.info);

      if (typeCode === SerializationTypeCode.UserDefined) {
        template = oniSave.templates.find(
          x => x.name === member.type.templateName!
        );
      } else if (LIST_TYPES.indexOf(typeCode) !== -1) {
        i++;
        if (i === templatePath.length) {
          // Targeting an array but no index yet.
          break;
        }

        if (
          getTypeCode(typeInfo.subTypes![0].info) ===
          SerializationTypeCode.UserDefined
        ) {
          typeInfo = typeInfo.subTypes![0];
          template = oniSave.templates.find(
            x => x.name === typeInfo.templateName
          );
        }
      } else if (typeCode === SerializationTypeCode.Dictionary) {
        i++;
        if (i === templatePath.length) {
          // Targeting a dict but no index yet.
          break;
        }

        // Select key or value
        i++;
        if (i === templatePath.length) {
          // Targeting an index, but no key or value.
          // Fake a value for the ui.
          typeInfo = {
            info: SerializationTypeInfo.Pair,
            subTypes: typeInfo.subTypes
          };
          break;
        }
        let keyValueIndex = Number(templatePath[i]);
        typeInfo = typeInfo.subTypes![keyValueIndex];
        if (!typeInfo) {
          break;
        }

        if (getTypeCode(typeInfo.info) === SerializationTypeCode.UserDefined) {
          template = oniSave.templates.find(
            x => x.name === typeInfo.templateName
          );
        }
      } else {
        return null;
      }
    }

    return typeInfo;
  }
);

const template = createSelector(oniSave, typeInfo, (oniSave, typeInfo) => {
  if (!oniSave || !typeInfo) {
    return null;
  }

  const typeCode = getTypeCode(typeInfo.info);
  if (typeCode !== SerializationTypeCode.UserDefined) {
    return null;
  }

  let template = oniSave.templates.find(x => x.name === typeInfo.templateName);
  return template;
});

const structuredSelector = {
  template,
  typeInfo,
  selectedPath: valuePath
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<
  AppState,
  TemplateObjectEditorProps,
  StateProps
>(structuredSelector);
export default mapStateToProps;
