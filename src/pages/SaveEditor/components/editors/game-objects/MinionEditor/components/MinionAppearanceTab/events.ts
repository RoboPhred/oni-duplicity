import { setIdentityGender } from "@/actions/behaviors/set-identity-gender";
import { setAccessory } from "@/actions/behaviors/set-accessory";
import { setGameObjectScale } from "@/actions/game-object/set-scale";

const mapDispatchToProps = {
  onSetScale: setGameObjectScale,
  onSetGender: setIdentityGender,
  onSetAccessory: setAccessory
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
