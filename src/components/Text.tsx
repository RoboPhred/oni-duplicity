import styled from "@/theme";

import { TextProps as ThemeTextProps, text } from "@/theme";

import { attachProps } from "@/utils";

export type TextProps = ThemeTextProps;
const Text = styled<TextProps, "span">("span")`
  ${text};
`;
Text.displayName = "Text";
export default attachProps(Text, {
  Label: Text.withComponent("label") as StyledWithComponent<"label", TextProps>
});
