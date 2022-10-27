import api from "../services/api";

const actions = {
  getAccount(_store, id) {
    return api.getAccount(id);
  },
  createAccount(_store, data) {
    return api.createAccount(data);
  },
  editAccount(_store, data) {
    return api.editAccount(data);
  },
  getGroup(_store, id) {
    return api.getGroup(id);
  },
  createGroup(_store, data) {
    return api.createGroup(data);
  },
  editGroup(_store, data) {
    return api.editGroup(data);
  },
  exportModule(_store) {
    return api.exportModule();
  },
  importModule(_store, data) {
    return api.importModule(data);
  },
  getGroupLevel(_store, id) {
    return api.getGroupLevel(id);
  },
};

export default actions;
