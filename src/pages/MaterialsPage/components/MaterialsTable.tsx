import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import AbstractMaterialList from "@/services/oni-save/components/AbstractMaterialList";

import DeleteLooseButton from "./DeleteLooseButton";

export interface MaterialsPageProps {
  className?: string;
}

type Props = MaterialsPageProps & WithTranslation;

const MaterialsTable: React.FC<Props> = ({ className, t }) => {
  function formatWeight(weight: number) {
    if (Math.abs(weight) < 1000) {
      const g = Number(weight.toFixed(2));
      return t("material.gram", { count: g });
    }

    const kg = Number((weight / 1000.0).toFixed(2));
    return t("material.kilogram", { count: kg });
  }

  return (
    <AbstractMaterialList>
      {({ materials, onDeleteLooseMaterial }) => (
        <Table className={className}>
          <TableHead>
            <TableRow>
              <TableCell>{t("material.noun_titlecase")}</TableCell>
              <TableCell>
                {t("material_loose.noun_titlecase")}
                <DeleteLooseButton
                  materialName={t("material.all_titlecase")}
                  onDelete={onDeleteLooseMaterial}
                />
              </TableCell>
              <TableCell>{t("material_storage.noun_titlecase")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map(
              ({ name, looseGrams, looseCount, storedGrams, storedCount }) => (
                <TableRow key={name}>
                  <TableCell>{name}</TableCell>
                  <TableCell>
                    {looseGrams > 0 && (
                      <>
                        {formatWeight(looseGrams)}
                        <br />
                        {t("material_loose.clump_count", { count: looseCount })}
                      </>
                    )}
                  </TableCell>
                  <TableCell>
                    {storedGrams > 0 && (
                      <>
                        {formatWeight(storedGrams)}
                        <br />
                        {t("material_storage.container_count", {
                          count: storedCount
                        })}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      )}
    </AbstractMaterialList>
  );
};

export default withTranslation()(MaterialsTable);
