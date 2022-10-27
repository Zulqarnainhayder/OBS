import api from "../services/api";

const actions = {
  async get({ commit, dispatch }) {
    try {
      const response = await api.get();
      const profile = response.data.data;

      commit("setProfile", profile);

      // const { value: theme } = profile.profileSettings;

      // if (theme) {
      //   dispatch("applySettings", theme, { root: true });
      // }

      return Promise.resolve(profile);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async update({ commit }, data) {
    try {
      await api.update(data);

      commit("updateProfile", data);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default actions;
