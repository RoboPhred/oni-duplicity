import { createStructuredSelector } from "@/state";

import { saveGameSelector } from "../../selectors/save-game";

const mapStateToProps = createStructuredSelector({
  saveGame: saveGameSelector
});
export type StateProps = ReturnType<typeof mapStateToProps>;
export default mapStateToProps;
