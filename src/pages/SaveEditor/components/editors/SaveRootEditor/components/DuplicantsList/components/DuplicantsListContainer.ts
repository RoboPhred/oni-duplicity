import { SpaceProps, space } from "styled-system";

import styled, { Space, Border, Color, border } from "@/style";

const DuplicantsListContainer = styled<SpaceProps, "div">("div")`
  width: 100%;
  margin-top: 5px;
  box-sizing: border-box;
  ${space};
  ${border.of(Border.Normal, Color.DefaultSeparator)};
`;
DuplicantsListContainer.defaultProps = {
  p: Space.Small
};
DuplicantsListContainer.displayName = "DuplicantsListContainer";
export default DuplicantsListContainer;
