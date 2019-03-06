import * as React from "react";

import { Trans } from "react-i18next";

import AbstractLoadButton from "@/services/oni-save/components/AbstractLoadButton";

const LoadButton: React.SFC = () => (
  <AbstractLoadButton>
    {({ disabled, onClick }) => (
      <button disabled={disabled} onClick={onClick}>
        <Trans i18nKey="save-file.verbs.load_titlecase">Load</Trans>
      </button>
    )}
  </AbstractLoadButton>
);
export default LoadButton;
