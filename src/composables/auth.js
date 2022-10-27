import { isAuthorized } from "src/boot/plugins/is-authorized";

export default () => {
  return {
    isAuthorized,
  };
};
