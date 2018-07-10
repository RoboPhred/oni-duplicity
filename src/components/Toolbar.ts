import styled, {
  Background,
  BackgroundProps,
  TextProps,
  background,
  css,
  text
} from "@/theme";

import { attachProps } from "@/utils";

export interface ToolbarAlignProps {
  align?: "left" | "center" | "right";
}
const toolbarAlign = css<ToolbarAlignProps>`
  grid-area: ${props => props.align};
  justify-self: ${props => props.align};
`;

export type ToolbarLabelProps = ToolbarAlignProps & TextProps;
const ToolbarLabel = styled<ToolbarLabelProps, "label">("label")`
  ${text};
  ${toolbarAlign};
`;
ToolbarLabel.defaultProps = {
  align: "left"
};
ToolbarLabel.displayName = "ToolbarLabel";

export type ToolbarGroupProps = ToolbarAlignProps;
const ToolbarGroup = styled<ToolbarGroupProps, "div">("div")`
  display: inline-block;
  ${toolbarAlign};
  align-self: baseline;
`;
ToolbarGroup.defaultProps = {
  align: "right"
};
ToolbarGroup.displayName = "ToolbarButtonGroup";

export type ToolbarProps = BackgroundProps;
const Toolbar = styled<ToolbarProps, "div">("div")`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: [left] 1fr [center] 1fr [right] 1fr;
  ${background};
`;
Toolbar.defaultProps = {
  background: Background.Panel
};
Toolbar.displayName = "Toolbar";

export default attachProps(Toolbar, {
  Label: ToolbarLabel,
  Group: ToolbarGroup
});
