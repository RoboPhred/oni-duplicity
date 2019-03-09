import { AppState } from "@/state";

export default function mapStateToProps(state: AppState) {
  return {
    isOpen: state.services.oniSave.warnInputChecksum
  };
}
export type StateProps = ReturnType<typeof mapStateToProps>;
