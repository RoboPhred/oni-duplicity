import styled, { Space } from "@/style";
import { getTheme } from "@/style";

const BreadcrumbContainer = styled.div`
  margin-bottom: ${props => getTheme(props).space[Space.Small]}px;
`;
BreadcrumbContainer.displayName = "BreadcrumbContainer";
export default BreadcrumbContainer;
