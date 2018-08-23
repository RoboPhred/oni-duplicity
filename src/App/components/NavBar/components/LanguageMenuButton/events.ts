import { setLanguage } from "@/actions/set-language";

const mapDispatchToProps = {
  onSetLanguage: setLanguage
};
export type DispatchProps = typeof mapDispatchToProps;
export default mapDispatchToProps;
