import Text from "@/components/Text";

const EditorHeader = Text.extend.attrs({
  fontSize: 4,
  fontWeight: "bold"
})`
  align-self: baseline;
`;
EditorHeader.displayName = "EditorHeader";
export default EditorHeader;
