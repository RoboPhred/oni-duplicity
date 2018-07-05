import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/theme";

import { TemplateObjectEditorProps } from "./props";
import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
const H4 = Text.withComponent("h4");

import TemplateObjectEditorContainer from "./components/TemplateObjectEditorContainer";

type Props = TemplateObjectEditorProps & StateProps;
class TemplateObjectEditor extends React.Component<Props> {
  render() {
    const { templateName, template, value } = this.props;
    return (
      <TemplateObjectEditorContainer>
        <H4 intent={Intent.Primary}>{templateName}</H4>
        <Text>
          <code>
            <pre>{JSON.stringify(template, null, 2)}</pre>
          </code>
        </Text>
        <Text>
          <code>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </code>
        </Text>
      </TemplateObjectEditorContainer>
    );
  }
}
export default connect(mapStateToProps)(TemplateObjectEditor);
