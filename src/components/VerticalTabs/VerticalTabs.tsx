import * as React from "react";

import { autobind } from "core-decorators";

import { attachProps } from "@/utils";

import { BoxProps } from "@/components/Box";
import Flex from "@/components/Flex";

import TabContent from "./components/TabContent";
import VerticalTabItem from "./components/VerticalTabItem";

import Tab, { TabProps } from "./components/Tab";

export interface VerticalTabsProps extends BoxProps {}

type Props = VerticalTabsProps;
interface State {
  selectedKey: string | number | null;
}
class VerticalTabs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      selectedKey: null
    };
  }

  render() {
    let { children } = this.props;
    let { selectedKey } = this.state;

    const tabs = React.Children.map(
      children,
      x =>
        React.isValidElement<TabProps>(x) && x.props.tabKey && x.props.header
          ? x
          : null
    ).filter(x => x !== null) as React.ReactElement<TabProps>[];

    if (selectedKey == null && tabs.length > 0) {
      selectedKey = tabs[0].props.tabKey;
    }

    const tabItems = tabs.map((tab, i) => (
      <VerticalTabItem
        key={tab.props.tabKey}
        isSelected={tab.props.tabKey === selectedKey}
        onClick={this._onTabItemClick.bind(this, tab.props.tabKey)}
      >
        {tab.props.header}
      </VerticalTabItem>
    ));

    const content = selectedKey
      ? tabs.find(x => x.props.tabKey === selectedKey)
      : undefined;

    return (
      <Flex {...this.props} direction="row">
        <Flex.Item shrink>{tabItems}</Flex.Item>
        <TabContent>{content}</TabContent>
      </Flex>
    );
  }

  @autobind()
  private _onTabItemClick(key: string | number) {
    this.setState({
      selectedKey: key
    });
  }
}

export { TabProps } from "./components/Tab";
export default attachProps(VerticalTabs, {
  Tab
});
