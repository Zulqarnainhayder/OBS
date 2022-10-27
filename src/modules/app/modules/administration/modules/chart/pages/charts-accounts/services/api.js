import { api } from "src/boot/axios";

export default {
  getGroups() {
    return api.get("api/Charts/AccountsGuide/GetMainGroupList");
  },
  getTree(data) {
    return api.post("api/Charts/AccountsGuide/GetData", data);
  },
  createGroup() {
    return api.post("api/Charts/AccountsGuide/CreateMainGroup", data);
  },
  createAccount() {
    return api.post("api/Charts/AccountsGuide/CreateAccount", data);
  },
  pastItem(data) {
    return api.post("api/Charts/AccountsGuide/Past", data);
  },
  deleteItem(Ids) {
    return api.delete(`api/Charts/AccountsGuide/Delete`, { params: { Ids } });
  },
  duplicateItem(id) {
    return api.post("api/Charts/AccountsGuide/Duplicate", { id });
  },
  exportTree() {
    return api.get("api/Charts/AccountsGuide/Export");
  },
  importTree(data) {
    return api.post("api/Charts/AccountsGuide/Import", data, {
      headers: { "Content-Type": "multipart/form-data", accept: "*/*" },
    });
  },
  filter(data) {
    return api.post("api/Charts/AccountsGuide/Filter", data);
  },
  checkErrors(data) {
    return api.post("api/Charts/AccountsGuide/CheckErrors", data);
  },
};
