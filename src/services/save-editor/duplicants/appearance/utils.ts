import { Accessory } from "../../behaviors";

// TODO: move these to oni-save-parser

const ACCESSORY_PREFIX = "Root.Accessories.";
const TYPE_EXTRACTOR_REGEX = /^Root\.Accessories\.([a-zA-Z_]+)_(\d\d\d)$/;

export function getIndexOfType(accessories: Accessory[], type: string): number {
    return accessories.findIndex(acc => {
        const guid = acc.guid.Guid;
        const match = TYPE_EXTRACTOR_REGEX.exec(guid);
        if (!match) return false;
        return match[1] === type;
    });
}

export function getAccessoryType(accessoryID: string): string | null {
    const match = TYPE_EXTRACTOR_REGEX.exec(accessoryID);
    if (!match) return null;
    return match[1];
}

export function getAccessoryOrdinal(accessoryID: string): number | null {
    const match = TYPE_EXTRACTOR_REGEX.exec(accessoryID);
    if (!match) return null;
    // These all start at 1, so its safe to assume null here if we
    //  didn't parse a number.
    return Number(match[2]) || null;
}

export function makeAccessoryID(type: string, ordinal: number): string {
    return `${ACCESSORY_PREFIX}${type}_${leftPad(ordinal, "0", 3)}`
}

export function getAccessoryOfType(accessories: Accessory[], type: string): Accessory | null {
    const index = getIndexOfType(accessories, type);
    if (index === -1) return null;
    return accessories[index];
}

function leftPad(str: any, pad: string, length: number): string {
    str = String(str);
    if (pad.length == 0) return str;

    while (str.length < length) {
        str = pad + str;
    }

    return str;
}