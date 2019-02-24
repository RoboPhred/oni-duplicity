import * as React from "react";
import { connect } from "react-redux";

import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

export interface AbstractLoadButtonProps {
  children(props: AbstractLoadButtonRenderProps): React.ReactChild;
}
export interface AbstractLoadButtonRenderProps {
  disabled: boolean;
  onClick(): void;
}

type Props = AbstractLoadButtonProps & StateProps & DispatchProps;

class AbstractLoadButton extends React.Component<Props> {
  private _input: HTMLElement | null = null;

  render() {
    const { children, disabled } = this.props;
    return (
      <React.Fragment>
        <input
          ref={el => (this._input = el)}
          style={{ display: "none" }}
          type="file"
          accept=".sav"
          onChange={this._onLoadFileInput}
        />
        {React.Children.only(children({ disabled, onClick: this._onClick }))}
      </React.Fragment>
    );
  }

  private _onClick = () => {
    if (this._input) {
      this._input.click();
    }
  };

  private _onLoadFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];

    const { loadOniSave } = this.props;
    loadOniSave(file);
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AbstractLoadButton);
