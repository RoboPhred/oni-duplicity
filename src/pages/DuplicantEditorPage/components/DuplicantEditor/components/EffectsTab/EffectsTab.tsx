import * as React from "react";
import { AIEffectsBehavior } from "oni-save-parser";
import { merge } from "lodash-es";

import { Trans } from "react-i18next";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import AbstractBehaviorEditor from "@/services/oni-save/components/AbstractBehaviorEditor";

import CommitTextField from "@/components/CommitTextField";

import AddEffectButton from "./components/AddEffectButton";

const EffectsEditor = AbstractBehaviorEditor.ofType(AIEffectsBehavior);

export interface EffectsTabProps {
  gameObjectId: number;
}

type Props = EffectsTabProps;
const EffectsTab: React.SFC<Props> = ({ gameObjectId }) => {
  return (
    <EffectsEditor gameObjectId={gameObjectId}>
      {({ templateData, onTemplateDataModify }) => (
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Trans i18nKey="duplicant-editor.effect">Effect</Trans>
                </TableCell>
                <TableCell align="right">
                  <Trans i18nKey="time-in-cycles">Time (cycles)</Trans>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {templateData.saveLoadEffects.map(({ id, timeRemaining }, i) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    <Trans i18nKey={`oni:todo-trans.effects.${id}`}>{id}</Trans>
                  </TableCell>
                  <TableCell align="right">
                    <CommitTextField
                      type="number"
                      value={timeRemaining / 200}
                      onCommit={value =>
                        onTemplateDataModify({
                          saveLoadEffects: merge(
                            [],
                            templateData.saveLoadEffects,
                            {
                              [i]: { id, timeRemaining: Number(value) * 200 }
                            }
                          )
                        })
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  <AddEffectButton gameObjectId={gameObjectId} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}
    </EffectsEditor>
  );
};

export default EffectsTab;
