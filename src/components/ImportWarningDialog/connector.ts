import { connect } from "react-redux";

import { createStructuredSelector } from "@/state";

import { warnInputChecksumSelector } from "@/services/oni-save/selectors/ui-state";
import { importConfirm } from "@/services/oni-save/actions/import-behaviors";

const mapStateToProps = createStructuredSelector({
  isOpen: warnInputChecksumSelector
});

const mapDispatchToProps = {
  onConfirm: () => importConfirm(true),
  onCancel: () => importConfirm(false)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
