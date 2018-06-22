import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import extractObjectName from "@/pages/SaveEditor/utils/extract-object-name";

import SelectedObjectEditorContainer from "./components/SelectedObjectEditorContainer";

import SelectPathBreadcrumb from "@/pages/SaveEditor/components/SelectedPathBreadcrumb";

import EditorField from "./components/EditorField";
import EditorLink from "./components/EditorLink";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

type Props = StateProps & DispatchProps;
class SelectedObjectEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { selectedPath, selectedValue } = this.props;

    const fields = Object.keys(selectedValue).map(key =>
      this._renderField(key)
    );

    return (
      <SelectedObjectEditorContainer>
        <SelectPathBreadcrumb />
        {fields}
      </SelectedObjectEditorContainer>
    );
  }

  private _renderField(key: string) {
    const { selectedValue } = this.props;
    const value = selectedValue[key];
    if (isEditableValue(value)) {
      return (
        <div key={key}>
          <span>{key}</span>
          <EditorField
            propKey={key}
            value={value}
            onChange={this._onFieldChange}
          />
        </div>
      );
    } else {
      const { selectedPath, onPathSelected } = this.props;
      let objectName = extractObjectName(value);
      if (objectName == null) {
        if (value == null) {
          objectName = "[null]";
        } else {
          objectName = Array.isArray(value) ? "[array]" : `[${typeof value}]`;
        }
      }
      return (
        <EditorLink
          key={key}
          onClick={onPathSelected.bind(null, [...selectedPath, key])}
        >
          {key}: {objectName}
        </EditorLink>
      );
    }
  }

  @autobind()
  private _onFieldChange(key: string, value: any) {
    const { selectedPath, onModify } = this.props;
    onModify([...selectedPath, key], value);
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedObjectEditor);

const primitiveTypes = ["string", "number", "boolean"];
function isEditableValue(val: any) {
  const valType = typeof val;
  return primitiveTypes.indexOf(valType) !== -1;
}
