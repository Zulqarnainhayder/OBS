<template>
  <div class="q-pa-sm q-mb-md rounded-borders">
    <p>
      {{ fieldLabel }}
    </p>

    <div class="q-px-sm">
      <q-range
        :min="min"
        :max="max"
        :step="step"
        :label="label"
        :label-always="labelAlways"
        :color="color"
        :track-color="trackColor"
        :inner-track-color="innerTrackColor"
        :left-label-color="leftLabelColor"
        :left-label-text-color="leftLabelTextColor"
        :right-label-color="rightLabelColor"
        :right-label-text-color="rightLabelTextColor"
        :left-label-value="leftLabelValue || fieldValue.min"
        :right-label-value="rightLabelValue || fieldValue.max"
        :left-thumb-color="leftThumbColor"
        :right-thumb-color="rightThumbColor"
        :switch-label-side="switchLabelSide"
        :disable="disable"
        :readonly="readonly"
        :dark="dark"
        markers
        :dense="dense"
        :model-value="fieldValue"
        @update:model-value="handleChange"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRangeField } from "src/composables/fields";

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object,
      default: null,
    },
    min: {
      type: Number,
      default: null,
    },
    max: {
      type: Number,
      default: null,
    },
    step: {
      type: Number,
      default: null,
    },
    fieldLabel: {
      type: String,
      default: null,
    },
    label: {
      type: Boolean,
      default: true,
    },
    labelAlways: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "primary-2",
    },
    trackColor: {
      type: String,
      default: null,
    },
    innerTrackColor: {
      type: String,
      default: null,
    },
    leftLabelColor: {
      type: String,
      default: null,
    },
    leftLabelTextColor: {
      type: String,
      default: null,
    },
    rightLabelColor: {
      type: String,
      default: null,
    },
    rightLabelTextColor: {
      type: String,
      default: null,
    },
    leftLabelValue: {
      type: String,
      default: null,
    },
    rightLabelValue: {
      type: String,
      default: null,
    },
    leftThumbColor: {
      type: String,
      default: null,
    },
    rightThumbColor: {
      type: String,
      default: null,
    },
    switchLabelSide: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { fieldValue, handleChange } = useRangeField();

    return {
      fieldValue,
      handleChange,
    };
  },
});
</script>
