import * as React from "react";
import { get, last } from "lodash-es";
import { connect } from "react-redux";

import { AbstractPathSelectorProps, PathMenuItemProps } from "./props";
import mapStateToProps, { StateProps } from "./state-props";

import { getPathSettings } from "./path-settings";

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
    for (let i = 0; i < path.length; i++) {
      const subPath = path.slice(0, i + 1);
      pathMenuItems.push({
        label: this._getPathName(subPath),
        onClick: this._onSelectPath.bind(this, subPath)
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
      const value = target[key];
      if (!value || typeof value !== "object") {
        continue;
      }
      pathMenuItems.push({
        label: this._getPathName([...path, key]),
        onClick: this._onSelectPath.bind(this, [...path, key])
      });
    }

    return pathMenuItems;
  };

  private _onSelectPath = (path: string[]) => {
    const { onChange } = this.props;
    onChange(path);
  };

  private _getPathName = (path: string[]) => {
    const { saveGame } = this.props;
    const settings = getPathSettings(path);
    if (!settings || !settings.getLabel) {
      return last(path)!;
    }
    return settings.getLabel(get(saveGame, path));
  };
}
export default connect(mapStateToProps)(AbstractPathSelector);
