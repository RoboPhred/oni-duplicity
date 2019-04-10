import { connect } from "react-redux";
import { createStructuredSelector } from "@/state";
import { isMockSelector } from "@/services/oni-save/selectors/save-game";

const mapStateToProps = createStructuredSelector({
  isExample: isMockSelector
});

export default connect(mapStateToProps);
