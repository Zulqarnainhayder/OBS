import Storage from "src/services/storage";

const mutation = {
  setProfile(state, profile) {
    Storage.updateSettings({ profile });
    state.profile = profile;
  },
  updateProfile(state, profile) {
    // Merge
    const updates = { ...state.profile, ...profile };

    // Save
    Storage.updateSettings({ profile: updates });
    state.profile = updates;
  },
};

export default mutation;
