import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import PageContainer from "@/components/PageContainer";

type Props = WithTranslation;
const Duplicants: React.SFC<Props> = ({ t }) => (
  <PageContainer title={t("duplicants.title")}>Hello World</PageContainer>
);
export default withTranslation()(Duplicants);
