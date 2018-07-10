import {
  AlignSelfProps,
  JustifySelfProps,
  SpaceProps,
  alignSelf,
  justifySelf,
  space
} from "styled-system";

import styled from "@/theme";

import { TextProps as ThemeTextProps, text } from "@/theme";

import { attachProps } from "@/utils";

export type TextProps = ThemeTextProps &
  AlignSelfProps &
  JustifySelfProps &
  SpaceProps;
const Text = styled<TextProps, "span">("span")`
  ${text};
  ${alignSelf};
  ${justifySelf};
  ${space};
`;
Text.displayName = "Text";
export default attachProps(Text, {
  Label: Text.withComponent("label") as StyledWithComponentTag<
    "label",
    TextProps
  >
});
