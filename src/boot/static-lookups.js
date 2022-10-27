import { boot } from "quasar/wrappers";
import lookups from "src/services/static-lookups";

const generateConstants = () => {
  const keys = Object.keys(lookups);
  const values = Object.values(lookups);

  return values.reduce((result, current, index) => {
    const key = keys[index];

    result[key] = current.reduce((r, c) => {
      const k = c.key || c.id;

      r[k] = c.id;

      return r;
    }, {});

    return result;
  }, {});
};

// Globals
const constants = generateConstants();

export default boot(({ app }) => {
  app.config.globalProperties.$lookups = lookups;
  app.config.globalProperties.$constants = constants;
});

export const useStaticLookups = () => ({
  lookups,
  constants,
});
