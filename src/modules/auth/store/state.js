import Storage from "src/services/storage";

export default () => ({
  loading: false,
  token: Storage.getSetting("token"),
});
