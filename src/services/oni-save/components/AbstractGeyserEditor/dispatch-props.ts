import { Dispatch } from "redux";

import {
  modifyBehavior,
  BehaviorDataTarget
} from "../../actions/modify-behavior";
import { changeGeyserType } from "../../actions/change-geyser-type";

import { AbstractGeyserEditorProps } from "./props";
import { GeyserBehavior } from "oni-save-parser";

export default function mapDispatchToProps(
  dispatch: Dispatch,
  props: AbstractGeyserEditorProps
) {
  return {
    onChangeEmitRate: (value: number) =>
      dispatch(
        modifyBehavior(
          props.gameObjectId,
          GeyserBehavior,
          BehaviorDataTarget.Template,
          {
            configuration: {
              rateRoll: value
            }
          },
          true
        )
      ),
    onChangeGeyserType: (type: string) =>
      dispatch(changeGeyserType(props.gameObjectId, type))
  };
}
export type DispatchProps = ReturnType<typeof mapDispatchToProps>;
