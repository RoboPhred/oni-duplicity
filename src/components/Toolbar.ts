import * as CSS from "csstype";

import styled, {
  Background,
  BackgroundProps,
  TextCssProps,
  background,
  css,
  text
} from "@/theme";

import { attachProps } from "@/utils";

export interface ToolbarItemProps {
  align?: "left" | "center" | "right";
  alignContent?: CSS.AlignContentProperty;
}
const toolbarItem = css<ToolbarItemProps>`
  grid-area: ${props => props.align};
  justify-self: ${props => props.align};
  align-self: ${props => props.alignContent || "baseline"};
`;

export type ToolbarLabelProps = ToolbarItemProps & TextCssProps;
const ToolbarLabel = styled<ToolbarLabelProps, "label">("label")`
  ${text};
  ${toolbarItem};
`;
ToolbarLabel.defaultProps = {
  align: "left"
};
ToolbarLabel.displayName = "ToolbarLabel";

export type ToolbarGroupProps = ToolbarItemProps;
const ToolbarGroup = styled<ToolbarGroupProps, "div">("div")`
  display: inline-block;
  ${toolbarItem};
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
