import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { getSaveItemTitle } from "@/services/save-structure";

import SelectedObjectEditorContainer from "./components/Container";

import SaveStructureLink from "@/pages/SaveEditor/components/SaveStructureLink";
import SelectPathBreadcrumb from "@/pages/SaveEditor/components/SelectedPathBreadcrumb";

import EditorField from "./components/EditorField";

import mapStateToProps, { StateProps, FieldRow } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

type Props = StateProps & DispatchProps;
class SelectedItemEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { fields } = this.props;

    const fieldElements = fields.map(field => this._renderFieldRow(field));

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
          <tbody>{fieldElements}</tbody>
        </table>
      </SelectedObjectEditorContainer>
    );
  }

  private _renderFieldRow(field: FieldRow) {
    if (field.fieldType === "editable") {
      const { title, key, value } = field;
      return (
        <tr key={key}>
          <td>{title}</td>
          <td>
            <EditorField
              propKey={key}
              value={value}
              onChange={this._onFieldChange}
            />
          </td>
        </tr>
      );
    } else if (field.fieldType === "link") {
      const { key, title, linkTitle, path } = field;
      return (
        <tr key={key}>
          <td>{title}</td>
          <td>
            <SaveStructureLink path={path}>{linkTitle}</SaveStructureLink>
          </td>
        </tr>
      );
    }
    return undefined;
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
)(SelectedItemEditor);
