import { modifyOniSave } from "@/actions/modify-onisave";

import { ItemEditableTextProps } from "./props";
import { Dispatch } from "redux";

function mapDispatchToProps(dispatch: Dispatch, props: ItemEditableTextProps) {
  return {
    onChange(value: string) {
      dispatch(modifyOniSave(props.saveItemPath, value));
    }
  };
}
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
export default mapDispatchToProps;
