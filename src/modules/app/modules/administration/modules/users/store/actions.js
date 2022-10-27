import api from "../services/api";
// import api from "../services/mocked-api";
const actions = {
  get(_store, data) {
    return api.get(data);
  },
  async getUsers(_store) {
    const response = await api.getUsers();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  // Invitation Users
  async getInvitationUsers(_store) {
    const response = await api.getInvitationUsers();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  async getInvitationUser(_store) {
    const response = await api.getInvitationUser();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  async updateInvitationUser(_store) {
    const response = await api.updateInvitationUser();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  async createInvitationUser(_store) {
    const response = await api.createInvitationUser();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  async deleteInvitationUser(_store) {
    const response = await api.deleteInvitationUser();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  async finalRegisterationInvitationUser(_store) {
    const response = await api.finalRegisterationInvitationUser();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  async searchInvitationUser(_store) {
    const response = await api.searchInvitationUser();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  async filterInvitationUser(_store) {
    const response = await api.filterInvitationUser();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  // Log Users
  async getLogUsers(_store) {
    const response = await api.getLogUsers();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  async searchLogUsers(_store) {
    const response = await api.searchLogUsers();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  async filterLogUsers(_store) {
    const response = await api.filterLogUsers();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  // Deleted Users
  async getdeletedUsers(_store) {
    const response = await api.getdeletedUsers();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  // All Companies
  async getCompanies(_store) {
    const response = await api.getCompanies();

    return {
      data: {
        items: response.data.value
      }
    };
  },
};

export default actions;
