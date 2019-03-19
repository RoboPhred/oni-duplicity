import {
  KPrefabIDBehavior,
  MinionIdentityBehavior,
  getBehavior,
  GameObjectGroup,
  GameObject
} from "oni-save-parser";

import mockState from "@/__mocks__/active-state";

import { defaultOniSaveState, OniSaveState } from "../state";
import { cloneDuplicant } from "../actions/clone-duplicant";

import cloneDuplicantReducer from "./clone-duplicant";

import { createBehavior } from "../test-utils";
import { getGameObjectId } from "../utils";

describe("cloneDuplicantReducer", () => {
  describe("no-op cases", () => {
    it("makes no changes when the save game is not present", () => {
      const state = defaultOniSaveState;
      const action = cloneDuplicant(1);

      const resultState = cloneDuplicantReducer(state, action);

      expect(resultState).toBe(state);
    });

    it("makes no changes when the action is not the correct type", () => {
      const state = mockState.services.oniSave;
      const action = {
        ...cloneDuplicant(1),
        type: "another-action"
      };

      const resultState = cloneDuplicantReducer(state, action);

      expect(resultState).toBe(state);
    });
  });

  describe("operational cases", () => {
    const nextUniqueID = 40;
    const duplicantId = 36;
    const duplicantName = "FooBar";
    const initialState: DeepPartial<OniSaveState> = {
      saveGame: {
        settings: {
          nextUniqueID
        },
        gameObjects: [
          {
            name: "Minion",
            gameObjects: [
              {
                behaviors: [
                  createBehavior(KPrefabIDBehavior, {
                    templateData: {
                      InstanceID: duplicantId
                    }
                  }),
                  createBehavior(MinionIdentityBehavior, {
                    templateData: {
                      name: duplicantName
                    }
                  })
                ]
              }
            ]
          }
        ]
      }
    };
    const action = cloneDuplicant(duplicantId);

    let finalState: OniSaveState;
    let minionGroup: GameObjectGroup;
    let originalMinion: GameObject | undefined;
    let clonedMinion: GameObject | undefined;
    beforeAll(() => {
      finalState = cloneDuplicantReducer(initialState as OniSaveState, action);

      minionGroup = finalState.saveGame!.gameObjects.find(
        x => x.name === "Minion"
      )!;

      // Choose the duplicant with the original ID.
      //  If the original's ID is changed, cloneMinion will be null and fail tests
      originalMinion = minionGroup.gameObjects.find(
        x => getGameObjectId(x) === duplicantId
      );

      // Choose the duplicant that has a differing ID.
      clonedMinion = minionGroup.gameObjects.find(
        x => getGameObjectId(x) !== duplicantId
      );
    });

    it("leaves the original duplicant unmodified", () => {
      const originalStateMinion = (initialState as OniSaveState).saveGame!
        .gameObjects[0].gameObjects[0];
      expect(originalMinion).toEqual(originalStateMinion);
    });

    it("creates a new duplicant", () => {
      expect(minionGroup.gameObjects.length).toBe(2);
    });

    it("gives the duplicant the next unique ID", () => {
      expect(clonedMinion).toBeDefined();
      expect(getGameObjectId(clonedMinion!)).toBe(nextUniqueID);
    });

    it("increments the next unique ID", () => {
      expect(finalState.saveGame!.settings.nextUniqueID).toBe(nextUniqueID + 1);
    });

    it("renames the new duplicant", () => {
      expect(clonedMinion).toBeDefined();

      const identityBehavior = getBehavior(
        clonedMinion!,
        MinionIdentityBehavior
      );
      expect(identityBehavior!.templateData.name).toEqual(
        `Clone of ${duplicantName}`
      );
    });
  });
});
