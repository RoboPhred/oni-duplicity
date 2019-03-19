import { KPrefabIDBehavior, SaveGame, AITraitsBehavior } from "oni-save-parser";

import mockState from "@/__mocks__/active-state";

import { defaultOniSaveState, OniSaveState, LoadingStatus } from "../state";

import { mergeBehaviors } from "../actions/merge-behaviors";
import mergeBehaviorsReducer from "./merge-behaviors";
import { createBehavior } from "../test-utils";
import { getGameObjectById } from "../utils";

describe("mergeBehaviorsReducer", () => {
  describe("no-op cases", () => {
    it("makes no changes when the save game is not present", () => {
      const state = defaultOniSaveState;
      const action = mergeBehaviors(1, {});

      const resultState = mergeBehaviorsReducer(state, action);

      expect(resultState).toBe(state);
    });

    it("makes no changes when the action is not the correct type", () => {
      const state = mockState.services.oniSave;
      const action = {
        ...mergeBehaviors(1, {
          [KPrefabIDBehavior]: { templateData: { InstanceID: 1 } }
        }),
        type: "another-action"
      };

      const resultState = mergeBehaviorsReducer(state, action);

      expect(resultState).toBe(state);
    });
  });

  describe("operational cases", () => {
    const mockObjectId = 1;
    let mockSaveGame: DeepPartial<SaveGame>;
    let state: OniSaveState;
    beforeEach(() => {
      mockSaveGame = {
        gameObjects: [
          {
            name: "Minion",
            gameObjects: [
              {
                behaviors: [
                  createBehavior(KPrefabIDBehavior, {
                    templateData: {
                      InstanceID: mockObjectId
                    }
                  }),
                  createBehavior(AITraitsBehavior, {
                    templateData: {
                      TraitIds: ["Trait1", "Trait2"]
                    }
                  })
                ]
              }
            ]
          }
        ]
      };
      state = {
        ...defaultOniSaveState,
        loadingStatus: LoadingStatus.Ready,
        saveGame: mockSaveGame as SaveGame
      };
    });

    it("replaces existing behavior templateData", () => {
      const newTraits = ["NewTrait"];
      const action = mergeBehaviors(mockObjectId, {
        [AITraitsBehavior]: {
          templateData: {
            TraitIds: newTraits
          }
        }
      });

      const newState = mergeBehaviorsReducer(state, action);

      const gameObject = getGameObjectById(newState.saveGame!, mockObjectId)!;

      expect(gameObject.behaviors).toContainEqual(
        createBehavior(AITraitsBehavior, {
          templateData: {
            TraitIds: newTraits
          }
        })
      );
    });

    it("marks the save as modified", () => {
      const newTraits = ["NewTrait"];
      const action = mergeBehaviors(mockObjectId, {
        [AITraitsBehavior]: {
          templateData: {
            TraitIds: newTraits
          }
        }
      });

      const newState = mergeBehaviorsReducer(state, action);

      expect(newState.isModified).toBeTruthy();
    });
  });
});
