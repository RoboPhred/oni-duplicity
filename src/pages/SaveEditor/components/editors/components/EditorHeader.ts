import Text from "@/components/Text";
import { FontSize } from "@/theme";

const EditorHeader = Text.extend.attrs({
  fontSize: FontSize.Heading,
  fontWeight: "bold"
})`
  align-self: baseline;
`;
EditorHeader.displayName = "EditorHeader";
export default EditorHeader;
