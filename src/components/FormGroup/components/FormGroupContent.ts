import Box, { BoxProps } from "@/components/Box";

export type FormGroupContentProps = BoxProps;
const FormGroupContent = Box.extend`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
`;
FormGroupContent.displayName = "FormGroupContent";
export default FormGroupContent;
