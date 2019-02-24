import * as React from "react";
import { AIAttributeLevelsBehavior } from "oni-save-parser";
import { merge } from "lodash-es";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

import CommitTextField from "@/components/CommitTextField";

const AttributesEditor = AbstractBehaviorEditor.ofType(
  AIAttributeLevelsBehavior
);

export interface AttributesTabProps {
  gameObjectId: number;
}

type Props = AttributesTabProps;
const AttributesTab: React.SFC<Props> = ({ gameObjectId }) => (
  <AttributesEditor gameObjectId={gameObjectId}>
    {({ templateData, onTemplateDataModify }) => (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Attribute</TableCell>
              <TableCell align="right">Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {templateData.saveLoadLevels.map(({ attributeId, level }, i) => (
              <TableRow key={attributeId}>
                <TableCell component="th" scope="row">
                  {attributeId}
                </TableCell>
                <TableCell align="right">
                  <CommitTextField
                    type="number"
                    value={level}
                    onCommit={value => {
                      onTemplateDataModify({
                        saveLoadLevels: merge([], templateData.saveLoadLevels, {
                          [i]: { attributeId, level: Number(value) }
                        })
                      });
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )}
  </AttributesEditor>
);

export default AttributesTab;
