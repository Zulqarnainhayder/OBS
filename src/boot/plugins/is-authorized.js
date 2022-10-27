import { boot } from "quasar/wrappers";
import Storage from "src/services/storage";

export const isAuthorized = (...matchedPermissions) => {
  const profile = Storage.getSetting("profile");

  // if (profile) {
  //   const { roles } = profile;
  //   const permissions = roles?.reduce((result, current) => {
  //     current.permissions.forEach((permission) => {
  //       result.push(permission.name);
  //     });
  //     return result;
  //   }, []);

  //   const intersections = matchedPermissions.filter((value) =>
  //     permissions?.includes(value)
  //   );

  //   return intersections.length > 0;
  // }

  return Boolean(profile);
};

export default boot(({ app }) => {
  app.config.globalProperties.$isAuthorized = isAuthorized;
});
