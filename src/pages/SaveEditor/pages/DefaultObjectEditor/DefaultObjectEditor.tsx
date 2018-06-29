import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { Intent } from "@/theme";
import Text from "@/components/Text";
import SaveStructureLink from "@/components/SaveStructureLink";

import SelectedObjectEditorContainer from "./components/Container";

import EditorField from "./components/EditorField";

import mapStateToProps, { StateProps, FieldRow } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

const TH = Text.withComponent("th");
const TD = Text.withComponent("td");

type Props = StateProps & DispatchProps;
class DefaultObjectEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { fields } = this.props;

    const fieldElements = fields.map(field => this._renderFieldRow(field));

    return (
      <SelectedObjectEditorContainer>
        <table>
          <thead>
            <tr>
              <TH>Name</TH>
              <TH>Value</TH>
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
          <TD>{title}</TD>
          <TD>
            <EditorField
              propKey={key}
              value={value}
              onChange={this._onFieldChange}
            />
          </TD>
        </tr>
      );
    } else if (field.fieldType === "link") {
      const { key, title, linkTitle, path } = field;
      return (
        <tr key={key}>
          <TD>{title}</TD>
          <td>
            <SaveStructureLink intent={Intent.Primary} path={path}>
              {linkTitle}
            </SaveStructureLink>
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
)(DefaultObjectEditor);
