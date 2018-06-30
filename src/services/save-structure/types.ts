/**
 * Data properties describing the save structure item at this point.
 */
export type SaveStructureItemCore<T> = {
  $match?(obj: any): boolean;
  $title?(obj: any): string;
  $editor?: string;
  $selectEditorValue?: string[];
  $selectChildRoot?: string[];
  $variants?: SaveStructureItem<T>[];
};

/**
 * Type describing the properties of T as SaveStructureItems,
 * taking care to exclude SaveStructureItemCore reserved properties.
 *
 * It also provides a catch-all "any property or index" under the "*" key.
 */
// Note: We used to check for array as a special case, but it
//  makes life difficult whenusing untyped SaveStructureItem,
//  as 'any' extends any[]
/*T extends any[]
   ? { [P: number]: SaveStructureItem<Indexer<T>> }
  : */
export type SaveStructurePropIndexer<T> = {
  [P in Exclude<keyof T, keyof SaveStructureItemCore<T>>]?: SaveStructureItem<
    T[P]
  >
} & { "*"?: SaveStructureItem<Indexer<T>> };

/**
 * A type for describing features of a property on the save structure.
 * This describes behavior for this property through SaveStructureItemCore,
 * plus optionally describes sub-items (object props or array indexes).
 */
export type SaveStructureItem<T = any> = SaveStructureItemCore<T> &
  SaveStructurePropIndexer<T>;
