import gameObjectsStructure from "./gameObjects";
import { SaveStructureItem } from "../types";
import { SaveGame } from "oni-save-parser";

// The default 'any' makes this useful for variables, but useless for asignment.
//  This is because type 'any' includes all fields, and overrides our selective
//  exclusion of $-prefix fields
const defaultAdvancedField: SaveStructureItem<{}> = { $advanced: true };

const saveStructure: SaveStructureItem<SaveGame> = {
  $editor: "save-root",
  $title: (obj: SaveGame) => `${obj.header.gameInfo.baseName} [save file]`,

  /**
   * Version info and precalculated values.
   * Changing this stuff can confuse the game or display bad data
   * for the loading screen.
   */
  header: defaultAdvancedField,

  /**
   * Data templates for the rest of the save.  Changing anything in here
   * is guarenteed to result in a corrupt save.
   */
  templates: defaultAdvancedField,

  /**
   * World width and height, and opaque engine data we do not understand.
   * Contents of the worldmap and state of the fluid/gas/electrical networks
   * live in here.
   */
  world: defaultAdvancedField,

  /**
   * Settings for the master game object handler.
   * None of these are related to user-settings, and changing them
   * will most likely result in an immediately or eventually corrupt save.
   */
  settings: defaultAdvancedField,

  /**
   * Game version info.  Should mirror the same data
   * stored in header.
   * Should never be touched, as ONI makes decisions on how to load the file
   * based on this.
   */
  version: defaultAdvancedField,

  /**
   * Game objects.  These are the interesting bits
   */
  gameObjects: gameObjectsStructure,

  /**
   * Another blob of generalized non-object-specific game data
   */
  gameData: {
    /**
     * Presumably tracks the flow of material through the gas conduits.
     * I am reasonably sure this also ties into native game data,
     * and changing this will probably get the engine into an
     * inconsistant state.
     */
    gasConduitFlow: defaultAdvancedField,

    /**
     * Presumably tracks the flow of material through the loquid conduits.
     * I am reasonably sure this also ties into native game data,
     * and changing this will probably get the engine into an
     * inconsistant state.
     */
    liquidConduitFlow: defaultAdvancedField,

    /**
     * Probably deals with limiting the area of the map that the game is running logic for.
     */
    simActiveRegionMin: defaultAdvancedField,

    /**
     * Probably deals with limiting the area of the map that the game is running logic for.
     */
    simActiveRegionMax: defaultAdvancedField,

    fallingWater: defaultAdvancedField,

    unstableGround: defaultAdvancedField,

    /**
     * While this does contain (multiple) worldgen seeds,
     *  all seeds are the same and reflect the definitivie chosen seed in customGameSettings.
     * It also has a bunch of polygons indicating regions of the overworld.  Not sure what it represents,
     *  might be biome regions.
     */
    worldDetail: defaultAdvancedField,

    customGameSettings: {
      $selectChildRoot: ["CurrentQualityLevelsBySetting"]
    } as SaveStructureItem
  }
};
export default saveStructure;
