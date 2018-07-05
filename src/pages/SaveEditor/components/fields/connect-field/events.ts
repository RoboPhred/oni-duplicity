import { modifyOniSave } from "@/actions/modify-onisave";

import { EditorFieldProps } from "./props";
import { Dispatch } from "redux";

function mapDispatchToProps(dispatch: Dispatch, props: EditorFieldProps) {
  return {
    onChange(value: string) {
      dispatch(modifyOniSave(props.path, value));
    }
  };
}
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export default mapDispatchToProps;
