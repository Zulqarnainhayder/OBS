import { computed, ref, shallowRef } from "vue";

export const useDialog = () => {
  const dialog = ref(false);
  const toggleDialog = () => {
    dialog.value = !dialog.value;
  };
  const openDialog = () => {
    dialog.value = true;
  };
  const closeDialog = () => {
    dialog.value = false;
  };

  return {
    dialog,
    toggleDialog,
    openDialog,
    closeDialog
  };
};

export const useRemount = () => {
  const _key = ref(Math.random());
  const key = computed(() => `${_key.value}`);

  function remount() {
    _key.value = Math.random();
  }

  return {
    key,
    remount
  };
};

export const useEntity = ({ request: _request } = {}) => {
  const pending = shallowRef(false);
  const rejected = shallowRef(false);
  const fulfilled = shallowRef(false);
  const data = ref();
  const error = ref();
  let request = _request;
  let pendingCallback;
  let fulfilledCallback;
  let rejectedCallback;
  let completedCallback;

  function fetch(_request) {
    pending.value = true;
    if (pendingCallback) pendingCallback();

    _request()
      .then((_data) => {
        data.value = _data;
        fulfilled.value = true;
        rejected.value = false;
        if (fulfilledCallback) fulfilledCallback(_data);
      })
      .catch((_error) => {
        error.value = _error;
        fulfilled.value = false;
        rejected.value = true;
        if (rejectedCallback) rejectedCallback(_error);
      })
      .finally(() => {
        pending.value = false;
        if (completedCallback) completedCallback();
      });
  }

  function fire(_request) {
    request = _request;
    fetch(_request);
  }

  function refresh() {
    fetch(request);
  }

  function on({ pending, fulfilled, rejected, completed }) {
    if (pending) {
      pendingCallback = pending;
    }

    if (fulfilled) {
      fulfilledCallback = fulfilled;
    }

    if (rejected) {
      rejectedCallback = rejected;
    }

    if (completed) {
      completedCallback = completed;
    }
  }

  return {
    pending,
    rejected,
    fulfilled,
    data,
    error,
    fire,
    refresh,
    on
  };
};
