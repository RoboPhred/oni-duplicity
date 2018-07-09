import * as React from "react";

import styled from "@/theme";

import Expander from "./components/Expander";
import ItemText from "./components/ItemText";
import { Intent } from "@/theme";

export interface SaveStructureItemHeaderProps {
  expandable: boolean;
  expanded: boolean;
  header: string;
  intent: Intent;
  innerRef?: React.RefObject<HTMLDivElement>;
  onClick(): void;
  onExpandToggle(): void;
}

const SaveStructureItemHeaderContainer = styled.span`
  white-space: nowrap;
  cursor: pointer;
`;
SaveStructureItemHeaderContainer.displayName = "SaveStructureItemContainer";

const SaveStructureItemHeader: React.SFC<
  SaveStructureItemHeaderProps & { className?: string }
> = ({
  className,
  expandable,
  expanded,
  header,
  intent,
  onClick,
  onExpandToggle,
  innerRef
}) => (
  <SaveStructureItemHeaderContainer innerRef={innerRef} className={className}>
    {expandable && (
      <Expander
        expanded={expanded}
        onClick={expandable ? onExpandToggle : undefined}
      />
    )}
    <ItemText intent={intent} onClick={onClick}>
      {header}
    </ItemText>
  </SaveStructureItemHeaderContainer>
);
SaveStructureItemHeader.displayName = "SaveStructureItemHeader";
export default SaveStructureItemHeader;
