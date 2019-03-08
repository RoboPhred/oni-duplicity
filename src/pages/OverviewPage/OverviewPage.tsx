import * as React from "react";

import { LoadingStatus } from "@/services/oni-save/state";
import AbstractLoadStatus from "@/services/oni-save/components/AbstractLoadStatus";

import NoSave from "./components/NoSave";
import SaveOverview from "./components/SaveOverview";

const OverviewPage: React.SFC = () => (
  <AbstractLoadStatus>
    {({ status }) => {
      return status === LoadingStatus.Ready ? <SaveOverview /> : <NoSave />;
    }}
  </AbstractLoadStatus>
);

export default OverviewPage;
