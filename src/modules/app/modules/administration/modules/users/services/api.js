import { api } from "src/boot/axios";

export default {
  getUsers(_store) {
    return api.get("api/Authentication/GetList");
  },
  // Invitation Users
  getInvitationUsers: () => api.get("api/InvitationUsers/GetList"),
  getInvitationUser: (id) =>
    api.get("api/InvitationUsers/GetById/", {
      params: {
        Id: id
      }
  }),
  updateInvitationUser: (invitation) => api.put("api/InvitationUsers/Update", invitation),
  createInvitationUser: (invitation) => api.post("api/InvitationUsers/Create", invitation),
  deleteInvitationUser: (id) =>
    api.delete("api/InvitationUsers/Delete", {
      params: {
        Id: id
      }
  }),
  finalRegisterationInvitationUser(_store) {
    return api.get("api/InvitationUsers/FinalRegistration/");
  },
  searchInvitationUser(_store) {
    return api.get("api/InvitationUsers/Search/");
  },
  filterInvitationUser(_store) {
    return api.get("api/InvitationUsers/Filtration");
  },
  // Log Users
  getLogUsers(_store) {
    return api.get("api/LogUsers/GetList");
  },
  searchLogUsers(_store) {
    return api.get("api/LogUsers/Search/");
  },
  filterLogUsers(_store) {
    return api.get("api/LogUsers/Filtration");
  },
  // Deleted Users
  getdeletedUsers(_store) {
    return api.get("api/Authentication/GetDeletedList");
  },
  // All Companies
  getCompanies: () => api.get("api/Organization/GetAllCompanies"),
};

