import { isRef, unref, computed, getCurrentInstance, ref, shallowRef } from "vue";
import { useStore } from "vuex";

import StaticLookups from "src/services/static-lookups";

// Helpers
const DEFAULT_PROPS = {
  valueKey: "id",
  labelKey: "label",
  descriptionKey: null,
  cached: true,
  params: {},
};
const getProps = (optionalProps = {}) => {
  const instance = getCurrentInstance();
  const context = instance || {};

  // Vars
  const forcedProps = {
    ...DEFAULT_PROPS,
    ...optionalProps,
  };

  const props = {
    ...forcedProps,
    ...context.props,
  };

  return props;
};
const getType = (lookup) => {
  if (Array.isArray(lookup)) {
    return "inline";
  }

  if (lookup[0] === "$") {
    return "static";
  }

  if (lookup[0] === "#") {
    return "custom";
  }

  return "remote";
};
const setLookups = (store, lookups, lookup, params, type, props) => {
  // Vars
  const { labelKey, valueKey, descriptionKey, cached } = props;

  if (type === "inline") {
    lookups.value.items.value = lookup;
  }

  if (type === "static") {
    const name = lookup.split("$")[1];
    const selected = StaticLookups[name];

    if (selected) {
      lookups.value.items.value = selected;
    }
  }

  if (type === "custom" || type === "remote") {
    const name = type === "custom" ? lookup.split("#")[1] : lookup;
    const isCalledBefore = store.state.lookupsQueue[name];
    const isExists = !!store.state.lookups[name];
    lookups.value.items = computed(() => store.state.lookups[name] || []);

    if (isExists && cached) {
      return lookups;
    }

    if (!isCalledBefore || !cached) {
      store.commit("setLookupInprogress", name);

      store.dispatch("getLookup", {
        name,
        type,
        cached,
        params,
        labelKey,
        valueKey,
        descriptionKey,
      });
    }
  }
};
const getLookups = (lookup, type, props) => {
  // Params
  const { params } = props;

  // Composables
  const store = useStore();

  // Reactive
  let lookups = shallowRef({
    items: ref([]),
    reload,
  });

  // Set Lookups
  setLookups(store, lookups, lookup, params, type, props);

  // Handle Reload
  function reload(newLookup = lookup, newParams = params) {
    setLookups(store, lookups, newLookup, newParams, type, props);
  }

  return lookups;
};

// Composables
export const useLookups = (optionalProps) => {
  const props = getProps(optionalProps);
  const type = getType(props.lookup);
  let computedLookups = getLookups(props.lookup, type, props);

  // Handle reload
  const reload = computedLookups.value.reload;

  const lookups = computed(() =>
    computedLookups.value.items.value
      // This mapping to handle any i18n computed
      // labels and make them reactive also
      .map(({ label, ...item }) => ({
        ...item,
        label: isRef(label) ? unref(label) : label,
      }))
  );

  return {
    lookups,
    reload,
  };
};
export const useLookupsValue = (optionalProps) => {
  const props = getProps(optionalProps);
  const { props: newProps } = getCurrentInstance()

  const { lookups } = useLookups({ lookup: props.lookup });

  let selected = computed(() =>
    lookups.value.find((l) => l.id === newProps.value)
  );

  return {
    label: computed(() => selected?.value?.label),
    value: computed(() => selected?.value?.[props.valueKey]),
  };
};
