import styled, { Radii } from "@/theme";

import { attachProps } from "@/utils";

import { getTheme } from "@/theme";

import Header from "./PortraitHeader";
import Footer from "./PortraitFooter";

const Portrait = styled.div`
  border-radius: ${props => getTheme(props).radii[Radii.Small]}px;
  background-color: ${props => getTheme(props).colors.bg.panel};
  width: 150px;
  height: 150px;
  position: relative;
  padding: 5px;
  margin: 5px;
  box-sizing: border-box;
`;
Portrait.displayName = "Portrait";

export default attachProps(Portrait, {
  Header,
  Footer
});
