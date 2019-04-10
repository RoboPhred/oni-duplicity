import { connect } from "react-redux";

import { createStructuredSelector } from "@/state";
import { loadingErrorMessageSelector } from "@/services/oni-save/selectors/loading-status";

const mapStateToProps = createStructuredSelector({
  errorMessage: loadingErrorMessageSelector
});

export default connect(mapStateToProps);
