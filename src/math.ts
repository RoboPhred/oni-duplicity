interface ConstrainedArrayConstructor {
  new (length: number): {
    [value: number]: number;
  };
}

function createClamp(
  type: ConstrainedArrayConstructor
): (value: number) => number {
  const clampArray = new type(1);
  return (value: number) => {
    clampArray[0] = value;
    return clampArray[0];
  };
}

export type NumberPrecision =
  | "int8"
  | "uint8"
  | "int16"
  | "uint16"
  | "int32"
  | "uint32"
  | "single"
  | "double";

export const clampInt8 = createClamp(Int8Array);
export const clampUInt8 = createClamp(Uint8Array);

export const clampInt16 = createClamp(Int16Array);
export const clampUInt16 = createClamp(Uint16Array);

export const clampInt32 = createClamp(Int32Array);
export const clampUInt32 = createClamp(Uint32Array);

export const clampSingle = createClamp(Float32Array);
export const clampDouble = createClamp(Float64Array);

const CLAMPS_BY_PRECISION: Record<
  NumberPrecision,
  (value: number) => number
> = {
  int8: clampInt8,
  uint8: clampUInt8,
  int16: clampInt16,
  uint16: clampUInt16,
  int32: clampInt32,
  uint32: clampUInt32,
  single: clampSingle,
  double: clampDouble
};

export function clamp(precision: NumberPrecision, value: number): number {
  const clamper = CLAMPS_BY_PRECISION[precision];
  if (!clamper) {
    throw new Error(`Unknown precision "${precision}".`);
  }

  return clamper(value);
}

export function isFloatingPoint(
  precision: NumberPrecision
): precision is "single" | "double" {
  return precision === "single" || precision === "double";
}

export function compare(a: number, b: number, sortAscending?: boolean) {
  if (a > b) return sortAscending ? 1 : -1;
  if (a < b) return sortAscending ? -1 : 1;
  return 0;
}
