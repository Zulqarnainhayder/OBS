import { store } from "quasar/wrappers";
import { createStore } from "vuex";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

import AppModule from "src/modules/app/store";
import AuthModule from "src/modules/auth/store";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export const Store = createStore({
  // Global
  getters,
  mutations,
  actions,
  state,

  // Modules
  modules: {
    AppModule,
    AuthModule,
  },

  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: process.env.DEBUGGING,
});

export default store(() => {
  return Store;
});
