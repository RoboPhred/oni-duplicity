import { connect } from "react-redux";

import { loadExampleSave } from "@/services/oni-save/actions/load-example";

const mapDispatchToProps = {
  onLoadExampleSave: loadExampleSave
};

export default connect(
  null,
  mapDispatchToProps
);
