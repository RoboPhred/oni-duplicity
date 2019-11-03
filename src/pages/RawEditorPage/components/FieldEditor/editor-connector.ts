import { connect } from "react-redux";
import { Dispatch } from "redux";
import { get } from "lodash";

import { AppState } from "@/state";
import { saveGameSelector } from "@/services/oni-save/selectors/save-game";
import { modifyRaw } from "@/services/oni-save/actions/modify-raw";

import { EditorProps } from "./EditorProps";

function mapStateToProps(state: AppState, props: EditorProps) {
  const saveGame = saveGameSelector(state);
  const value = get(saveGame, props.path);
  return {
    value
  };
}

function mapDispatchToProps(dispatch: Dispatch, props: EditorProps) {
  return {
    onValueChanged: (value: any) => dispatch(modifyRaw(props.path, value))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
