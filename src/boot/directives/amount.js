import { boot } from "quasar/wrappers";

export default boot(({ app }) => {
  app.directive("amount", (el, { value }) => {
    el.innerHTML = Math.floor(value).toLocaleString();
  });
});
