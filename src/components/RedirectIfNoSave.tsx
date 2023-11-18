import * as React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { hasSaveSelector } from "@/services/oni-save/selectors/save-game";

const RedirectIfNoSave: React.FC = () => {
  const hasSave = useSelector(hasSaveSelector);
  if (!hasSave) {
    return <Redirect to="/" />;
  }
  return null;
};

export default RedirectIfNoSave;
