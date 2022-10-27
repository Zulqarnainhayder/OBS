<template>
  <q-input
    v-bind="$props"
    class="qti"
    v-model="proxyPhone"
    :placeholder="template"
    @update:model-value="onPhoneUpdate"
  >
    <template v-if="labelSlot" v-slot:label>
      <slot name="label" />
    </template>

    <template v-if="$slots.append" v-slot:append>
      <slot name="append" />
    </template>

    <template v-slot:prepend>
      <div
        class="
          row
          items-center
          justify-between
          cursor-pointer
          non-selectable
          qti__select
        "
      >
        <div
          v-if="showFlags && !!activeCountry"
          class="qti__flag"
          :class="`${activeCountry.iso2.toLowerCase()}`"
        ></div>
        <div
          v-else-if="showFlags"
          class="qti__flag"
        ></div>
        <div
          v-if="showDialCodeInSelection && !!activeCountry"
          class="text-caption q-pl-sm"
        >
          +{{ activeCountry.dialCode }}
        </div>
        <slot name="arrow-icon">
          <q-icon
            :name="open ? 'arrow_drop_up' : 'arrow_drop_down'"
            class="q-ml-xs"
          />
        </slot>
        <q-menu
          fit
          :anchor="$q.lang.rtl? 'bottom right': 'bottom left'"
          :self="$q.lang.rtl? 'top right': 'top left'"
          v-model="open"
          @hide="clearSearch"
        >
          <q-list>
            <div
              v-if="!(sortedCountries && sortedCountries.length)"
              class="q-pb-lg text-center"
            >
              {{noCountryFoundText}}
            </div>
            <q-virtual-scroll
              class="qti__select--menu"
              :items="sortedCountries"
            >
              <template v-slot:before>
                <div v-if="showSearchBox" class="q-mx-md q-my-md">
                  <q-input
                    v-model="searchValue"
                    outlined
                    hide-bottom-space
                    dense
                    square
                    :placeholder="countrySearchPlaceholder"
                  />
                </div>
              </template>
              <template v-slot="{ item }">
                <q-item
                  :key="item[optionValue]"
                  class="qti__select__option"
                  :class="{
                    'qti__select__option--active': countryCode === item[optionValue],
                  }"
                  clickable
                  v-close-popup
                  @click="() => onCountryCodeUpdate(item)"
                >
                  <q-item-section v-if="showFlags" side class="q-pr-none">
                    <span
                      class="qti__flag q-mx-sm"
                      :class="`${item.iso2.toLowerCase()}`"
                    ></span>
                  </q-item-section>
                  <q-item-section>
                    {{ item.name }}
                    <template v-if="showDialCodeInList">
                      (+{{ item.dialCode }})
                    </template>
                  </q-item-section>
                </q-item>
              </template>
            </q-virtual-scroll>
          </q-list>
        </q-menu>
      </div>
    </template>

    <template v-if="$slots.error" v-slot:error>
      <slot name="error" />
    </template>
  </q-input>
</template>

<script>
import examples from 'libphonenumber-js/examples.mobile.json';
import { parsePhoneNumberFromString, getExampleNumber, AsYouType } from 'libphonenumber-js';
import { ref, computed, onMounted } from 'vue';
import allCountries from './all-countries';
import { getUserCountry } from './utils';

export default {
  setup(props, { emit }) {
    const searchValue = ref('');
    const proxyPhone = computed({
      get() {
        return props.phone;
      },
      set() {}
    });
    const template = computed(() => {
      const exampleNumber = getExampleNumber(props.countryCode, examples);
      if (exampleNumber) {
        const phoneObject = new AsYouType();
        phoneObject.input(exampleNumber.number);
        return phoneObject.getTemplate();
      }
      return '';
    });

    const findCountry = (countryCode = '') => (countryCode ? allCountries
      .find((country) => country[props.optionValue] === countryCode.toUpperCase()) : null);

    const getCountries = (list = []) => list
      .map((countryCode) => findCountry(countryCode));

    const activeCountry = computed(() => findCountry(props.countryCode));

    const filteredCountries = computed(() => {
      let filtered = allCountries;
      if (props.onlyCountries && props.onlyCountries.length) {
        filtered = filtered
          .filter(({ iso2 }) => props.onlyCountries.some((c) => (c.toUpperCase() === iso2)));
      }

      if (props.ignoredCountries && props.ignoredCountries.length) {
        filtered = filtered.filter(
          ({ iso2 }) => !props.ignoredCountries.includes(iso2.toUpperCase())
            && !props.ignoredCountries.includes(iso2.toLowerCase()),
        );
      }

      return filtered.filter(
        (c) => (new RegExp(searchValue.value, 'i')).test(c.name)
          || (new RegExp(searchValue.value, 'i')).test(c.iso2)
          || (new RegExp(searchValue.value, 'i')).test(c.dialCode));
    });

    const sortedCountries = computed(() => {
      const preferred = getCountries(props.preferredCountries);
      const filtered = filteredCountries.value.filter(({ iso2 }) => !props.preferredCountries.some((c) => (c.toUpperCase() === iso2)));
      return [...preferred, ...filtered];
    });

    const parsedMode = computed(() => {
      if (props.mode === 'auto') {
        if (!proxyPhone.value || proxyPhone.value[0] !== '+') {
          return 'national';
        }
        return 'international';
      }
      if (!['international', 'national'].includes(props.mode)) {
        // eslint-disable-next-line no-console
        console.warn('Invalid value of prop "mode"');
        return 'international';
      }
      return props.mode;
    });

    onMounted(() => {
      if (!props.countryCode && props.autoDefaultCountry) {
        getUserCountry()
          .then((res) => emit('update:countryCode', res))
          .catch(() => {});
      }
    });

    return {
      open: ref(false),
      searchValue,
      sortedCountries,
      activeCountry,
      proxyPhone,
      template,
      clearSearch: () => {
        searchValue.value = '';
      },
      onPhoneUpdate: (value) => {
        if (props.autoFormat) {
          let result;
          if (value?.[0] === '+') {
            result = parsePhoneNumberFromString(value) || {};
          } else {
            result = parsePhoneNumberFromString(value, props.countryCode) || {};
          }

          let valid = result.isValid?.();
          let formatted = value;
          if (valid) {
            formatted = result.format?.(parsedMode.value.toUpperCase());
          }

          if (result.country && (props.ignoredCountries?.length || props.onlyCountries?.length)) {
            if (!findCountry(result.country)) {
              valid = false;
              Object.assign(result, { country: null });
            }
          }

          if (valid) {
            emit('update:phone', formatted);
          } else {
            emit('update:phone', value);
          }
        } else {
          emit('update:phone', value);
        }
      },
      onCountryCodeUpdate: (item) => {
        emit('update:phone', '');
        emit('update:countryCode', item[props.optionValue]);
      },
    };
  },
  props: {
    phone: {
      type: String,
    },
    countryCode: {
      type: String,
      default: '',
    },
    optionValue: {
      type: String,
      default: 'iso2',
    },

    // State
    disable: { type: Boolean },
    readonly: { type: Boolean },

    // Content
    // errorMessage: { type: [String, Boolean] },
    noErrorIcon: { type: Boolean },
    label: { type: String },
    stackLabel: { type: Boolean },
    hint: { type: String },
    hideHint: { type: Boolean },
    prefix: { type: String },
    suffix: { type: String },
    loading: { type: Boolean },
    clearable: { type: Boolean },
    clearIcon: { type: String },
    labelSlot: { type: Boolean },
    bottomSlots: { type: Boolean },
    autogrow: { type: Boolean },

    // Behavior
    name: { type: String },
    error: { type: Boolean },
    rules: { type: [Array, String] },
    reactiveRules: { type: Boolean },
    lazyRules: { type: [Boolean, String] },
    autofocus: { type: Boolean },
    type: { type: String, default: 'tel' },

    // Style
    outlined: { type: Boolean },
    filled: { type: Boolean },
    standout: { type: [Boolean, String] },
    square: { type: Boolean },
    rounded: { type: Boolean },
    dense: { type: Boolean },
    itemAligned: { type: Boolean },
    hideBottomSpace: { type: Boolean },
    labelColor: { type: String },
    color: { type: String },
    bgColor: { type: String },
    inputClass: { type: [String, Array, Object] },
    inputStyle: { type: [String, Array, Object] },
    countrySearchPlaceholder: { type: String, default: 'Search' },
    noCountryFoundText: { type: String, default: 'No data Found' },

    // Customization
    showSearchBox: { type: Boolean, default: true },
    showFlags: { type: Boolean, default: true },
    showDialCodeInList: { type: Boolean, default: true },
    showDialCodeInSelection: { type: Boolean },

    onlyCountries: { type: Array, default: () => [] },
    ignoredCountries: { type: Array, default: () => [] },
    preferredCountries: { type: Array, default: () => [] },

    autoDefaultCountry: { type: Boolean },
    autoFormat: { type: Boolean, default: true },
    mode: { type: String, default: 'auto' }, // auto | international | national
  },
};
</script>

<style lang="scss">
  @import './sprite';
  .qti {
    &__select {
      &__option {
        padding: 12px 16px;
        &--active {
          color: $primary;
        }
      }
    }
  }
  .qti__select--menu {
    max-height: 300px;
    width: 320px;
  }
</style>
