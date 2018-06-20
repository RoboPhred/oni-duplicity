import * as React from "react";

import styled from "styled-components";

import Expander from "./components/Expander";
import ItemText from "./components/ItemText";

export interface SaveStructureItemHeaderProps {
  expandable: boolean;
  expanded: boolean;
  header: string;
  onClick(): void;
  onExpandToggle(): void;
}

const SaveStructureItemHeader: React.SFC<
  SaveStructureItemHeaderProps & { className?: string }
> = ({ className, expandable, expanded, header, onClick, onExpandToggle }) => (
  <span className={className}>
    {expandable && (
      <Expander
        expanded={expanded}
        onClick={expandable ? onExpandToggle : undefined}
      />
    )}
    <ItemText onClick={onClick}>{header}</ItemText>
  </span>
);
export default styled(SaveStructureItemHeader)`
  cursor: pointer;
`;
