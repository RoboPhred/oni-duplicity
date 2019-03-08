import * as React from "react";

import { Redirect } from "react-router-dom";

import AbstractLoadStatus from "@/services/oni-save/components/AbstractLoadStatus";
import { LoadingStatus } from "@/services/oni-save/state";

const RedirectIfNoSave: React.SFC = () => (
  <AbstractLoadStatus>
    {({ status }) => {
      if (status === LoadingStatus.Idle) {
        return <Redirect to="/" />;
      }
      return <></>;
    }}
  </AbstractLoadStatus>
);

export default RedirectIfNoSave;
