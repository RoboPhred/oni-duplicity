import { setTrait } from "@/actions/behaviors/set-traits-trait";

const mapDispatchToProps = {
  onSetTrait: setTrait
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
