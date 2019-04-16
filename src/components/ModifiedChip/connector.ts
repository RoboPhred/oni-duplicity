import { connect } from "react-redux";

import { createStructuredSelector } from "@/state";
import { isSaveModifiedSelector } from "@/services/oni-save/selectors/save-game";

const mapStateToProps = createStructuredSelector({
  isModified: isSaveModifiedSelector
});

export default connect(mapStateToProps);
