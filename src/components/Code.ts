import { FontSizeProps, fontSize } from "styled-system";

import styled, {
  BorderProps,
  IntentBorderProps,
  border,
  intentBorder,
  Intent,
  Radius,
  FontSize
} from "@/style";

export interface CodeStyleProps
  extends FontSizeProps,
    BorderProps,
    IntentBorderProps {}

const Code = styled<CodeStyleProps, "code">("code")`
  ${fontSize};
  ${intentBorder};
  ${border};

  margin: 0 4px;
  padding: 1px 2px;
  box-sizing: border-box;
  font-family: monospace;
`;
Code.displayName = "Code";

Code.defaultProps = {
  fontSize: FontSize.Default,
  intent: Intent.Hint,
  borderRadius: Radius.Small
};

export default Code;
