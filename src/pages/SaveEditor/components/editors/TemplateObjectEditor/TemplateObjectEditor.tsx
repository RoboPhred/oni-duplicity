import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import { TemplateObjectEditorProps } from "./props";
import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
const H4 = Text.withComponent("h4");
const TD = Text.withComponent("td");

import TemplateObjectEditorContainer from "./components/TemplateObjectEditorContainer";

import getTypeInfoFieldComponent from "../../fields/from-typeinfo";

type Props = TemplateObjectEditorProps & StateProps;
class TemplateObjectEditor extends React.Component<Props> {
  render() {
    const { templateName, template, selectedPath } = this.props;

    const fieldRows =
      template &&
      [...(template.fields || []), ...(template.properties || [])].map(x => {
        const FieldEditor = getTypeInfoFieldComponent(x.type);
        return (
          <tr key={x.name}>
            <TD>{x.name}</TD>
            <td>
              <FieldEditor path={[...selectedPath, x.name]} />
            </td>
          </tr>
        );
      });
    return (
      <TemplateObjectEditorContainer>
        <H4 intent={Intent.Primary}>{templateName}</H4>
        <table>
          <tbody>{fieldRows}</tbody>
        </table>
      </TemplateObjectEditorContainer>
    );
  }
}
export default connect(mapStateToProps)(TemplateObjectEditor);
