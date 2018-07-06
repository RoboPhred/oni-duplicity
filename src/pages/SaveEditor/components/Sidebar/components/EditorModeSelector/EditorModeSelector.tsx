import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { Intent } from "@/theme";

import mapDispatchToProps, { DispatchProps } from "./events";

import Text from "@/components/Text";
import Input from "@/components/Input";

type Props = DispatchProps;
class EditorModeSelector extends React.Component<Props> {
  render() {
    return (
      <div>
        <Text.Label htmlFor="advanced_mode" intent={Intent.Secondary}>
          Advanced Mode
        </Text.Label>
        <Input
          id="advanced_mode"
          type="checkbox"
          onChange={this._onAdvancedModeChange}
        />
      </div>
    );
  }

  @autobind()
  private _onAdvancedModeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { setEditMode } = this.props;
    setEditMode(e.target.checked ? "advanced" : "normal");
  }
}
export default connect(
  undefined,
  mapDispatchToProps
)(EditorModeSelector);
