import { api } from "src/boot/axios";

const actions = {
  get(_store, data) {
    return api.get(data);
  },

  createAccount: (payload) =>
    api.post("api/Charts/AccountsGuide/CreateAccount", payload),
  createGroup: (payload) =>
    api.post("api/Charts/AccountsGuide/CreateMainGroup", payload),
  getAccount: (id) =>
    api.get("api/Charts/AccountsGuide/GetAccountsGuideById", {
      params: { Id: id },
    }),
  editAccount: (data) =>
    api.put("api/Charts/AccountsGuide/UpdateAccount", data),
  getGroup: (id) =>
    api.get("api/Charts/AccountsGuide/GetAccountsGuideById", {
      params: { Id: id },
    }),
  editGroup: (data) => api.put("api/Charts/AccountsGuide/UpdateGroup", data),
  getGroupLevel: (id) =>
    api.get("api/Charts/AccountsGuide/GetLevelByGroup/" + id),

  exportModule: () =>
    api
      .get("api/Charts/AccountsGuide/Export", { responseType: "blob" })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Export report.xlsx");
        document.body.appendChild(link);
        link.click();
      }),

  // exportEmptyFile: () => api.get('link here', {responseType:'blob' }).then(function (response) {
  //   const url = window.URL.createObjectURL(new Blob([response.data]))
  //   const link = document.createElement('a')
  //   link.href = url
  //   link.setAttribute('download','Export report.xlsx')
  //   document.body.appendChild(link)
  //   link.click()
  // }),

  importModule: (data) => api.post("api/Charts/AccountsGuide/Import", data),
};

export default actions;
