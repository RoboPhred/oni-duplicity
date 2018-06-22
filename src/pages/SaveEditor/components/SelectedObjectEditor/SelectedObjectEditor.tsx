import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";
import { isObject } from "lodash-es";

import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import EditorField from "./components/EditorField";

type Props = StateProps & DispatchProps;
class SelectedObjectEditor extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { selectedPath, selectedValue } = this.props;
    const primitiveKeys = Object.keys(selectedValue).filter(
      key => !isObject(selectedValue[key])
    );

    const fields = primitiveKeys.map(key => this._renderField(key));

    return (
      <div>
        <h3>{selectedPath.join(".")}</h3>
        {fields}
      </div>
    );
  }

  private _renderField(key: string) {
    const { selectedValue } = this.props;
    return (
      <div key={key}>
        <span>{key}</span>
        <EditorField
          propKey={key}
          value={selectedValue[key]}
          onChange={this._onFieldChange}
        />
      </div>
    );
  }

  @autobind()
  private _onFieldChange(key: string, value: any) {
    const { selectedPath, onModify } = this.props;
    onModify([...selectedPath, key], value);
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedObjectEditor);
