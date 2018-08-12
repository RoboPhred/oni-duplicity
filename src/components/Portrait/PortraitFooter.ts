import styled from "@/style";

import { TextProps, text } from "@/style";

export interface PortraitFooterProps extends TextProps {}
const PortraitFooter = styled<PortraitFooterProps, "div">("div")`
  ${text};
  width: 100%;
  box-sizing: border-box;
  margin-top: 2px;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
`;
PortraitFooter.displayName = "PortraitFooter";
export default PortraitFooter;
