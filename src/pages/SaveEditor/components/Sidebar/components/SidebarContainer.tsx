import Panel from "@/components/Panel";

const SidebarContainer = Panel.extend`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
SidebarContainer.displayName = "SidebarContainer";
export default SidebarContainer;
