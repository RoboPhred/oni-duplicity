import * as React from "react";

import { WithTranslation, withTranslation } from "react-i18next";

import IconButton from "@material-ui/core/IconButton";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export interface GithubButtonProps {
  className?: string;
}
type Props = GithubButtonProps & WithTranslation;
const GithubButton: React.FC<Props> = ({ className, t }) => (
  <IconButton
    className={className}
    component="a"
    href="https://github.com/RoboPhred/oni-duplicity"
    target="_blank"
    title={t("view-github")}
  >
    <FontAwesomeIcon icon={faGithub} />
  </IconButton>
);

export default withTranslation()(GithubButton);
