import styled, { getTheme, intent, Intent, Space } from "@/theme";

export interface TabProps {
  isSelected?: boolean;
}

const VerticalTabItem = styled<TabProps, "div">("div")`
  cursor: pointer;

  padding: ${props => getTheme(props).space[Space.Small]}px;

  color: ${props =>
    props.isSelected ? intent.of(Intent.Primary) : intent.of(Intent.Secondary)}

  :not(:last-child) {
    border-bottom: ${props => {
      const theme = getTheme(props);
      return `${theme.borders[1]} ${theme.colors.intent.secondary}`;
    }};
  }

  ${props => {
    const theme = getTheme(props);
    return `border-right: ${theme.borders[1]} ${
      props.isSelected ? "transparent" : theme.colors.intent.secondary
    }`;
  }};
`;
VerticalTabItem.displayName = "VerticalTabItem";
export default VerticalTabItem;
