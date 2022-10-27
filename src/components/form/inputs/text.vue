<template>
  <q-input
    :color="$q.dark.isActive ? 'primary-2' : 'primary'"
    :model-value="fieldValue"
    :label="label"
    :hint="hint"
    :placeholder="placeholder"
    :stack-label="!!placeholder"
    :type="type"
    :name="name"
    :clearable="clearable"
    :disable="disable"
    :readonly="readonly"
    :mask="mask"
    :fill-mask="fillMask"
    :error="meta.validated && !meta.valid"
    :error-message="errorMessage"
    @update:model-value="handleChange"
  />
</template>

<script>
import { defineComponent } from "vue";
import { useObsField } from "src/composables/fields";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    hint: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: "",
    },
    fillMask: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { fieldValue, meta, errors, errorMessage, handleChange } =
      useObsField();

    return {
      fieldValue,
      meta,
      errors,
      errorMessage,
      handleChange,
    };
  },
});
</script>
