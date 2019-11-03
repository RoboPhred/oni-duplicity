import { find } from "lodash";
import {
  SaveGame,
  GeyserTypeNames,
  KPrefabIDBehavior,
  GeyserBehavior,
  GeyserType,
  getBehavior
} from "oni-save-parser";

import mockState from "@/__mocks__/active-state";

import { OniSaveState, defaultOniSaveState, LoadingStatus } from "../state";
import { changeGeyserType } from "../actions/change-geyser-type";

import changeGeyserTypeReducer from "./change-geyser-type";

import { getGameObjectById } from "../utils";

import { createBehavior } from "../test-utils";

describe("changeGeyserTypeReducer", () => {
  describe("no-op cases", () => {
    it("makes no changes when the save game is not present", () => {
      const state = defaultOniSaveState;
      const action = changeGeyserType(1, GeyserTypeNames[1]);

      const resultState = changeGeyserTypeReducer(state, action);

      expect(resultState).toBe(state);
    });

    it("makes no changes when the action is not the correct type", () => {
      const state = mockState.services.oniSave;
      const action = {
        ...changeGeyserType(1, GeyserTypeNames[1]),
        type: "another-action"
      };

      const resultState = changeGeyserTypeReducer(state, action);

      expect(resultState).toBe(state);
    });
  });

  describe("operational cases", () => {
    const mockGameObjectId = 1;
    const newGeyserType = GeyserTypeNames[1];
    const action = changeGeyserType(mockGameObjectId, newGeyserType);

    let mockSaveGame: DeepPartial<SaveGame>;
    let state: OniSaveState;
    beforeEach(() => {
      const geyserType = GeyserTypeNames[0];
      mockSaveGame = {
        gameObjects: [
          {
            name: `GeyserGeneric_${geyserType}`,
            gameObjects: [
              {
                behaviors: [
                  createBehavior(KPrefabIDBehavior, {
                    templateData: {
                      InstanceID: mockGameObjectId
                    }
                  }),
                  createBehavior(GeyserBehavior, {
                    templateData: {
                      configuration: {
                        typeId: GeyserType[geyserType],
                        iterationLengthRoll: 1,
                        iterationPercentRoll: 1,
                        rateRoll: 1,
                        yearLengthRoll: 1,
                        yearPercentRoll: 1
                      }
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

    it("changes the geyser's typeId to match the specified type", () => {
      const resultState = changeGeyserTypeReducer(state, action);

      const gameObject = getGameObjectById(
        resultState.saveGame!,
        mockGameObjectId
      );
      expect(gameObject).toBeDefined();

      const geyserBehavior = getBehavior(gameObject!, GeyserBehavior);
      expect(geyserBehavior!.templateData.configuration!.typeId.hash).toBe(
        GeyserType[newGeyserType].hash
      );
    });

    it("changes the geyser's game object type to the specified type", () => {
      const resultState = changeGeyserTypeReducer(state, action);

      const typeName = `GeyserGeneric_${newGeyserType}`;
      const gameObjectGroups = resultState.saveGame!.gameObjects;
      expect(gameObjectGroups).toContainEqual(
        expect.objectContaining({ name: typeName })
      );

      // Ensure the group contains our moved object by id.
      const group = find(gameObjectGroups, x => x.name === typeName)!;
      expect(group.gameObjects).toContainEqual(
        expect.objectContaining({
          behaviors: expect.arrayContaining([
            createBehavior(KPrefabIDBehavior, {
              templateData: {
                InstanceID: mockGameObjectId
              }
            })
          ])
        })
      );
    });

    it("marks the save as modified", () => {
      const resultState = changeGeyserTypeReducer(state, action);

      expect(resultState.isModified).toBeTruthy();
    });
  });
});
