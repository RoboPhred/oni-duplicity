import * as React from "react";
import { MinionResumeBehavior } from "oni-save-parser";
import { merge } from "lodash-es";

import { Trans } from "react-i18next";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";
const ResumeEditor = AbstractBehaviorEditor.ofType(MinionResumeBehavior);

export interface JobsProps {
  gameObjectId: number;
}

type Props = JobsProps;

const Jobs: React.SFC<Props> = ({ gameObjectId }) => (
  <ResumeEditor gameObjectId={gameObjectId}>
    {({ templateData: { MasteryByRoleID }, onTemplateDataModify }) => {
      if (!MasteryByRoleID) {
        MasteryByRoleID = [];
      }
      return (
        <Table>
          <TableHead>
            <TableCell>
              <Trans i18nKey="duplicant-editor.job">Job</Trans>
            </TableCell>
            <TableCell align="right">
              <Trans i18nKey="duplicant-editor.mastery">Mastery</Trans>
            </TableCell>
          </TableHead>
          <TableBody>
            {MasteryByRoleID.map((data, i) => {
              const [job, mastery] = data;
              if (job === "NoRole") {
                return undefined;
              }
              return (
                <TableRow key={job}>
                  <TableCell component="th" scope="row">
                    <Trans i18nKey={`oni:todo-trans.jobs.${job}`}>{job}</Trans>
                  </TableCell>
                  <TableCell align="right">
                    <Checkbox
                      checked={mastery}
                      onChange={e => {
                        onTemplateDataModify({
                          MasteryByRoleID: merge([], MasteryByRoleID, {
                            [i]: [job, e.target.checked]
                          })
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    }}
  </ResumeEditor>
);

export default Jobs;
