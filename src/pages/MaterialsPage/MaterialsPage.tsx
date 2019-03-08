import * as React from "react";
import { connect } from "react-redux";

import { WithTranslation, withTranslation } from "react-i18next";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import PageContainer from "@/components/PageContainer";
import RedirectIfNoSave from "@/components/RedirectIfNoSave";

import mapStateToProps, { StateProps } from "./state-props";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing.unit
    }
  });

type Props = StateProps & StyleProps<typeof styles> & WithTranslation;

const MaterialsPage: React.SFC<Props> = ({ classes, materialData, t }) => {
  return (
    <PageContainer title={t("materials.title", { defaultValue: "Materials" })}>
      <RedirectIfNoSave />
      <Table className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell>Element</TableCell>
            <TableCell>Loose Ore</TableCell>
            <TableCell>Storage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materialData.map(
            ({
              elementName,
              freeStandingGrams,
              freeStandingCount,
              storageGrams,
              storageCount
            }) => (
              <TableRow key={elementName}>
                <TableCell>{elementName}</TableCell>
                <TableCell>
                  {freeStandingGrams > 0 && (
                    <>
                      {formatWeight(freeStandingGrams)}
                      <br />
                      {freeStandingCount} clump
                      {freeStandingCount !== 1 ? "s" : ""}
                    </>
                  )}
                </TableCell>
                <TableCell>
                  {storageGrams > 0 && (
                    <>
                      {formatWeight(storageGrams)}
                      <br />
                      {storageCount} container{storageCount !== 1 ? "s" : ""}
                    </>
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </PageContainer>
  );
};

export default connect(mapStateToProps)(
  withStyles(styles)(withTranslation()(MaterialsPage))
);

function formatWeight(weight: number) {
  if (Math.abs(weight) < 1000) {
    return `${weight.toFixed(2)} g`;
  }

  return `${(weight / 1000.0).toFixed(2)} kg`;
}
