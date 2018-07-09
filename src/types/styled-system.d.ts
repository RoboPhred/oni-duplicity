// Incomplete and incorrect typedefs on styled-system
import * as StyledSystem from "styled-system";
declare module "styled-system" {
  export interface BgColorProps {
    bg?: string;
  }

  export function bgColor(...args: any[]): any;
}
