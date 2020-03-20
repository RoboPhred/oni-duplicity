import * as React from "react";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export interface BackButtonProps {
  className?: string;
  onClick(): void;
}

type Props = BackButtonProps;
const BackButton: React.FC<Props> = ({ className, onClick }) => (
  <IconButton
    className={className}
    color="inherit"
    aria-label="Back"
    onClick={onClick}
  >
    <ArrowBackIcon />
  </IconButton>
);

export default BackButton;
