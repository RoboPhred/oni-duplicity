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
  onClick(): void;
  onExpandToggle(): void;
}

const SaveStructureItemHeader: React.SFC<
  SaveStructureItemHeaderProps & { className?: string }
> = ({
  className,
  expandable,
  expanded,
  header,
  intent,
  onClick,
  onExpandToggle
}) => (
  <span className={className}>
    {expandable && (
      <Expander
        expanded={expanded}
        onClick={expandable ? onExpandToggle : undefined}
      />
    )}
    <ItemText intent={intent} onClick={onClick}>
      {header}
    </ItemText>
  </span>
);
export default styled(SaveStructureItemHeader)`
  cursor: pointer;
`;
