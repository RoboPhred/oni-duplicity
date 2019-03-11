import { deleteLooseMaterial } from "../../actions/delete-loose-material";

const mapDispatchToProps = {
  onDeleteLooseMaterial: deleteLooseMaterial
};
export default mapDispatchToProps;
export type DispatchProps = typeof mapDispatchToProps;
