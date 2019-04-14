import * as React from "react";

import { Redirect } from "react-router-dom";

export interface RedirectIfNoSaveProps {
  hasSave: boolean;
}

type Props = RedirectIfNoSaveProps;
const RedirectIfNoSave: React.FC<Props> = ({ hasSave }) => {
  if (!hasSave) {
    return <Redirect to="/" />;
  }
  return null;
};

export default RedirectIfNoSave;
