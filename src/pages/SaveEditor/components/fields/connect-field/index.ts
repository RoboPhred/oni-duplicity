import { connect } from "react-redux";

export * from "./props";

import { EditorFieldProps } from "./props";
import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";
import { AppState } from "@/state";

export type InjectedProps = StateProps & DispatchProps;

export default function connectEditorField() {
  return connect<StateProps, DispatchProps, EditorFieldProps, AppState>(
    mapStateToProps,
    mapDispatchToProps
  );
}
