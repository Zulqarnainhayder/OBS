import { defineRule, configure } from "vee-validate";
import {
  required,
  email,
  min,
  confirmed,
  regex,
  alpha_num,
  numeric,
  url
} from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import ar from "@vee-validate/i18n/dist/locale/ar.json";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("confirmed", confirmed);
defineRule("regex", regex);
defineRule("alpha_num", alpha_num);
defineRule("numeric", numeric);
defineRule("url", url);

defineRule("isRequired", (value) => {
  const falsyValue = value === undefined || value === null || value === "";

  return !falsyValue;
});

defineRule("mini_url", (value) => {
  const regex = new RegExp(
    "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
  );
  const valid = !value || regex.test(value);

  return valid;
});

configure({
  generateMessage: localize({
    en,
    ar
  })
});
