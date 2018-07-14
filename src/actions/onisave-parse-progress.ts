export const ACTION_ONISAVE_PARSE_PROGRESS = "onisave/parse-progress";
export const parseProgress = (message: string) => ({
  type: ACTION_ONISAVE_PARSE_PROGRESS as typeof ACTION_ONISAVE_PARSE_PROGRESS,
  payload: { message }
});
export type ParseProgressAction = ReturnType<typeof parseProgress>;
