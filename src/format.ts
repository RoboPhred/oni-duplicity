import { Vector3, SimHashes, HashedString } from "oni-save-parser";

const POSITION_PRECISION = 4;

export function formatPositionValue(v: number): string {
  return v.toPrecision(POSITION_PRECISION);
}

export function formatPosition(p: Vector3) {
  return `(${formatPositionValue(p.x)}, ${formatPositionValue(p.y)})`;
}

export function formatSimHash(hash: SimHashes): string {
  return SimHashes[hash];
}

export function formatDisease(diseaseId: HashedString): string {
  // TODO: Look up from oni-save-parser
  return `Disease(${diseaseId.hash})`;
}
