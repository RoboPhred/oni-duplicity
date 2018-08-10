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
  // expandedChild: "left" | "right" | null;
}

/*
  border-left: ${props =>
    props.expandedChild !== "left" && getThemeBorder(Border.Normal)};
  border-right: ${props =>
    props.expandedChild !== "right" && getThemeBorder(Border.Normal)};
*/

const MenuItemWrapper = styled<MenuItemWrapperProps, "li">("li")`
  box-sizing: content-box;
  list-style: none;
  margin: 0;
  padding: ${getThemeSpace(Space.Small)}px;

  :first-child {
    border-left: ${getThemeBorder(Border.Normal)};
    border-right: ${getThemeBorder(Border.Normal)};
    border-top: ${getThemeBorder(Border.Normal)};
    border-color: ${getThemeColor(Color.SecondaryIntent)};
  }

  :last-child {
    border-left: ${getThemeBorder(Border.Normal)};
    border-right: ${getThemeBorder(Border.Normal)};
    border-bottom: ${getThemeBorder(Border.Normal)};
    border-color: ${getThemeColor(Color.SecondaryIntent)};
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
    const menuItems = React.Children.map(children, child => (
      <MenuItemWrapper>{child}</MenuItemWrapper>
    ));
    return <MenuContainer {...props}>{menuItems}</MenuContainer>;
  }
}
