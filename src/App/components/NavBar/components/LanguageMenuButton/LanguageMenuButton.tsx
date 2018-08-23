import * as React from "react";
import { connect } from "react-redux";

import { Intent } from "@/style";

import mapDispatchToProps, { DispatchProps } from "./events";
import mapStateToProps, { StateProps } from "./derived-state";

import Button from "@/components/Button";

export interface LanguageMenuButtonProps {
  lang: string;
}
type Props = LanguageMenuButtonProps & StateProps & DispatchProps;
const LanguageMenuButton: React.SFC<Props> = ({
  lang,
  language,
  onSetLanguage,
  children
}) => (
  <Button
    intent={lang === language ? Intent.Primary : Intent.Secondary}
    onClick={() => onSetLanguage(lang)}
  >
    {children}
  </Button>
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageMenuButton);
