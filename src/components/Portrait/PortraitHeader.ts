import styled from "@/style";

import { TextCssProps, text } from "@/style";

export interface PortraitHeaderProps extends TextCssProps {}
const PortraitHeader = styled<TextCssProps, "h4">("h4")`
  ${text};
  width: 100%;
  box-sizing: border-box;
  margin-top: 0;
  margin-bottom: 2px;
  text-align: center;
`;
PortraitHeader.displayName = "PortraitHeader";
export default PortraitHeader;
