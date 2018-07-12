import * as React from "react";

import { connect } from "react-redux";

import { autobind } from "core-decorators";

import scrollIntoView from "dom-scroll-into-view";

import { Intent } from "@/theme";

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
  private _ref: React.RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    this._ref = React.createRef();

    this.state = {
      isExpanded: false
    };
  }

  componentDidMount() {
    if (this.props.selectionStatus === "selected") {
      this._scrollIntoView();
    }
  }

  componentDidUpdate(oldProps: Props) {
    if (
      oldProps.selectionStatus !== "selected" &&
      this.props.selectionStatus === "selected"
    ) {
      this._scrollIntoView();
    }
  }

  render(): JSX.Element {
    const { title, selectionStatus, childPaths, scrollContainer } = this.props;
    let { isExpanded } = this.state;

    const isExpandable = childPaths.length > 0;

    let titleIntent: Intent;
    switch (selectionStatus) {
      default:
        titleIntent = Intent.Default;
        break;
      case "in-path":
        titleIntent = Intent.Secondary;
        isExpanded = isExpandable;
        break;
      case "selected":
        titleIntent = Intent.Primary;
        break;
    }

    let valueElement: React.ReactNode | null = null;
    if (isExpandable && isExpanded) {
      valueElement = childPaths.map(childPath => {
        const key = childPath[childPath.length - 1];
        return (
          <SaveStructureItem
            key={key}
            saveItemPath={childPath}
            scrollContainer={scrollContainer}
          />
        );
      });
    }

    return (
      <SaveStructureItemContainer>
        <SaveStructureItemHeader
          innerRef={this._ref}
          expandable={isExpandable}
          expanded={isExpanded}
          header={title}
          intent={titleIntent}
          onClick={this._onClick}
          onExpandToggle={this._onExpandToggle}
        />
        <SaveStructureItemContent>{valueElement}</SaveStructureItemContent>
      </SaveStructureItemContainer>
    );
  }

  private _scrollIntoView() {
    const htmlElement = this._ref.current;
    const { childPaths, scrollContainer } = this.props;

    if (childPaths.length > 0) {
      this.setState({
        isExpanded: true
      });
    }

    if (htmlElement && scrollContainer.current) {
      scrollIntoView(htmlElement, scrollContainer.current, {
        allowHorizontalScroll: true,
        onlyScrollIfNeeded: true,
        offsetBottom: 125,
        offsetTop: 125
      });
    }
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
