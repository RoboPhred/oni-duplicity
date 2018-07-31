import { SaveGame } from "oni-save-parser";

export type ValueSelector<T> =
  | T
  | ((value: any, path: string[], oniSave: SaveGame) => T);

/**
 * Data properties describing the save structure item at this point.
 */
export type SaveStructureDefCore<T> = {
  /**
   * Defines name of this item in the ui path.
   * If the value is a string, the string will be used
   * as the name of the path segment.
   *
   * If the value is false, the item will not act as a
   * path item.  Child items (if any) will flatten to the parent
   * in this case.
   */
  $uiPathName?: ValueSelector<string | false>;

  /**
   * Defines the child items under this item for the ui.
   *
   * It is critical to note that the paths returned should be
   * raw saveItemPaths relative to the represented value.
   *
   * If the value is false, the def is considered to have no children.
   */
  $uiChildren?: ValueSelector<string[][] | false>;

  /**
   * Whether this item should only show up in advanced edit mode.
   */
  $advanced?: ValueSelector<boolean>;

  /**
   * The type of save item this represents.
   * This is used to select the editors, and to
   * identify common targets when performing edit operations
   * on deeper data.
   */
  $editor?: string;

  /**
   * A function to generate the props to pass to the editor
   * when an item of this def is selected.
   */
  $editorProps?: ValueSelector<Record<string, any>>;

  /**
   * Other defs to try and merge into this def when resolving
   * a def for a specific item.
   *
   * The first variant whose $match function returns true will be merged into this def
   * for the item in question.
   */
  $variants?: SaveStructureDef<T>[];
  /**
   * Test to see if the object should be covered by this structure def.
   * This is intended for use to match variants specified by '$variants' of
   * the parent def.
   */
  $match?(obj: any): boolean;
};

export type SaveStructureDefProps<T> = Exclude<
  keyof T,
  keyof SaveStructureDefCore<T>
>;

/**
 * Type describing the properties of T as SaveStructureItems,
 * taking care to exclude SaveStructureItemCore reserved properties.
 *
 * It also provides a catch-all "any property or index" under the "*" key.
 */
export type SaveStructureDefPropIndexer<T> = {
  [P in SaveStructureDefProps<T>]?: SaveStructureDef<T[P]>
} & { "*"?: SaveStructureDef<Indexer<T>> };

/**
 * A type for describing features of a property on the save structure.
 * This describes behavior for this property through SaveStructureItemCore,
 * plus optionally describes sub-items (object props or array indexes).
 */
export type SaveStructureDef<T = any> = SaveStructureDefCore<T> &
  SaveStructureDefPropIndexer<T>;
