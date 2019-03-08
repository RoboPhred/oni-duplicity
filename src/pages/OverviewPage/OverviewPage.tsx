import * as React from "react";

import { LoadingStatus } from "@/services/oni-save/state";
import AbstractLoadStatus from "@/services/oni-save/components/AbstractLoadStatus";

import NoSave from "./components/NoSave";
import SaveOverview from "./components/SaveOverview";
import SaveError from "./components/SaveError";

const OverviewPage: React.SFC = () => (
  <AbstractLoadStatus>
    {({ status }) => {
      switch (status) {
        default:
          return <NoSave />;
        case LoadingStatus.Error:
          return <SaveError />;
        case LoadingStatus.Ready:
          return <SaveOverview />;
      }
    }}
  </AbstractLoadStatus>
);

export default OverviewPage;
