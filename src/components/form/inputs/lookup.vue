<template>
  <q-select
    v-if="type === 'select'"
    :name="name"
    :color="color"
    :multiple="multiple"
    :clearable="clearable"
    :error="meta.validated && !meta.valid"
    :error-message="errorMessage"
    :disable="disable || lookups.length < 1"
    :readonly="readonly"
    :model-value="fieldValue"
    :options="options"
    :label="label"
    :option-value="valueKey"
    :dense="dense"
    :option-label="labelKey"
    :use-input="useInput"
    :hide-bottom-space="hideBottomSpace"
    @filter="handleFilter"
    @update:model-value="handleChange"
  >
    <template v-slot:option="scope" v-if="descriptionKey">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>

  <q-option-group
    v-else-if="type === 'checkbox'"
    :options="optionGroupLookups"
    :model-value="fieldValue"
    color="primary-2"
    keep-color
    type="checkbox"
    @update:model-value="handleChange"
  />
  <q-option-group
    v-else-if="type === 'radio'"
    :options="optionGroupLookups"
    :model-value="fieldValue"
    color="primary-2"
    keep-color
    type="radio"
    @update:model-value="handleChange"
  />
  <div class="text-negative text-caption" v-if="type === 'radio' || type === 'checkbox' && meta.validated && !meta.valid">
    {{ errorMessage }}
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useLookupsField } from "src/composables/fields";

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
      type: [String, Number, Array, Object, Boolean],
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    labelKey: {
      type: [String, Function],
      default: "label",
    },
    descriptionKey: {
      type: String,
      default: null,
    },
    valueKey: {
      type: String,
      default: "id",
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
      default: true,
    },
    hideBottomSpace: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "select",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    useInput: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: 'primary-2',
    },
    lookup: {
      type: [Array, String, Number],
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
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
  emits: ['obs-change'],
  setup() {
    const {
      // Default
      fieldValue,
      meta,
      errors,
      errorMessage,
      handleChange,
      handleFilter,

      // Custom
      lookups,
      options,
      optionGroupLookups,
    } = useLookupsField();

    return {
      options,
      lookups,
      optionGroupLookups,
      fieldValue,
      meta,
      errors,
      errorMessage,
      handleFilter,
      handleChange,
    };
  },
});
</script>
