import styled, {
  BorderProps,
  IntentBorderProps,
  border,
  intentBorder,
  Intent,
  Radius
} from "@/style";

export interface CodeStyleProps extends BorderProps, IntentBorderProps {}

const Code = styled<CodeStyleProps, "code">("code")`
  ${intentBorder};
  ${border};

  margin: 0 4px;
  padding: 1px 2px;
  box-sizing: border-box;
  font-family: monospace;
`;
Code.displayName = "Code";

Code.defaultProps = {
  intent: Intent.Hint,
  borderRadius: Radius.Small
};

export default Code;
