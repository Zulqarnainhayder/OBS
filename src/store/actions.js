import { Quasar, Dark } from "quasar";
import { setLocale } from "@vee-validate/i18n";

import { i18n } from "boot/i18n";
import api from "../services/api";

const actions = {
  applySettings({ dispatch }, theme = {}) {
    dispatch("applyLang", theme.lang || undefined);
    dispatch("applyDark", theme.dark || undefined);
  },
  async applyLang({ state, commit }, selectedLanguage) {
    const langIso = selectedLanguage || state.lang;


    try {
      await import(
        /* webpackInclude: /(ar|en-US|bn|nl|fr|de|hi|id|zh|fa|ru|es|tr|uk|ur)\.js$/ */
        `quasar/lang/${langIso}`
      ).then((lang) => {
        Quasar.lang.set(lang.default);
        i18n.locale.value = langIso;
        setLocale(langIso);
        commit("setLang", langIso);
      });
    } catch (error) {
      const finalLangIso = langIso === 'ur' ? 'ar' : 'en-US';

      await import(
        /* webpackInclude: /(ar|en-US|bn|nl|fr|de|hi|id|zh|fa|ru|es|tr|uk|ur)\.js$/ */
        `quasar/lang/${finalLangIso}`
      ).then((lang) => {
        Quasar.lang.set(lang.default);
        i18n.locale.value = finalLangIso;
        setLocale(finalLangIso);
        commit("setLang", langIso);
      });;
    }
  },
  applyDark({ state, commit }, isDark) {
    const mode = isDark === undefined ? state.dark : isDark;

    Dark.set(mode);
    commit("setDark", mode);
  },
  async getLookup(
    { commit },
    { type, name, labelKey, valueKey, descriptionKey, cached, params }
  ) {
    const action = type === "remote" ? "get" : "getCustom";

    try {
      // Send call
      const response = await api.lookups[action]({ name, params });
      const lookups = response.data.value.map((item) => ({
        // Select targeted keys
        ...item,
        id: item[valueKey],
        label: typeof labelKey === "function" ? labelKey(item) : item[labelKey],
        description: descriptionKey
          ? item[descriptionKey]
          : item.description || "",
      }));

      // Save
      commit("setLookups", { name, lookups, cached });

      // Return
      return Promise.resolve(lookups);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export default actions;

