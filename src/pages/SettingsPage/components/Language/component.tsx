import * as React from "react";
import { entries, sortBy } from "lodash";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const languages: Record<string, string> = {
  en: "English",
  zh: "Chinese",
  ru: "Russian",
  cs: "Czech",
  es: "Spanish"
};

export interface LanguageProps {
  currentLanguage: string;
  onChangeLanguage(language: string): void;
}
const Language: React.FC<LanguageProps> = ({
  currentLanguage,
  onChangeLanguage
}) => {
  const onChange = React.useCallback(
    (e: React.ChangeEvent<{ value: unknown }>) => {
      onChangeLanguage(e.target.value as string);
    },
    [onChangeLanguage]
  );

  let langEntries = entries(languages);
  langEntries = sortBy(langEntries, x => x[1]);

  return (
    <Select value={currentLanguage} onChange={onChange}>
      {langEntries.map(([code, title]) => (
        <MenuItem key={code} value={code}>
          {title}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Language;
