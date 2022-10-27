import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";

import useAuth from "src/composables/auth";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : process.env.VUE_ROUTER_MODE === "history"
  ? createWebHistory
  : createWebHashHistory;

export const Router = createRouter({
  scrollBehavior: (to, _from, savedPosition) => {
    const isNoScroll = to.matched.find((item) => item.meta.noScroll);

    if (isNoScroll) {
      return savedPosition;
    }

    return { left: 0, top: 0 };
  },
  routes,

  // Leave this as is and make changes in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  history: createHistory(
    process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
  ),
});

Router.beforeEach((to) => {
  const { isAuthorized } = useAuth();
  const permissions =
    typeof to.meta.permissions === "string"
      ? [to.meta.permissions]
      : to.meta.permissions;

  if (permissions && !isAuthorized(...permissions)) {
    return { path: "/401" };
  }

  return true;
});

export default route((/* { store, ssrContext } */) => {
  return Router;
});
