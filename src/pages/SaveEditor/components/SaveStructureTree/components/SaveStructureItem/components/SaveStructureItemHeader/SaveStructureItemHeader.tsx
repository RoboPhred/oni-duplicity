import * as React from "react";

import styled from "styled-components";

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

const SaveStructureItemContainer = styled.span`
  cursor: pointer;
`;
SaveStructureItemContainer.displayName = "SaveStructureItemContainer";

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
  <SaveStructureItemContainer innerRef={innerRef} className={className}>
    {expandable && (
      <Expander
        expanded={expanded}
        onClick={expandable ? onExpandToggle : undefined}
      />
    )}
    <ItemText intent={intent} onClick={onClick}>
      {header}
    </ItemText>
  </SaveStructureItemContainer>
);
SaveStructureItemHeader.displayName = "SaveStructureItemHeader";
export default SaveStructureItemHeader;
