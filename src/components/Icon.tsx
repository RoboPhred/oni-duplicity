import * as React from "react";

import { FontSizeProps, SpaceProps, fontSize, space } from "styled-system";

import {
  FontAwesomeIcon,
  Props as FontAwesomeIconProps
} from "@fortawesome/react-fontawesome";

import { faPencilAlt, IconDefinition } from "@fortawesome/free-solid-svg-icons";
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
const CleanFontAwesomeIcon: React.SFC<IconProps> = ({
  verticalAlign,
  ...props
}) => <FontAwesomeIcon {...props} />;
const Icon = styled<IconProps>(CleanFontAwesomeIcon)`
  ${intentColor};
  ${fontSize};
  ${verticalAlign};
  ${space};
`;
Icon.defaultProps = {
  m: Space.Small
};

function createIcon(
  icon: IconDefinition
): React.SFC<Omit<IconProps, "icon" | "ref">> {
  return props => <Icon {...props} icon={icon} />;
}

const GithubIcon = createIcon(faGithubSquare);
const PencilIcon = createIcon(faPencilAlt);

export default attachProps(Icon, {
  Github: GithubIcon,
  Pencil: PencilIcon
});
