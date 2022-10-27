import api from "../services/api";

const actions = {
  getGroups(_store) {
    return api.getGroups();
  },
  getTree(_store, data) {
    return api.getTree(data);
  },
  createGroup(_store, data) {
    return api.createGroup(data);
  },
  createAccount(_store, data) {
    return api.createAccount(data);
  },
  pastItem(_store, data) {
    return api.pastItem(data);
  },
  deleteItem(_store, id) {
    return api.deleteItem(id);
  },
  duplicateItem(_store, data) {
    return api.duplicateItem(data);
  },
  exportTree(_store) {
    return api.exportTree();
  },
  importTree(_store, data) {
    return api.importTree(data);
  },
  filter(_store, data) {
    return api.filter(data);
  },
  checkErrors(_store, data) {
    return api.checkErrors(data);
  },
};

export default actions;
