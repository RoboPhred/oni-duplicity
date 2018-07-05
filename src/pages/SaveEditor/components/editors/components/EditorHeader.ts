import Text from "@/components/Text";

const EditorHeader = Text.withComponent("h2").extend`
  margin-top: 0;
`;
EditorHeader.displayName = "EditorHeader";
export default EditorHeader;
