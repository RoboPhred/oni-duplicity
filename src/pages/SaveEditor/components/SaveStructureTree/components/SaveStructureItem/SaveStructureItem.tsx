import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { SaveStructureItemProps } from "./props";
import mapStateToProps, { StateProps } from "./derived-state";
import mapDispatchToProps, { DispatchProps } from "./events";

import SaveStructureItemContainer from "./components/SaveStructureItemContainer";
import SaveStructureItemHeader from "./components/SaveStructureItemHeader";
import SaveStructureItemContent from "./components/SaveStructureItemContent";

interface State {
  isExpanded: boolean;
}

type Props = SaveStructureItemProps & StateProps & DispatchProps;
class SaveStructureItemComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  render(): JSX.Element {
    const { title, childPaths } = this.props;
    const { isExpanded } = this.state;

    const isExpandable = childPaths.length > 0;

    let valueElement: React.ReactNode | null = null;
    if (isExpandable && isExpanded) {
      valueElement = childPaths.map(childPath => {
        const key = childPath[childPath.length - 1];
        return <SaveStructureItem key={key} saveItemPath={childPath} />;
      });
    }

    return (
      <SaveStructureItemContainer>
        <SaveStructureItemHeader
          expandable={isExpandable}
          expanded={isExpanded}
          header={title}
          onClick={this._onClick}
          onExpandToggle={this._onExpandToggle}
        />
        <SaveStructureItemContent>{valueElement}</SaveStructureItemContent>
      </SaveStructureItemContainer>
    );
  }

  @autobind()
  private _onClick() {
    const { saveItemPath, onClick } = this.props;
    this.setState({
      isExpanded: true
    });
    onClick(saveItemPath);
  }

  @autobind()
  private _onExpandToggle() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
}
const SaveStructureItem = connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveStructureItemComponent);
export default SaveStructureItem;
