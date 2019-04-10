import * as React from "react";

import { I18nextProvider } from "react-i18next";

import i18n from "../i18n";

const I18NProvider: React.FC = ({ children }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);
export default I18NProvider;
