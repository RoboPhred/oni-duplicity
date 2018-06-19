import * as React from "react";

import { autobind } from "core-decorators";
import { isObject } from "lodash-es";

import SaveStructureItemContainer from "./SaveStructureItemContainer";
import SaveStructureItemHeader from "./SaveStructureItemHeader";
import SaveStructureItemContent from "./SaveStructureItemContent";

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

    let valueElement: React.ReactNode | null = null;
    if (isExpanded && isObject(propValue)) {
      const isArray = Array.isArray(propValue);
      valueElement = Object.keys(propValue)
        .sort()
        .map(valueKey => {
          const value = propValue[valueKey];
          const valueTitle = isArray
            ? `${valueKey}: ${String(value)}`
            : undefined;
          return (
            <SaveStructureItem
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
        <SaveStructureItemHeader onClick={this._onClick}>
          {title || propKey}
        </SaveStructureItemHeader>
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
  private _onChildSelected(path: string[]) {
    const { propKey, onSelected } = this.props;
    onSelected([propKey, ...path]);
  }
}
