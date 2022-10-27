import Storage from "src/services/storage";

const mutation = {
  setLang(state, lang) {
    state.lang = lang;
    Storage.updateSettings({ lang });
  },
  setDark(state, dark) {
    state.dark = dark;
    Storage.updateSettings({ dark });
  },
  setLookups(state, { name, lookups, cached }) {
    const mergedLookups = {
      ...state.lookups,
      [name]: lookups,
    };

    state.lookups = mergedLookups;

    if (cached) {
      Storage.updateSettings({ lookups: mergedLookups });
    }
  },
  setLookupInprogress(state, lookup) {
    state.lookupsQueue[lookup] = true;
  },
};

export default mutation;
