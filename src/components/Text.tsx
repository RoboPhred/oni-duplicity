import styled from "styled-components";

import { TextProps as ThemeTextProps, text } from "@/theme";

import { attachSubComponents } from "@/component-utils";

export type TextProps = ThemeTextProps;
const Text = styled<TextProps, "span">("span")`
  ${text};
`;
Text.displayName = "Text";
export default attachSubComponents(Text, {
  Label: Text.withComponent("label") as StyledWithComponent<"label", TextProps>
});
