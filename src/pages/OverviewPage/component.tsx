import * as React from "react";

import { LoadingStatus } from "@/services/oni-save/state";

import NoSave from "./components/NoSave";
import SaveOverview from "./components/SaveOverview";
import SaveError from "./components/SaveError";

export interface OverviewPageProps {
  loadingStatus: LoadingStatus;
}

type Props = OverviewPageProps;
const OverviewPage: React.FC<Props> = ({ loadingStatus }) => {
  switch (loadingStatus) {
    default:
      return <NoSave />;
    case LoadingStatus.Error:
      return <SaveError />;
    case LoadingStatus.Saving:
    case LoadingStatus.Ready:
      return <SaveOverview />;
  }
};

export default OverviewPage;
