import * as React from "react";

import { autobind } from "core-decorators";
import { isObject } from "lodash-es";

import SaveStructureItemContainer from "./components/SaveStructureItemContainer";
import SaveStructureItemHeader from "./components/SaveStructureItemHeader";
import SaveStructureItemContent from "./components/SaveStructureItemContent";

export interface SaveStructureItemProps {
  title?: string;
  propKey: string;
  propValue: any;
  onSelected(path: string[]): void;
}
interface State {
  isExpanded: boolean;
}

type Props = SaveStructureItemProps;
export default class SaveStructureItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  render(): JSX.Element {
    const { title, propKey, propValue } = this.props;
    const { isExpanded } = this.state;

    let expandableKeys: string[] = [];
    if (isObject(propValue)) {
      expandableKeys = Object.keys(propValue)
        .filter(valueKey => isObject(propValue[valueKey]))
        .sort();
    }

    const expandable = expandableKeys.length > 0;

    let valueElement: React.ReactNode | null = null;
    if (expandable && isExpanded) {
      const isArray = Array.isArray(propValue);
      valueElement = expandableKeys.map(valueKey => {
        const value = propValue[valueKey];
        const valueTitle = isArray
          ? `${valueKey}: ${String(value)}`
          : undefined;
        return (
          <SaveStructureItem
            key={valueKey}
            title={valueTitle}
            propKey={valueKey}
            propValue={value}
            onSelected={this._onChildSelected}
          />
        );
      });
    }

    return (
      <SaveStructureItemContainer>
        <SaveStructureItemHeader
          expandable={expandable}
          expanded={isExpanded}
          header={title || propKey}
          onClick={this._onClick}
          onExpandToggle={this._onExpandToggle}
        />
        <SaveStructureItemContent>{valueElement}</SaveStructureItemContent>
      </SaveStructureItemContainer>
    );
  }

  @autobind()
  private _onClick() {
    const { propKey, onSelected } = this.props;
    this.setState({
      isExpanded: true
    });
    onSelected([propKey]);
  }

  @autobind()
  private _onExpandToggle() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  @autobind()
  private _onChildSelected(path: string[]) {
    const { propKey, onSelected } = this.props;
    onSelected([propKey, ...path]);
  }
}
