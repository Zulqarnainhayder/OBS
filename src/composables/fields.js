import moment from "moment";
import { ref, computed, watch, getCurrentInstance } from "vue";
import { useField } from "vee-validate";

import { useLookups } from "./lookups";

export const useObsField = (forcedInitialValue) => {
  const { emit, props } = getCurrentInstance();

  // Reactive data
  const label = computed(() => props.label);
  const initialValue =
    forcedInitialValue === undefined ? props.modelValue : forcedInitialValue;

  const {
    value: fieldValue,
    meta,
    errors,
    errorMessage,
    handleChange
  } = useField(props.name, props.rules, {
    label,
    initialValue,
    validateOnValueUpdate: false
  });

  watch(
    () => props.modelValue,
    (nextValue, prevValue) => {
      if (
        JSON.stringify({ v: nextValue }) !== JSON.stringify({ v: prevValue })
      ) {
        fieldValue.value = nextValue;
      }
    }
  );

  return {
    fieldValue,
    meta,
    errors,
    errorMessage,
    handleChange: (value) => {
      handleChange(value);
      emit("update:modelValue", value);
      emit("obs-change", value);
    }
  };
};

export const useLookupsField = () => {
  const { props } = getCurrentInstance();
  const { labelKey, valueKey } = props;

  // Composables
  const { fieldValue, meta, errors, errorMessage, handleChange } = useObsField();

  const isOptionGroupLookups =
    props.type === "checkbox" || props.type === "radio";

  const { lookups, reload } = useLookups();
  const options = ref([]);

  const optionGroupLookups = computed(() =>
    lookups.value.map((lookup) => ({
      label:
        typeof labelKey === "function" ? labelKey(lookup) : lookup[labelKey],
      value: lookup[valueKey],
    }))
  );

  const formatedValue = computed(() => {
    if (fieldValue.value !== null) {
      // Multiple
      if (Array.isArray(fieldValue.value)) {
        return fieldValue.value.map((i) =>
          lookups.value.find((l) => l[valueKey] === i)
        );
      }

      return lookups.value.find((l) => l[valueKey] === fieldValue.value);
    }

    return null;
  });

  // Handle lookup changes
  // Lookup name
  watch(
    () => props.lookup,
    (lookup) => reload(lookup)
  );
  // Lookup params
  watch(
    () => props.params,
    (newParams) => reload(props.lookup, newParams)
  );

  return {
    //   Default
    fieldValue: isOptionGroupLookups ? fieldValue : formatedValue,
    meta,
    errors,
    errorMessage,

    // Custom
    lookups,
    options,
    optionGroupLookups,
    handleChange: (inputValue) => {
      let value = null;

      // Handle multiple

      // If checkbox or radio
      if (isOptionGroupLookups) {
        value = inputValue;
      }
      // If Multiple
      else if (Array.isArray(inputValue)) {
        value = inputValue.map((i) => i[valueKey]);
      }
      // If Single
      else if (!!inputValue) {
        value = inputValue[valueKey];
      }

      handleChange(value);
    },
    handleFilter: (val, update) => {
      if (val === "") {
        update(() => {
          options.value = lookups.value;
        });
      } else {
        update(() => {
          // Handle client-side filteration.
          options.value = lookups.value.filter((item) => {
            const itemString = JSON.stringify({
              label: item.label?.toLowerCase(),
              description: item.description?.toLowerCase(),
            });

            return itemString.includes(val?.toLowerCase());
          });
        });
      }
    },
  };
};

export const useDateField = () => {
  const { props } = getCurrentInstance();

  // Reactive data
  const initialValue = props.range
    ? {
        from: props?.modelValue?.from || null,
        to: props?.modelValue?.to || null
      }
    : props.modelValue;

  const emptyValue = props.range ? { from: null, to: null } : null;

  // Composables
  const { fieldValue, meta, errors, errorMessage, handleChange } =
    useObsField(initialValue);

  // Computed
  const formattedFieldValue = computed(() => {
    if (props.range && typeof fieldValue.value === "object") {
      if (!fieldValue.value.from) {
        return "";
      }

      return `${fieldValue.value.from || ""} - ${fieldValue.value.to || ""}`;
    }

    return fieldValue;
  });

  // Methods
  const handleReset = () => {
    handleChange(emptyValue);
  };
  const handleOptions = (date) => {
    const today = moment().format(props.format);

    if (props.disableFuture) {
      return date <= today;
    }

    if (props.disablePast) {
      return date >= today;
    }

    if (props.handleDisable) {
      return props.handleDisable(date);
    }

    return true;
  };

  return {
    //  Default
    fieldValue,
    meta,
    errors,
    errorMessage,

    // Custom
    formattedFieldValue,
    handleOptions,
    handleReset,
    handleChange(value) {
      let securedValue = value;

      // Fix selecting same day from and to
      if (props.range && typeof value === "string") {
        securedValue = { from: value, to: value };
      }

      handleChange(securedValue);
    }
  };
};

export const useRangeField = () => {
  const { props } = getCurrentInstance();

  // Reactive data
  const initialValue = {
    min: props?.modelValue?.min || 0,
    max: props?.modelValue?.max || props.step
  };

  // Composables
  const { fieldValue, handleChange } = useObsField(initialValue);

  return {
    //  Default
    fieldValue,
    handleChange
  };
};

export const usePhoneField = () => {
  // Composables
  const { fieldValue, meta, errors, errorMessage, handleChange } = useObsField();

  // Refs
  const phone = ref(fieldValue.value.phoneNumber);
  const countryCode = ref(fieldValue.value.countryCode);

  // Methods
  const handlePhoneChange = (nextValue) => {
    phone.value = nextValue;
    handleChange({
      phoneNumber: phone.value,
      countryCode: countryCode.value,
    });
  }
  const handleCountryCodeChange = (nextValue) => {
    countryCode.value = nextValue;
    handleChange({
      phoneNumber: phone.value,
      countryCode: countryCode.value,
    });
  }

  // Watchers
  watch(
    () => fieldValue.value,
    (nextValue) => {
      phone.value = nextValue.phoneNumber;
      countryCode.value = nextValue.countryCode;
    }
  )

  return {
    // Default
    meta,
    errors,
    errorMessage,

    // Custom
    phone,
    countryCode,
    handlePhoneChange,
    handleCountryCodeChange,
  };
};
