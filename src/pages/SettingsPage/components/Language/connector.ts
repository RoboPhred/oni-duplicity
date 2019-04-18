import { connect } from "react-redux";

import { currentLanguageSelector } from "@/services/i18n/selectors/language";
import { setLanguage } from "@/services/i18n/actions/set-language";
import { createStructuredSelector } from "@/state";

const mapStateToProps = createStructuredSelector({
  currentLanguage: currentLanguageSelector
});

const mapDispatchToProps = {
  onChangeLanguage: setLanguage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
