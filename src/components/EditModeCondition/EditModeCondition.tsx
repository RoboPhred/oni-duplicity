import * as React from "react";
import { connect } from "react-redux";

import { EditMode } from "@/services/save-structure";

import mapStateToProps, { StateProps } from "./derived-state";

export interface EditModeConditionProps {
  editMode?: EditMode;
}
type Props = EditModeConditionProps & StateProps;
class EditModeCondition extends React.Component<Props> {
  render() {
    const { currentEditMode, editMode, children } = this.props;
    if (currentEditMode !== editMode) {
      return null;
    }

    return children;
  }
}
export default connect(mapStateToProps)(EditModeCondition);
