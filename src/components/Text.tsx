import {
  AlignSelfProps,
  JustifySelfProps,
  SpaceProps,
  alignSelf,
  justifySelf,
  space
} from "styled-system";

import styled from "@/style";

import { TextProps as TextStyleProps, text } from "@/style";

import { attachProps } from "@/utils";

export type TextProps = TextStyleProps &
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
  H4: Text.withComponent("h4") as StyledWithComponentTag<"h4", TextProps>,
  Label: Text.withComponent("label") as StyledWithComponentTag<
    "label",
    TextProps
  >,
  Div: Text.withComponent("div") as StyledWithComponentTag<"div", TextProps>
});
