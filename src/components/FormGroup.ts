import styled from "@/theme";

import { TextProps, text, getTheme } from "@/theme";

import { attachProps } from "@/utils";

import Box, { BoxProps } from "@/components/Box";

export type FormLabelProps = TextProps;
const Label = styled<FormLabelProps, "label">("label")`
  ${text};
  margin-right: ${props => getTheme(props).space[1]}px;
`;
Label.displayName = "FormGroup.Label";

export type FormContentProps = BoxProps;
const Content = Box.extend`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;
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
