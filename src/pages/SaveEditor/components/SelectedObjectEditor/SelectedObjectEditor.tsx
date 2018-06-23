import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { getSaveItemTitle } from "@/services/save-structure";

import SelectedObjectEditorContainer from "./components/Container";

import SaveStructureLink from "@/pages/SaveEditor/components/SaveStructureLink";
import SelectPathBreadcrumb from "@/pages/SaveEditor/components/SelectedPathBreadcrumb";

import EditorField from "./components/EditorField";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

type Props = StateProps & DispatchProps;
class SelectedObjectEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { selectedValue } = this.props;

    const fields = Object.keys(selectedValue).map(key =>
      this._renderFieldRow(key)
    );

    return (
      <SelectedObjectEditorContainer>
        <SelectPathBreadcrumb />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>{fields}</tbody>
        </table>
      </SelectedObjectEditorContainer>
    );
  }

  private _renderFieldRow(key: string) {
    const { selectedValue } = this.props;
    const value = selectedValue[key];
    if (isEditableValue(value)) {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>
            <EditorField
              propKey={key}
              value={value}
              onChange={this._onFieldChange}
            />
          </td>
        </tr>
      );
    } else if (value != null) {
      const { selectedPath } = this.props;
      let objectName = getSaveItemTitle(value, selectedPath);
      if (objectName == null) {
        if (value == null) {
          objectName = "[null]";
        } else {
          objectName = Array.isArray(value) ? "[array]" : `[${typeof value}]`;
        }
      }
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>
            <SaveStructureLink path={[...selectedPath, key]}>
              {objectName}
            </SaveStructureLink>
          </td>
        </tr>
      );
    } else {
      return (
        <tr key={key}>
          <td>{key}</td>
          <td>[null]</td>
        </tr>
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
