import * as React from "react";
import { get } from "lodash-es";
import { connect } from "react-redux";

import { AbstractPathSelectorProps, PathMenuItemProps } from "./props";
import mapStateToProps, { StateProps } from "./state-props";

type Props = AbstractPathSelectorProps & StateProps;
class AbstractPathSelector extends React.Component<Props> {
  render() {
    const { children } = this.props;
    const {} = this.state;
    return children({
      pathMenu: this._generatePathMenu(),
      nextItemMenu: this._generateNextMenu()
    });
  }

  private _generatePathMenu = (): PathMenuItemProps[] => {
    const pathMenuItems: PathMenuItemProps[] = [
      {
        label: "SaveGame",
        onClick: this._onSelectPath.bind(this, [])
      }
    ];

    const { path } = this.props;
    for (const segment of path) {
      pathMenuItems.push({
        label: segment,
        onClick: this._onSelectPath.bind(this, path)
      });
    }

    return pathMenuItems;
  };

  private _generateNextMenu = (): PathMenuItemProps[] => {
    const { saveGame } = this.props;
    const { path } = this.props;
    if (!saveGame) {
      return [];
    }

    const pathMenuItems: PathMenuItemProps[] = [];

    const target = path.length > 0 ? get(saveGame, path) : saveGame;

    if (!target || typeof target !== "object") {
      return [];
    }

    for (const key of Object.keys(target)) {
      pathMenuItems.push({
        label: key,
        onClick: this._onSelectPath.bind(this, [...path, key])
      });
    }

    return pathMenuItems;
  };

  private _onSelectPath = (path: string[]) => {
    const { onChange } = this.props;
    onChange(path);
  };
}
export default connect(mapStateToProps)(AbstractPathSelector);
