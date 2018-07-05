import * as React from "react";
import { connect } from "react-redux";

import { TemplateObjectEditorProps } from "./props";
import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";

const H4 = Text.withComponent("h4");

type Props = TemplateObjectEditorProps & StateProps;
class TemplateObjectEditor extends React.Component<Props> {
  render() {
    const { templateName, template, value } = this.props;
    return (
      <div>
        <H4>Hello Template Editor</H4>
        <Text>Our template is {templateName}</Text>
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
      </div>
    );
  }
}
export default connect(mapStateToProps)(TemplateObjectEditor);
