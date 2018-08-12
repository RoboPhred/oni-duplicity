import * as React from "react";

import { FontSize } from "@/style";

import DropdownMenuButton from "@/components/DropdownMenuButton";
import Icon from "@/components/Icon";

import LanguageMenuButton from "./LanguageMenuButton";

export default class SettingsButton extends React.Component {
  render() {
    return (
      <DropdownMenuButton
        button={
          <Icon.Settings fontSize={FontSize.Heading} verticalAlign="middle" />
        }
      >
        <LanguageMenuButton lang="en">English&nbsp;(en)</LanguageMenuButton>
        <LanguageMenuButton lang="zh">Chinese&nbsp;(zh)</LanguageMenuButton>
      </DropdownMenuButton>
    );
  }
}
