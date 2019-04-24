import { KPrefabIDBehavior, SaveGame, getBehavior } from "oni-save-parser";

import mockState from "@/__mocks__/active-state";

import { defaultOniSaveState, OniSaveState, LoadingStatus } from "../state";
import { modifyBehavior, BehaviorDataTarget } from "../actions/modify-behavior";

import { createBehavior } from "../test-utils";
import { getGameObjectById } from "../utils";

import modifyBehaviorReducer from "./modify-behavior";

describe("modifyBehaviorReducer", () => {
  describe("no-op cases", () => {
    it("makes no changes when the save game is not present", () => {
      const state = defaultOniSaveState;
      const action = modifyBehavior(
        1,
        KPrefabIDBehavior,
        BehaviorDataTarget.Template,
        {}
      );

      const resultState = modifyBehaviorReducer(state, action);

      expect(resultState).toBe(state);
    });

    it("makes no changes when the action is not the correct type", () => {
      const state = mockState.services.oniSave;
      const action = {
        ...modifyBehavior(
          1,
          KPrefabIDBehavior,
          BehaviorDataTarget.Template,
          {}
        ),
        type: "another-action"
      };

      const resultState = modifyBehaviorReducer(state, action);

      expect(resultState).toBe(state);
    });
  });

  describe("operational cases", () => {
    describe.each<any>([
      ["TemplateData", BehaviorDataTarget.Template, "templateData"],
      ["ExtraData", BehaviorDataTarget.Extra, "extraData"]
    ])("%s", (_, dataTarget: BehaviorDataTarget, dataKey: string) => {
      const mockGameObjectId = 1;
      const behaviorName = "TestBehavior";
      const modifyContent = {
        valueA: 42
      };
      const action = modifyBehavior(
        mockGameObjectId,
        behaviorName,
        dataTarget,
        modifyContent
      );

      const behaviorData = {
        valueA: 1,
        valueB: 1
      };

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
                    { name: behaviorName, [dataKey]: behaviorData }
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

      it("spreads the data into the behavior", () => {
        const resultState = modifyBehaviorReducer(state, action);

        const gameObject = getGameObjectById(
          resultState.saveGame!,
          mockGameObjectId
        );
        const behavior = getBehavior(gameObject!, behaviorName);

        expect((behavior as any)[dataKey]).toEqual({
          ...behaviorData,
          ...modifyContent
        });
      });

      it("marks the save as modified", () => {
        const resultState = modifyBehaviorReducer(state, action);

        expect(resultState.isModified).toBeTruthy();
      });
    });
  });
});
