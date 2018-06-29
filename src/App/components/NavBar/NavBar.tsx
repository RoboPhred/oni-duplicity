import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import Button from "@/components/Button";

import mapDispatchToProps, { DispatchProps } from "./events";

import NavBarContainer from "./components/NavBarContainer";

import NavBarGroup from "./components/NavBarGroup";
import NavBarTitleText from "./components/NavBarTitleText";

type Props = DispatchProps;
class NavBar extends React.Component<Props> {
  private _input: HTMLElement | null = null;

  render() {
    const { onLoadTestData } = this.props;
    return (
      <NavBarContainer>
        <NavBarTitleText>Duplicity</NavBarTitleText>
        <NavBarGroup>
          <input
            ref={el => (this._input = el)}
            style={{ display: "none" }}
            type="file"
            accept=".sav"
            onChange={this._onLoadFileInput}
          />
          <Button onClick={this._onLoadFileClick}>Load</Button>
          <Button onClick={onLoadTestData}>Test</Button>
          <Button onClick={this._onSaveFileClick}>Save</Button>
        </NavBarGroup>
      </NavBarContainer>
    );
  }

  @autobind()
  private _onLoadFileClick() {
    if (!this._input) {
      return;
    }
    this._input.click();
  }

  @autobind()
  private _onLoadFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];

    const { onLoad } = this.props;
    onLoad(file);
  }

  @autobind()
  private _onSaveFileClick() {
    const { onSave } = this.props;
    const fileName = withExtension("my-file", ".sav");
    onSave(fileName);
  }
}
export default connect(
  null,
  mapDispatchToProps
)(NavBar);

function withExtension(name: string, ext: string): string {
  if (name.endsWith(ext)) return name;
  return name + ext;
}
