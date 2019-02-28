import { AnyAction } from "redux";

export const ACTION_ONISAVE_PARSE_PROGRESS = "onisave/parse-progress";

export const parseProgress = (message: string) => ({
  type: ACTION_ONISAVE_PARSE_PROGRESS as typeof ACTION_ONISAVE_PARSE_PROGRESS,
  payload: { message }
});

export type ParseProgressAction = ReturnType<typeof parseProgress>;

export function isParseProgressAction(
  action: AnyAction
): action is ParseProgressAction {
  return action.type === ACTION_ONISAVE_PARSE_PROGRESS;
}
