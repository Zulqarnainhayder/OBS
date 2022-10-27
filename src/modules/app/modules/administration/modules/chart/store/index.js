import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

import chartsAccounts from "../pages/charts-accounts/store";

const module = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,

  modules: {
    MainPage: chartsAccounts
  }
};

export default module;
