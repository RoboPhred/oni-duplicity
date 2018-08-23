import * as React from "react";
import { connect } from "react-redux";
import { Trans, translate } from "react-i18next";

import { Intent, Space } from "@/style";

import mapStateToProps, { StateProps } from "./derived-state";

import Text from "@/components/Text";
import Box from "@/components/Box";

type Props = StateProps;
const Loading: React.SFC<Props> = ({
  loadingState,
  loadingProgressMessageSelector
}) => (
  <Box p={Space.Large}>
    <Text intent={Intent.Primary}>
      {loadingState === "loading" ? (
        <Trans i18nKey="save-file.loading">Loading</Trans>
      ) : (
        <Trans i18nKey="save-file.saving">Saving</Trans>
      )}
    </Text>
    <br />
    <Text intent={Intent.Secondary}>{loadingProgressMessageSelector}</Text>
  </Box>
);
Loading.displayName = "LoadingPage";
export default connect(mapStateToProps)(translate()(Loading));
