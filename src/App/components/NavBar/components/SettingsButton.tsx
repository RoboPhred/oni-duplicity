import * as React from "react";

import { FontSize } from "@/style";

import DropdownMenuButton from "@/components/DropdownMenuButton";
import Text from "@/components/Text";
import Icon from "@/components/Icon";

const CursorTextDiv = Text.Div.extend`
  cursor: pointer;
`;

export default class SettingsButton extends React.Component {
  render() {
    return (
      <DropdownMenuButton
        button={
          <Icon.Settings fontSize={FontSize.Heading} verticalAlign="middle" />
        }
      >
        <CursorTextDiv onClick={this._setLang.bind(this, "en")}>
          English&nbsp;(en)
        </CursorTextDiv>
        <CursorTextDiv onClick={this._setLang.bind(this, "zh")}>
          Chinese&nbsp;(zh)
        </CursorTextDiv>
      </DropdownMenuButton>
    );
  }

  private _setLang(lang: string) {
    console.log("Changing language to", lang);
    window.location.search = `lng=${lang}`;
  }
}
