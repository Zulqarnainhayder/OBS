import { Notify } from "quasar";
import { Router } from "src/router";
import { i18n } from "src/boot/i18n";
import { DEFAULT_ROUTE } from "src/configs/router";

import api from "../services/api";

const actions = {
  saveUserProfileSettings(_store, payload) {
    return api.saveUserProfileSettings(payload)
  },
  async login({ commit, dispatch }, data) {
    try {
      commit("setLoading", true);

      // Handle redirect path
      const path = window.location.search?.includes("redirect")
        ? window.location.search.split("?redirect=")[1]
        : DEFAULT_ROUTE;

      // Login
      const loginResponse = await api.login(data);
      const token = loginResponse.data.value.accessToken;

      // Save token
      commit("setToken", token);

      // Get profile
      await dispatch("AppModule/ProfileModule/get", {}, { root: true });

      // Navigate to app
      Router.push(path);
    } catch (error) {
      // Handle
      Notify.create({
        position: "top",
        message: i18n.t("auth.errors.LOGIN_FAILED"),
        caption: i18n.t(`auth.errors.${error?.response?.data?.code}`),
        type: "negative",
      });

      return Promise.reject(error);
    } finally {
      commit("setLoading", false);
    }
  },
  checkAuthState({ state, rootState }) {
    const { token } = state;
    const { profile } = rootState.AppModule.ProfileModule;

    if (!token || !profile) {
      Router.push("/auth");
    } else if (!Router.currentRoute.value.path.includes("/app")) {
      Router.push("/app");
    }
  },
  logout({ commit }, shouldCacheUrl = false) {
    const redirect =
      window.location.pathname.includes("/auth") || !shouldCacheUrl
        ? undefined
        : window.location.pathname;

    Router.push({
      path: "/auth/login",
      query: {
        redirect,
      },
    });

    commit("logout");
  },
  resetPassword(_store, data) {
    return api.resetPassword(data);
  },
};

export default actions;
