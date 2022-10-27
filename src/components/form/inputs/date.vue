<template>
  <q-input
    filled
    :color="$q.dark.isActive ? 'primary-2' : 'primary'"
    :label="label"
    :hint="hint"
    :placeholder="placeholder"
    :stack-label="!!placeholder"
    :name="name"
    readonly
    :dense="dense"
    :disable="disable"
    :error="meta.validated && !meta.valid"
    :error-message="errorMessage"
    :model-value="formattedFieldValue"
    @click="handleOpenDatePicker"
    today-btn
  >
    <template v-slot:append>
      <div class="q-gutter-x-sm">
        <q-btn
          v-if="clearable && (range ? fieldValue.from : fieldValue)"
          round
          unelevated
          icon="clear"
          @click="handleReset"
          :size="dense ? 'xs' : 'sm'"
        />

        <q-icon name="event" class="cursor-pointer" :size="dense ? 'xs' : 'sm'">
          <q-popup-proxy
            cover
            ref="qDateProxy"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              :range="range"
              :landscape="landscape"
              :minimal="minimal"
              :today-btn="todayBtn"
              :default-view="defaultView"
              :mask="format"
              :options="handleOptions"
              color="primary-2"
              :disable="disable"
              no-unset
              :model-value="fieldValue"
              @update:model-value="handleChange"
              :navigation-min-year-month="navigationMinYearMonth"
            />
          </q-popup-proxy>
        </q-icon>
      </div>
    </template>
  </q-input>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useDateField } from "src/composables/fields";

export default defineComponent({
  props: {
    // q-input options
    name: {
      type: String,
      required: true
    },
    rules: {
      type: String
    },
    modelValue: {
      type: [Object, String, Number],
      default: null
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
    dense: {
      type: Boolean,
      default: false
    },

    // q-date options
    range: {
      type: Boolean,
      default: false
    },
    landscape: {
      type: Boolean,
      default: false
    },
    minimal: {
      type: Boolean,
      default: false
    },
    todayBtn: {
      type: Boolean,
      default: false
    },
    defaultView: {
      type: String,
      default: "Calendar"
    },
    format: {
      type: String,
      default: "YYYY/MM/DD"
    },
    disableFuture: {
      type: Boolean,
      default: false
    },
    disablePast: {
      type: Boolean,
      default: false
    },
    navigationMinYearMonth: {
      type: String,
      default: "1900/01"
    },
    handleDisable: {
      type: Function
    }
  },
  setup() {
    const {
      formattedFieldValue,
      fieldValue,
      meta,
      errors,
      errorMessage,
      handleOptions,
      handleReset,
      handleChange,
      navigationMinYearMonth
    } = useDateField();

    // Reactive data
    const qDateProxy = ref();

    // Methods
    const handleOpenDatePicker = () => {
      qDateProxy.value.show();
    };
    const handleCloseDatePicker = () => {
      qDateProxy.value.hide();
    };

    return {
      // Default
      fieldValue,
      meta,
      errors,
      errorMessage,
      handleChange(value) {
        handleCloseDatePicker();
        handleChange(value);
      },

      // Custom
      qDateProxy,
      formattedFieldValue,
      handleOptions,
      handleReset,
      handleOpenDatePicker
    };
  }
});
</script>
