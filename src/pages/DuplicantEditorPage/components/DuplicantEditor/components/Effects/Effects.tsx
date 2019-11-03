import * as React from "react";
import { AIEffectsBehavior } from "oni-save-parser";
import { merge } from "lodash";

import { Trans } from "react-i18next";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import useBehavior from "@/services/oni-save/hooks/useBehavior";

import CommitTextField from "@/components/CommitTextField";

import AddEffectButton from "./components/AddEffectButton";

export interface EffectsProps {
  gameObjectId: number;
}

type Props = EffectsProps;
const Effects: React.FC<Props> = ({ gameObjectId }) => {
  const { templateData, onTemplateDataModify } = useBehavior(gameObjectId, AIEffectsBehavior);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Trans i18nKey="duplicant_effect.noun_titlecase">Effect</Trans>
          </TableCell>
          <TableCell align="right">
            <Trans i18nKey="time_cycles.noun_titlecase">
              Time (cycles)
                </Trans>
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
  );
};

export default Effects;
