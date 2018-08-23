import * as React from "react";
import styled, {
  getThemeColor,
  Color,
  Border,
  getThemeBorder,
  getThemeSpace,
  Space
} from "@/style";

interface MenuItemWrapperProps {
  expandedLeft: boolean;
  expandedRight: boolean;
}

const MenuItemWrapper = styled<MenuItemWrapperProps, "li">("li")`
  box-sizing: content-box;
  list-style: none;
  margin: 0;
  padding: ${getThemeSpace(Space.Small)}px;

  ${props =>
    !props.expandedLeft
      ? `border-left: ${getThemeBorder(Border.Normal)}
    ${getThemeColor(Color.SecondaryIntent)}`
      : undefined};

  ${props =>
    !props.expandedRight
      ? `border-right: ${getThemeBorder(Border.Normal)}
    ${getThemeColor(Color.SecondaryIntent)}`
      : undefined};

  :first-child {
    border-top: ${getThemeBorder(Border.Normal)}
      ${getThemeColor(Color.SecondaryIntent)};
  }

  :last-child {
    border-bottom: ${getThemeBorder(Border.Normal)}
      ${getThemeColor(Color.SecondaryIntent)};
  }
`;

const MenuContainer = styled.ul`
  box-sizing: content-box;
  background: ${getThemeColor(Color.PanelBackground)};
  list-style: none;
  margin: 0;
  padding: 0;
`;

export interface MenuProps extends React.HTMLAttributes<HTMLUListElement> {}
export default class Menu extends React.Component<MenuProps> {
  render() {
    const { children, ...props } = this.props;
    const menuItems = React.Children.map(children, (child, i) => (
      <MenuItemWrapper expandedLeft={false} expandedRight={false}>
        {child}
      </MenuItemWrapper>
    ));
    return <MenuContainer {...props}>{menuItems}</MenuContainer>;
  }
}
