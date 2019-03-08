import * as React from "react";
import { connect } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import CopyMenuItem from "./components/CopyMenuItem";

import mapDispatchToProps, { DispatchProps } from "./dispatch-props";
import ExportMenuItem from "./components/ExportMenuItem";
import AbstractImportButton from "@/services/oni-save/components/AbstractImportButton";
import PasteMenuItem from "./components/PasteMenuItem";

export interface DuplicantMenuProps {
  gameObjectId: number;
}

type Props = DuplicantMenuProps & DispatchProps;
const DuplicantMenu: React.SFC<Props> = ({ gameObjectId, cloneDuplicant }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const onOpen = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);

  const onClose = React.useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <IconButton
        aria-owns={anchorEl ? "duplicant-menu" : undefined}
        aria-haspopup="true"
        onClick={onOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="duplicant-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <CopyMenuItem gameObjectId={gameObjectId} onClose={onClose} />
        <PasteMenuItem gameObjectId={gameObjectId} onClose={onClose} />
        <Divider />
        <AbstractImportButton gameObjectId={gameObjectId} onComplete={onClose}>
          {({ onClick }) => <MenuItem onClick={onClick}>Import</MenuItem>}
        </AbstractImportButton>
        <ExportMenuItem gameObjectId={gameObjectId} onClose={onClose} />
        <Divider />
        <MenuItem
          onClick={() => {
            onClose();
            cloneDuplicant(gameObjectId);
          }}
        >
          Clone
        </MenuItem>
      </Menu>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(DuplicantMenu);
