/**
 * Data properties describing the save structure item at this point.
 */
export type SaveStructureItemCore<T> = {
  $match?(obj: any): boolean;
  $title?(obj: any): string;
  $advanced?: boolean;
  $editor?: string;
  $selectEditorValue?: string[];
  $selectChildRoot?: string[];
  $variants?: SaveStructureItem<T>[];
};

export type SaveStructureItemProps<T> = Exclude<
  keyof T,
  keyof SaveStructureItemCore<T>
>;

/**
 * Type describing the properties of T as SaveStructureItems,
 * taking care to exclude SaveStructureItemCore reserved properties.
 *
 * It also provides a catch-all "any property or index" under the "*" key.
 */
export type SaveStructurePropIndexer<T> = {
  [P in SaveStructureItemProps<T>]?: SaveStructureItem<T[P]>
} & { "*"?: SaveStructureItem<Indexer<T>> };

/**
 * A type for describing features of a property on the save structure.
 * This describes behavior for this property through SaveStructureItemCore,
 * plus optionally describes sub-items (object props or array indexes).
 */
export type SaveStructureItem<T = any> = SaveStructureItemCore<T> &
  SaveStructurePropIndexer<T>;
