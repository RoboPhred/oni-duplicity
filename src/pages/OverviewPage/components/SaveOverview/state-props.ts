import { createStructuredSelector, createSelector } from "reselect";

import { AppState } from "@/state";

import { saveGameSelector } from "@/services/oni-save/selectors/save-game";

export interface StateProps {
  saveName: string;
  cycleCount: number;
}

const mapDispatchToProps = createStructuredSelector<AppState, StateProps>({
  saveName: createSelector(
    saveGameSelector,
    game => (game && game.header.gameInfo.baseName) || ""
  ),
  cycleCount: createSelector(
    saveGameSelector,
    game => (game && game.header.gameInfo.numberOfCycles) || 0
  )
});
export default mapDispatchToProps;
