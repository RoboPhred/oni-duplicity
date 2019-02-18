import * as React from "react";

import { Trans } from "react-i18next";

import AbstractSaveStatus from "@/services/oni-save/components/AbstractSaveStatus";

const SaveStatus: React.SFC = () => (
  <div>
    <Trans i18nKey="save-file.status">Status</Trans>:{" "}
    <AbstractSaveStatus>
      {({ loadingStatus }) => loadingStatus}
    </AbstractSaveStatus>
  </div>
);
export default SaveStatus;
