
// TODO: move to oni-save-parser

import { makeAccessoryID } from "./utils";

export const EYES: string[] = [
    1,
    2,
    3,
    4,
    5
].map(x =>  makeAccessoryID("eyes", x));

export const HEADS: string[] = [
    1,
    2,
    3,
    4
].map(x => makeAccessoryID("headshape", x));

export const MOUTHS: string[] = [
    1,
    2,
    3,
    4
].map(x => makeAccessoryID("mouth", x));

export const HAIRS: string[] = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    27,
    28,
    29,
    30,
    31,
    32,
    33
].map(x => makeAccessoryID("hair", x));

export const BODIES: string[] = [
    1,
    2,
    3,
    4
].map(x => makeAccessoryID("body", x));
