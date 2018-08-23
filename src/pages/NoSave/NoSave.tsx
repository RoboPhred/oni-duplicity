import * as React from "react";

import { Trans, translate } from "react-i18next";

import { Intent } from "@/style";

import { OSType } from "@/runtime-env";

import NonIdealState from "@/components/NonIdealState";
import Text from "@/components/Text";
import Code from "@/components/Code";

const SaveFilePaths: Record<OSType, string | null> = {
  windows: "Documents/Klei/OxygenNotIncluded/save_files",
  mac: null,
  linux: "~/.config/unity3d/Klei/Oxygen Not Included/save_files",
  unknown: null
};

const NoSave: React.SFC = () => (
  <NonIdealState intent={Intent.Hint} header={"No File Loaded"}>
    <Text intent={Intent.Hint}>
      <div>
        <Trans i18nKey="save-file.instructions">
          Load a save using the controls on the upper left.
        </Trans>
      </div>
      {SaveFilePaths[OSType] && (
        <div>
          <Trans
            i18nKey="save-file.save-location"
            defaults="Save files can be found at <0>{{path}}</0>"
            values={{ path: SaveFilePaths[OSType] }}
            components={[<Code key="SaveFilePath"/>]}
          />
        </div>
      )}
    </Text>
  </NonIdealState>
);
NoSave.displayName = "NoSavePage";
export default translate()(NoSave);
