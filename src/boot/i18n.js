import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";
import { DEFAULT_LANG } from "configs/language";

const i18nInstance = createI18n({
  legacy: false,
  globalInjection: true,
  locale: DEFAULT_LANG,
  messages,
});

export default boot(({ app }) => {
  app.use(i18nInstance);
});

export const i18n = i18nInstance.global;
