
import * as React from "react";
import { connect } from "react-redux";
import { autobind } from "core-decorators";
import {
    Navbar,
    NavbarGroup,
    NavbarHeading,
    Text,
    Button,
    Alignment
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";

import { AppNavBarProps } from "./props";
import mapDispatchToProps, { DispatchProps } from "./dispatch";
import mapStateToProps, { StateProps } from "./selectors";

type Props = AppNavBarProps & StateProps & DispatchProps;
class AppNavBar extends React.Component<Props> {
    private _input: HTMLElement | null = null;

    render() {
        const {
            className,
            saveFileName,
            isSaveEnabled
        } = this.props;

        return (
            <Navbar className={`ui-app-navbar ${className || ""}`}>
                <NavbarGroup>
                    <NavbarHeading>ONI Save Editor</NavbarHeading>
                    <Text ellipsize={true}>{saveFileName || ""}</Text>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Button icon={IconNames.UPLOAD} onClick={this._onLoadClick}>Load</Button>
                    <Button icon={IconNames.FLOPPY_DISK} disabled={!isSaveEnabled} onClick={this._onSaveClick}>Save</Button>
                    <input
                        ref={el => this._input = el}
                        style={{ display: "none" }}
                        className="pt-button pt-intent-primary"
                        type="file"
                        accept=".sav"
                        onChange={this._onLoadFile}
                    />
                </NavbarGroup>
            </Navbar>
        );
    }

    @autobind()
    private _onSaveClick() {
        this.props.saveSavefile({});
    }

    @autobind()
    private _onLoadClick() {
        if (!this._input) return;
        this._input.click();
    }

    @autobind()
    private _onLoadFile(change: React.ChangeEvent<HTMLInputElement>) {
        const files = change.target.files;
        if (!files || files.length === 0) return;
        this.props.loadSavefile({file: files[0]});
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppNavBar);