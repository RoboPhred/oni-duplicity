import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/style";

import { TemplateObjectEditorProps } from "./props";
import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
const TD = Text.withComponent("td");

import TemplateObjectEditorContainer from "./components/TemplateObjectEditorContainer";

import getTypeInfoFieldComponent from "../../fields/from-typeinfo";

type Props = TemplateObjectEditorProps & StateProps;
class TemplateObjectEditor extends React.Component<Props> {
  render() {
    const { templateName, template, typeInfo, selectedPath } = this.props;

    let content: JSX.Element;
    if (template) {
      const fieldRows = [
        ...(template.fields || []),
        ...(template.properties || [])
      ].map(x => {
        const FieldEditor = getTypeInfoFieldComponent(x.type, true);
        return (
          <tr key={x.name}>
            <TD>{x.name}</TD>
            <td>
              <FieldEditor path={[...selectedPath, x.name]} />
            </td>
          </tr>
        );
      });

      content = (
        <table>
          <tbody>{fieldRows}</tbody>
        </table>
      );
    } else if (typeInfo) {
      const FieldEditor = getTypeInfoFieldComponent(typeInfo);
      content = <FieldEditor path={selectedPath} />;
    } else {
      content = <Text intent={Intent.Dangerous}>Unknown Editable</Text>;
    }
    return (
      <TemplateObjectEditorContainer>
        <Text.H4 intent={Intent.Primary}>{templateName}</Text.H4>
        {content}
      </TemplateObjectEditorContainer>
    );
  }
}
export default connect(mapStateToProps)(TemplateObjectEditor);
