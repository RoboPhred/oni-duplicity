import * as React from "react";

import { FontSizeProps, SpaceProps, fontSize, space } from "styled-system";

import {
  FontAwesomeIcon,
  Props as FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";

import styled, {
  IntentColorProps,
  VerticalAlignProps,
  Space,
  intentColor,
  verticalAlign
} from "@/style";

import { attachProps } from "@/utils";

export type IconProps = FontAwesomeIconProps &
  IntentColorProps &
  SpaceProps &
  VerticalAlignProps &
  FontSizeProps;
const Icon = styled<IconProps>(FontAwesomeIcon)`
  ${intentColor};
  ${fontSize};
  ${verticalAlign};
  ${space};
`;
Icon.defaultProps = {
  m: Space.Small
};

const GithubIcon: React.SFC<Omit<IconProps, "icon" | "ref">> = props => (
  <Icon {...props} icon={faGithubSquare} />
);

export default attachProps(Icon, {
  Github: GithubIcon
});
