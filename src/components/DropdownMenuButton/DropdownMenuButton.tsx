import * as React from "react";

import { autobind } from "core-decorators";

import DropdownMenuContainer from "./components/DropdownMenuContainer";
import DropdownMenuPanel from "./components/DropdownMenuPanel";

import Menu from "@/components/Menu";

export interface DropdownMenuButtonProps {
  button: React.ReactNode;
}

type Props = DropdownMenuButtonProps;
interface State {
  isOpen: boolean;
}
export default class DropdownMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  render() {
    const { button } = this.props;
    const { isOpen } = this.state;
    return (
      <span>
        <span onClick={this._toggleDropdown}>{button}</span>
        {isOpen && this._renderDropDown()}
      </span>
    );
  }

  private _renderDropDown(): JSX.Element {
    const { children } = this.props;
    return (
      <DropdownMenuContainer>
        <DropdownMenuPanel>
          <Menu onMouseLeave={this._closeDropdown}>{children}</Menu>
        </DropdownMenuPanel>
      </DropdownMenuContainer>
    );
  }

  @autobind()
  private _toggleDropdown() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  @autobind()
  private _closeDropdown() {
    this.setState({
      isOpen: false
    });
  }
}
