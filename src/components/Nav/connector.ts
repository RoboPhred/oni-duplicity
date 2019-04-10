import { connect } from "react-redux";

import { createStructuredSelector } from "@/state";

import { hasSaveSelector } from "@/services/oni-save/selectors/save-game";

const mapStateToProps = createStructuredSelector({
  hasSave: hasSaveSelector
});

export default connect(mapStateToProps);
