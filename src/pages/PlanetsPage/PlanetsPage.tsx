import React from "react";
import { DLCIds } from "oni-save-parser";
import { Redirect } from "react-router";

import PageContainer from "@/components/PageContainer";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";
import RequireDLC from "@/components/RequireDLC";

import PlanetList from "./components/PlanetList";

const PlanetsPage: React.FC = () => (
  <PageContainer title="Planets">
    <RedirectIfNoSave />
    <RequireDLC dlcId={DLCIds.None} fallback={<Redirect to="/" />}>
      <PlanetList />
    </RequireDLC>
  </PageContainer>
);

export default PlanetsPage;
