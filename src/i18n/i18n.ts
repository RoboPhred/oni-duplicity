import i18n from "i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import { isProd } from "@/runtime-env";

// TODO: Use backends to save on file space
//  Deferring until I get a chance to focus on splitting the bundles.
// import Backend from "i18next-xhr-backend";

i18n
  // .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: "en",

    // have a common namespace used around the full app
    ns: ["common", "oni"],
    defaultNS: "common",

    resources: {
      en: {
        common: require("./translations/en/common.json")
      },
      zh: {
        common: require("./translations/zh/common.json")
      }
    },

    debug: !isProd,

    interpolation: {
      escapeValue: false // not needed for react!!
    },

    react: {
      wait: true
    }
  });

export default i18n;
