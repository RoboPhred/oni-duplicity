import { connect } from "react-redux";
import { goBack } from "connected-react-router";

const mapDispatchToProps = {
  onClick: goBack
};

export default connect(
  null,
  mapDispatchToProps
);
