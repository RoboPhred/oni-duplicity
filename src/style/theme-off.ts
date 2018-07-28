// import { Background } from "./background";
// import { Intent } from "./intent";

// // https://coolors.co/33658a-ffb238-86bbd8-f34213-758e4f
// const intentColors: Record<Intent, string> = {
//   default: "#86BBD8",
//   primary: "#FFB238",
//   secondary: "#658E27",
//   dangerous: "#F34213",
//   hint: "#86BBD8"
// };

// /**
//  * Colors to use when the background is an intent.
//  */
// const textIntentContrastColors: Record<Intent, string> = {
//   default: "black",
//   primary: "black",
//   secondary: "black",
//   dangerous: "white",
//   hint: "black"
// };

// // https://coolors.co/313e50-3a435e-455561-5c6672-6c6f7f
// const backgroundColors: Record<Background, string> = {
//   default: "#313a57", //"#3A435E",
//   navbar: "#355d95", //"#313E50",
//   panel: "#36444f", //"#455561",
//   separator: "#6C6F7F"
// };

// const colors = {
//   text: intentColors.default,
//   intent: intentColors,
//   textIntentContrast: textIntentContrastColors,
//   bg: backgroundColors
// };

// export const enum Space {
//   None,
//   Small,
//   Medium,
//   Large
// }
// const space = [0, 4, 8, 12];

// export const enum FontSize {
//   Hint = 0,
//   Small = 0,

//   Button = 1,

//   Default = 2,
//   HeadingMinor = 3,
//   Heading = 4
// }
// const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96, 128];

// export const enum Radii {
//   None = 0,

//   Small = 1,
//   Button = 1,

//   Medium = 2,
//   Large = 3
// }
// const radii = [0, 2, 4, 8];

// export const enum Border {
//   None,
//   Normal,
//   Thick
// }
// const borders = [0, "1px solid", "2px solid"];

// export const theme = {
//   colors,
//   space,
//   fontSizes,
//   radii,
//   borders
// };

// export type Theme = typeof theme;

// export function getTheme(props: any): Theme {
//   return props.theme || theme;
// }
