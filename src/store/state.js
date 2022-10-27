import { DEFAULT_LANG } from "configs/language";
import { DEFAULT_DARK } from "configs/dark";
import Storage from "src/services/storage";

export default () => ({
  lang: Storage.getSetting("lang") || DEFAULT_LANG,
  dark:
    Storage.getSetting("dark") === undefined
      ? DEFAULT_DARK
      : Storage.getSetting("dark"),
  lookups: Storage.getSetting("lookups") || {},
  lookupsQueue: {},
});
