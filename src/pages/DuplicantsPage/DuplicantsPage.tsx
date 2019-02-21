import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import PageContainer from "@/components/PageContainer";

import DuplicantList from "./components/DuplicantList";

type Props = WithTranslation;
const DuplicantsPage: React.SFC<Props> = ({ t }) => (
  <PageContainer title={t("duplicants.title")}>
    <DuplicantList />
  </PageContainer>
);
export default withTranslation()(DuplicantsPage);
