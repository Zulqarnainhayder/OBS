import Storage from "src/services/storage";

export default () => ({
  profile: Storage.getSetting("profile"),
});
