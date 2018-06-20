import { AppState, defaultAppState } from "@/store/state";
import { Action } from "redux";

export default function reducer(
  state: AppState = defaultAppState,
  action: Action
) {
  return state;
}
