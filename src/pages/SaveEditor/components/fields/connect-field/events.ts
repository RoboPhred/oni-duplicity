import { modifyOniSave } from "@/actions/modify-onisave";

import { EditorFieldProps } from "./props";
import { Dispatch } from "redux";

function mapDispatchToProps(dispatch: Dispatch, props: EditorFieldProps) {
  return {
    onCommit(value: any) {
      if (props.writeTo) {
        props.writeTo.forEach(path => {
          dispatch(modifyOniSave(props.path, value));
        });
      } else {
        dispatch(modifyOniSave(props.path, value));
      }
    }
  };
}
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export default mapDispatchToProps;
