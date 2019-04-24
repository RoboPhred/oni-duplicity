import { KPrefabIDBehavior, SaveGame, getBehavior } from "oni-save-parser";

import mockState from "@/__mocks__/active-state";

import { defaultOniSaveState, OniSaveState, LoadingStatus } from "../state";
import { modifyBehaviorPath } from "../actions/modify-behavior-path";

import { createBehavior } from "../test-utils";
import { getGameObjectById } from "../utils";

import modifyBehaviorPathReducer from "./modify-behavior-path";

describe("modifyBehaviorPathReducer", () => {
  describe("no-op cases", () => {
    it("makes no changes when the save game is not present", () => {
      const state = defaultOniSaveState;
      const action = modifyBehaviorPath(
        1,
        KPrefabIDBehavior,
        ["templateData", "InstanceID"],
        1
      );

      const resultState = modifyBehaviorPathReducer(state, action);

      expect(resultState).toBe(state);
    });

    it("makes no changes when the action is not the correct type", () => {
      const state = mockState.services.oniSave;
      const action = {
        ...modifyBehaviorPath(
          1,
          KPrefabIDBehavior,
          ["templateData", "InstanceID"],
          1
        ),
        type: "another-action"
      };

      const resultState = modifyBehaviorPathReducer(state, action);

      expect(resultState).toBe(state);
    });
  });

  describe("operational cases", () => {
    const mockGameObjectId = 1;
    const behaviorName = "CustomBehavior";
    const behaviorPath = ["templateData", "foo"] as const;
    const newValue = 42;

    const action = modifyBehaviorPath(
      mockGameObjectId,
      behaviorName,
      behaviorPath as any,
      newValue
    );

    let mockSaveGame: DeepPartial<SaveGame>;
    let state: OniSaveState;
    beforeEach(() => {
      mockSaveGame = {
        gameObjects: [
          {
            name: `Minion`,
            gameObjects: [
              {
                behaviors: [
                  createBehavior(KPrefabIDBehavior, {
                    templateData: {
                      InstanceID: mockGameObjectId
                    }
                  }),
                  {
                    name: behaviorName,
                    templateData: {
                      foo: 1
                    } as any
                  }
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

    it("sets a template value", function() {
      const resultState = modifyBehaviorPathReducer(state, action);

      const gameObject = getGameObjectById(
        resultState.saveGame!,
        mockGameObjectId
      );
      const behavior = getBehavior(gameObject!, behaviorName)!;

      expect(behavior.templateData.foo).toBe(newValue);
    });

    it("marks the save as modified", () => {
      const resultState = modifyBehaviorPathReducer(state, action);

      expect(resultState.isModified).toBeTruthy();
    });
  });
});
