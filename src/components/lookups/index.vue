<template>
  {{ label }}
</template>

<script>
import { defineComponent } from "vue";
import { useLookupsValue } from "src/composables/lookups";

export default defineComponent({
  props: {
    lookup: {
      type: [String, Array],
      required: true,
    },
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    labelKey: {
      type: String,
      default: "label",
    },
    valueKey: {
      type: String,
      default: "id",
    },
    cached: {
      type: Boolean,
      default: true,
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const { label } = useLookupsValue();

    return {
      label,
    };
  },
});
</script>
