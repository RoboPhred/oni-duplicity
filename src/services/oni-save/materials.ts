import { SimHashNames } from "oni-save-parser";

// TODO: Seeds, clothing, other sweepables
export const MaterialGameObjectNames = [...SimHashNames];
export type MaterialObjectName = ArrayValues<typeof MaterialGameObjectNames>;
