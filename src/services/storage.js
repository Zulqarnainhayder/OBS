import { LocalStorage } from "quasar";

import { APP_SETTINGS_KEY } from "configs/storage";
import { DEFAULT_LANG } from "src/configs/language";

export default {
  updateSettings(updates = {}) {
    const key = APP_SETTINGS_KEY;
    const current = LocalStorage.getItem(key);
    let next = {};

    if (current) {
      next = current;
    }

    LocalStorage.set(key, {
      ...next,
      ...updates,
    });
  },
  getSetting(setting) {
    const key = APP_SETTINGS_KEY;
    const settings = LocalStorage.getItem(key);
    const defaultValue = setting === "lang" ? DEFAULT_LANG : false;

    if (settings) {
      return settings[setting] || defaultValue;
    }

    return defaultValue;
  },
};
