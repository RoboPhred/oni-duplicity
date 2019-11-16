import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { isProd } from "@/runtime-env";

// TODO: Use backends to save on file space
//  Deferring until I get a chance to focus on splitting the bundles.
// import Backend from "i18next-xhr-backend";

i18n.use(initReactI18next).init({
  fallbackLng: "en",

  ns: ["common", "oni"],
  defaultNS: "common",

  resources: {
    cs: {
      common: require("@/translations/cs/common.json"),
      oni: require("@/translations/cs/oni.json")
    },
    en: {
      common: require("@/translations/en/common.json"),
      oni: require("@/translations/en/oni.json")
    },
    es: {
      common: require("@/translations/es/common.json"),
      oni: require("@/translations/es/oni.json")
    },
    ru: {
      common: require("@/translations/ru/common.json")
    },
    zh: {
      common: require("@/translations/zh/common.json"),
      oni: require("@/translations/zh/oni.json")
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
