import { connect } from "react-redux";

import { createStructuredSelector } from "@/state";
import { loadingStatusSelector } from "@/services/oni-save/selectors/loading-status";

const mapStateToProps = createStructuredSelector({
  loadingStatus: loadingStatusSelector
});

export default connect(mapStateToProps);
