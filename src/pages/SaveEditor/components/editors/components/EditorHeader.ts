import Text from "@/components/Text";
import { FontSize } from "@/theme";

const EditorHeader = Text.extend.attrs({
  fontSize: FontSize.Heading,
  fontWeight: "bold",
  alignSelf: "baseline"
})`
  width: 100%;
`;
EditorHeader.displayName = "EditorHeader";
export default EditorHeader;
