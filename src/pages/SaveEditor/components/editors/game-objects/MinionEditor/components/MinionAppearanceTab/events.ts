import { setAccessory } from "@/actions/behaviors/set-accessory";

const mapDispatchToProps = {
  onSetAccessory: setAccessory
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
