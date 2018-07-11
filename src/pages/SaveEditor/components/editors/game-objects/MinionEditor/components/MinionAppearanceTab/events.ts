import { setAccessory } from "@/actions/set-accessory";

const mapDispatchToProps = {
  onSetAccessory: setAccessory
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
