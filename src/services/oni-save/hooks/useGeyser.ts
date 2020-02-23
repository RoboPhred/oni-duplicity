import * as React from "react";
import { GeyserType, GeyserBehavior } from "oni-save-parser";
import { useSelector, useDispatch } from "react-redux";

import { AppState } from "@/state";

import { geyserConfigSelector } from "../selectors/geysers";
import { modifyBehavior, BehaviorDataTarget } from "../actions/modify-behavior";
import { changeGeyserType } from "../actions/change-geyser-type";
import { modifyBehaviorPath } from "../actions/modify-behavior-path";
import { changeGeyserParameter } from "../actions/change-geyser-parameter";

export interface UseGeyser {
  geyserType: string | null;
  emitRate: number | null;
  yearLength: number | null;
  yearActive: number | null;
  onChangeEmitRate(rate: number): void;
  onChangeGeyserType(type: string): void;
  onChangeYearLength(fraction: number): void;
  onChangeYearActive(fraction: number): void;
}

export default function useGeyser(gameObjectId: number): UseGeyser {
  const dispatch = useDispatch();
  const config = useSelector((state: AppState) =>
    geyserConfigSelector(state, gameObjectId)
  );

  const onChangeEmitRate = React.useCallback(
    (rate: number) => {
      dispatch(
        modifyBehavior(
          gameObjectId,
          GeyserBehavior,
          BehaviorDataTarget.Template,
          {
            configuration: {
              rateRoll: rate
            }
          },
          true
        )
      );
    },
    [dispatch, gameObjectId]
  );

  const onChangeGeyserType = React.useCallback(
    (type: string) => {
      dispatch(changeGeyserType(gameObjectId, type));
    },
    [dispatch, gameObjectId]
  );

  const onChangeYearLength = React.useCallback(
    (fraction: number) => {
      dispatch(changeGeyserParameter(gameObjectId, "yearLengthRoll", fraction));
    },
    [dispatch, gameObjectId]
  );

  const onChangeYearActive = React.useCallback(
    (fraction: number) => {
      dispatch(
        changeGeyserParameter(gameObjectId, "yearPercentRoll", fraction)
      );
    },
    [dispatch, gameObjectId]
  );

  return {
    geyserType: config ? GeyserType[config.typeId.hash] : null,
    emitRate: config ? config.rateRoll : null,
    yearLength: config ? config.yearLengthRoll : null,
    yearActive: config ? config.yearPercentRoll : null,
    onChangeEmitRate,
    onChangeGeyserType,
    onChangeYearLength,
    onChangeYearActive
  };
}
