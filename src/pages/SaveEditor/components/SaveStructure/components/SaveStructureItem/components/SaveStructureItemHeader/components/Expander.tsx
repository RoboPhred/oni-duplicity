import * as React from "react";

import styled from "styled-components";
import { getTheme } from "@/theme";

const ICON_SIZE = 10;
const ICON_EXPANDED = "M 0 .25 L .5 .75 L 1 .25 z";
const ICON_COLLAPSED = "M .5 0 L 1 .5 L .5 1 z";

export interface ExpanderProps {
  expanded: boolean;
  onClick?(): void;
}
const Expander: React.SFC<ExpanderProps & { className?: string }> = ({
  className,
  expanded,
  onClick
}) => (
  <svg
    className={className}
    width={ICON_SIZE}
    height={ICON_SIZE}
    viewBox={`0 0 1 1`}
    onClick={onClick}
  >
    <path d={expanded ? ICON_EXPANDED : ICON_COLLAPSED} fill="black" />
  </svg>
);
export default Expander;
