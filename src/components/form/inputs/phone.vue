<template>
  <phone
    showDialCodeInSelection
    :label="label"
    show-search-box
    :disable="readonly"
    :phone="phone"
    :countryCode="countryCode"
    @update:phone="handlePhoneChange"
    @update:countryCode="handleCountryCodeChange"
  />
</template>

<script>
import { defineComponent } from "vue";
import { usePhoneField } from "src/composables/fields";

import Phone from 'src/components/phone';

export default defineComponent({
  components: {
    Phone,
  },
  props: {
    name: {
      type: String,
      required: true
    },
    rules: {
      type: String
    },
    modelValue: {
      type: Object,
      default: () => ({})
    },
    label: {
      type: String,
      default: null
    },
    hint: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: ""
    },
    fillMask: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const {
      phone,
      countryCode,
      meta,
      errors,
      errorMessage,
      handlePhoneChange,
      handleCountryCodeChange,
    } = usePhoneField();

    return {
      phone,
      countryCode,
      meta,
      errors,
      errorMessage,
      handlePhoneChange,
      handleCountryCodeChange,
    };
  }
});
</script>
