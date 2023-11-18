import * as React from "react";
import { useSelector } from "react-redux";

import { dlcIdSelector } from "@/services/oni-save/selectors/dlc";

export interface RedirectIfNoDLCProps {
  dlcId: string;
  fallback?: React.ReactNode;
}

const RequireDLC: React.FC<RedirectIfNoDLCProps> = ({
  dlcId,
  fallback,
  children,
}) => {
  const currentDlcId = useSelector(dlcIdSelector);
  if (currentDlcId === dlcId) {
    return <>{children}</>;
  }

  return fallback ? <>{fallback}</> : null;
};

export default RequireDLC;
