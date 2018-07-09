import styled from "@/theme";
import { getTheme } from "@/theme";

const BreadcrumbContainer = styled.div`
  margin-bottom: ${props => getTheme(props).space[1]}px;
`;
BreadcrumbContainer.displayName = "BreadcrumbContainer";
export default BreadcrumbContainer;
