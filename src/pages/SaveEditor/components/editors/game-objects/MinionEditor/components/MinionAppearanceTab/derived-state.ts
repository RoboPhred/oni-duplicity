import { Selector, createStructuredSelector, createSelector } from "reselect";

import {
  ACCESSORY_TYPES,
  GameObject,
  AccessorizerBehavior,
  getBehavior,
  AccessoryType,
  getAccessoryOfType,
  getAccessoryOrdinal
} from "oni-save-parser";

import { AppState } from "@/state";

import selectedValue from "@/selectors/selected-value";
import selectedPath from "@/selectors/selected-path";

const behavior = createSelector(selectedValue, (gameObject: GameObject) => {
  if (!gameObject) {
    return null;
  }
  return getBehavior(gameObject, AccessorizerBehavior);
});

function createAccessorySelector(
  accessoryType: AccessoryType
): Selector<AppState, number | null> {
  return createSelector(behavior, behavior => {
    if (!behavior) {
      return null;
    }

    const { accessories } = behavior.templateData;

    const accessory = getAccessoryOfType(accessories, accessoryType);
    if (!accessory) {
      return null;
    }

    return getAccessoryOrdinal(accessory);
  });
}

const structuredSelector = {
  selectedPath
};
ACCESSORY_TYPES.forEach(x => {
  (structuredSelector as any)[x] = createAccessorySelector(x);
});
export type StateProps = StructuredStateProps<
  typeof structuredSelector & Record<AccessoryType, string | null>
>;
const mapStateToProps = createStructuredSelector<AppState, StateProps>(
  structuredSelector as any
);
export default mapStateToProps;
