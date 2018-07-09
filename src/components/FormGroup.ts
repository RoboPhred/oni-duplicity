import styled from "@/theme";

import { TextProps, text, getTheme } from "@/theme";

import { attachProps } from "@/utils";

export type FormLabelProps = TextProps;
const Label = styled<FormLabelProps, "label">("label")`
  ${text};
  margin-right: ${props => getTheme(props).space[1]}px;
`;
Label.displayName = "FormGroup.Label";

const Content = styled.div``;
Content.displayName = "FormGroup.Content";

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: ${props => getTheme(props).space[1]}px;
`;
FormGroup.displayName = "FormGroup";

export default attachProps(FormGroup, {
  Label,
  Content
});
