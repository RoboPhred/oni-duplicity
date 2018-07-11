import {
  AccessoryType,
  ACCESSORY_BODY_NAMES,
  ACCESSORY_EYE_NAMES,
  ACCESSORY_HAIR_NAMES,
  ACCESSORY_HEAD_NAMES,
  ACCESSORY_MOUTH_NAMES
} from "oni-save-parser";

// TODO: This should be in oni-save-parser
const ACCESSORIES_BY_TYPE: Record<AccessoryType, string[] | null> = {
  body: ACCESSORY_BODY_NAMES,
  hat: null,
  hat_hair: null,
  hair_always: null,
  hair: ACCESSORY_HAIR_NAMES,
  headshape: ACCESSORY_HEAD_NAMES,
  eyes: ACCESSORY_EYE_NAMES,
  mouth: ACCESSORY_MOUTH_NAMES,
  neck: null,
  arm: null
};
export default ACCESSORIES_BY_TYPE;
