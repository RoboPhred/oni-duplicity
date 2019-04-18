import * as React from "react";
import { entries } from "lodash-es";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const languages: Record<string, string> = {
  en: "English",
  zh: "Chinese",
  ru: "Russian"
};

export interface LanguageProps {
  currentLanguage: string;
  onChangeLanguage(language: string): void;
}
const Language: React.FC<LanguageProps> = ({
  currentLanguage,
  onChangeLanguage
}) => (
  <Select
    value={currentLanguage}
    onChange={e => onChangeLanguage(e.target.value)}
  >
    {entries(languages).map(([code, title]) => (
      <MenuItem key={code} value={code}>
        {title}
      </MenuItem>
    ))}
  </Select>
);

export default Language;
