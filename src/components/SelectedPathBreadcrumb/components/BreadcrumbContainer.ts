import styled, { Space } from "@/theme";
import { getTheme } from "@/theme";

const BreadcrumbContainer = styled.div`
  margin-bottom: ${props => getTheme(props).space[Space.Small]}px;
`;
BreadcrumbContainer.displayName = "BreadcrumbContainer";
export default BreadcrumbContainer;
