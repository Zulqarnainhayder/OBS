import Storage from "src/services/storage";

const mutation = {
  setLoading(state, status) {
    state.loading = status;
  },
  setToken(state, token) {
    Storage.updateSettings({ token });
    state.token = token;
  },
  logout(state) {
    const token = null;
    const profile = null;

    Storage.updateSettings({ token, profile });
    state.token = token;
    state.profile = profile;
  },
  resetPassword(state) {
    const token = null;

    Storage.updateSettings({ token });
    state.token = token;
  },
};

export default mutation;
