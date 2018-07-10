import { createStructuredSelector } from "reselect";

import { AppState } from "@/state";

import editMode from "@/selectors/edit-mode-selector";

const structuredSelector = {
  currentEditMode: editMode
};
export type StateProps = StructuredStateProps<typeof structuredSelector>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector
);
export default mapStateToProps;
