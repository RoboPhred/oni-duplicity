import { connect } from "react-redux";

import { createStructuredSelector } from "@/state";
import { saveGameSelector } from "@/services/oni-save/selectors/save-game";

const mapStateToProps = createStructuredSelector({
  saveGame: saveGameSelector
});

export default connect(mapStateToProps);
