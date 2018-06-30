import * as React from "react";
import { connect } from "react-redux";

import { ItemEditableTextProps } from "./props";
import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import EditableText from "@/components/EditableText";

type Props = ItemEditableTextProps & StateProps & DispatchProps;
class ItemEditableText extends React.Component<Props> {
  render() {
    const { intent, value, onChange } = this.props;
    return <EditableText intent={intent} value={value} onChange={onChange} />;
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemEditableText);
