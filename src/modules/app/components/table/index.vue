<template>
  <div>
    <q-card v-if="data" class="my-card">
      <!-- Header -->
      <q-card-section v-if="!hideHeader" class="q-pa-lg">
        <div class="row">
          <div class="col-12 q-mb-lg">
            <div>
              <h3 class="no-margin">{{ title }}</h3>
              <p class="text-subtitle text-grey no-margin">{{ subtitle }}</p>
            </div>
          </div>
          <div class="col-6 q-mb-md">
            <q-btn v-if="duplicate" outline class="btn-component-duplicate" padding="10px 25px">
              <img src="/images/duplicate.svg" class="q-mr-sm" />
              Duplicate
            </q-btn>
          </div>
          <div class="col-4 q-mb-md q-px-lg">
            <!-- Search -->
            <!-- <q-input dense outlined :debounce="250" :label="$t('global.search')"
                  :placeholder="searchPlaceholder || `${$t('global.search')}`" clearable color="primary-2"
                  v-model="search">
                </q-input> -->
            <q-input
              v-if="searchable"
              outlined
              debounce="500"
              v-model="search"
              class="custom-search-compoents"
              placeholder="Search"
            />
          </div>
          <div class="col-2 q-mb-md">
            <!-- Add Button -->
            <q-btn
              v-if="userAdd"
              label="Add User"
              to="user-details"
              class="q-ml-md btn-2 btn-component"
              padding="10px 55px"
              unelevated
              no-caps
            />
            <q-btn
              v-else
              label="Create"
              class="q-ml-md btn-2 btn-component"
              padding="10px 60px"
              unelevated
              :to="to"
              @click="$attrs.onAdd"
              no-caps
            />
            <q-btn
              v-if="userAdd"
              text-color="grey-6"
              color="grey-7"
              size="1.3em"
              round
              flat
              class="float-right"
              icon="more_vert"
            >
              <q-menu
                fit
                auto-close
                transition-show="scale"
                transition-hide="scale"
              >
                <q-list style="min-width: 200px">
                  <q-item clickable>
                    <obs-form-action
                      flat
                      to="user-details"
                      outline
                      :label="$t('app.administration.users.users.edit')"
                    />
                  </q-item>
                  <q-item clickable>
                    <obs-form-action
                      flat
                      to="user-details"
                      outline
                      :label="$t('app.administration.users.users.edit')"
                    />
                  </q-item>
                  <q-item clickable>
                    <obs-form-action
                      flat
                      to="user-details"
                      outline
                      :label="$t('app.administration.users.users.edit')"
                    />
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn
              v-else
              text-color="grey-6"
              color="grey-7"
              size="1.3em"
              round
              flat
              class="float-right"
              icon="more_vert"
            >
              <q-menu
                fit
                auto-close
                transition-show="scale"
                transition-hide="scale"
              >
                <q-list style="min-width: 200px">
                  <q-item clickable>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Export</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Import</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>

            <!-- <div :class="{ 'order-last': $q.screen.lt.md }">
                <q-btn v-for="(action, actionIndex) in actions(selected)" :key="actionIndex" :icon="action.icon"
                  :label="$q.screen.gt.sm ? action.label : ''" color="primary-2" outline unelevated padding="8px 15px"
                  class="full-width" @click="action.handler" />
              </div> -->
            <!-- Filters -->
            <!-- <div v-if="filters.length > 0">
                <q-btn color="dark-blue-7" icon="filter_list" outline
                  :label="$q.screen.gt.sm ? $t('app.filters') : undefined" padding="8px 15px" :disable="isLoading"
                  class="full-width">
                  <q-menu class="u-table__filters high-shadow" v-model="isFilterMenuActive">
                    <q-card>
                      <q-card-section>
                        <p class="text-subtitle1 text-grey no-margin">
                          {{ $t("app.filters") }}
                        </p>
                      </q-card-section>
                      <q-separator />
                      <q-card-section>
                        <div class="q-gutter-y-sm">
                          <template v-for="filter in filters" :key="filter.name">
                            <obs-lookup-field v-if="filter.lookup" :name="filter.name" :label="filter.label" dense
                              clearable multiple :lookup="filter.lookup" v-model="filtersValue[filter.name]" />

                            <obs-date-field v-if="filter.date" :name="filter.name" :label="filter.label" dense clearable
                              range v-model="filtersValue[filter.name]" />

                            <obs-range-field v-if="filter.range" :name="filter.name" :field-label="filter.label"
                              :min="filter.min" :max="filter.max" :step="filter.step" dense label-always
                              switch-label-side v-model="filtersValue[filter.name]" />
                          </template>
                        </div>
                      </q-card-section>
                      <q-separator />
                      <q-card-section class="row justify-end">
                        <q-btn :label="$t('global.apply')" color="primary-2" unelevated @click="handleFilter" />
                      </q-card-section>
                    </q-card>
                  </q-menu>
                </q-btn>
              </div> -->
          </div>
          <!-- <div class="col-1 q-mb-md">
          </div> -->
          <div class="col-12 q-mt-lg">
            <q-table
              class="my-sticky-header-table"
              :no-data-label="noDataLabel"
              ref="table"
              flat
              @row-click="handleRowClick"
              :grid="$q.screen.lt.md"
              :hide-header="$q.screen.lt.md"
              :rows="data"
              :columns="columns"
              :row-key="rowKey"
              :selection="selection"
              v-model:pagination="paginationData"
              v-model:selected="selected"
              :filter="search"
              :loading="isLoading"
              card-container-class="u-table__cards-contaner bg-grey-4"
              @request="handleRequest"
            >
              <template #top v-if="$slots.top">
                <slot name="top" />
              </template>

              <template
                v-for="cell in cellsSlots"
                #[`body-${cell.id}`]="props"
                :key="cell.id"
              >
                <q-td>
                  <slot v-if="!cell.actions" :name="cell.id" v-bind="props" />
                  <div v-else class="q-gutter-x-sm">
                    <q-btn
                      text-color="grey-6"
                      color="grey-7"
                      size="1.3em"
                      round
                      flat
                      icon="more_vert"
                    >
                      <q-menu
                        fit
                        auto-close
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-list
                          v-for="(action, index) in cell.actions(props.row)"
                          :key="index"
                          style="min-width: 150px"
                        >
                          <q-item clickable>
                            <q-btn flat color="primary" v-bind="action" />
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>

                  <!-- Handle lookups -->
                  <obs-lookups
                    v-if="cell.lookup"
                    :lookup="cell.lookup"
                    :value="props.row[cell.id.split('cell-')[1]]"
                  />
                </q-td>
              </template>

              <!-- Mobile Grid -->
              <template #item="props">
                <q-card class="full-width" flat square>
                  <div class="q-pb-md">
                    <q-card-section v-if="selection === 'multiple'">
                      <q-checkbox dense v-model="props.selected" />
                    </q-card-section>
                    <div
                      class="q-px-md q-py-sm"
                      v-for="col in props.cols"
                      :key="col.name"
                    >
                      <p
                        class="no-margin text-caption text-weight-medium text-grey-7"
                      >
                        {{ col.label }}
                      </p>

                      <template v-for="cell in cellsSlots" :key="cell.id">
                        <div class="overflow-wrap-anywhere">
                          <slot
                            :name="cell.id"
                            :row="props.row"
                            v-if="isSlotColumn(cell, col)"
                          />
                        </div>
                      </template>

                      <!-- <p class="no-margin text-title" v-if="!isColHasSlot(col)">
                        {{ props.row[col.field] }}
                      </p> -->

                      <div class="q-gutter-x-sm" v-if="col.actions">
                        <q-btn
                          v-for="(action, index) in col.actions(props.row)"
                          :key="index"
                          size="sm"
                          outline
                          color="dark-move-2"
                          v-bind="action"
                        />
                      </div>

                      <!-- Handle lookups -->
                      <obs-lookups
                        v-if="col.lookup"
                        :lookup="col.lookup"
                        :value="props.row[col.field]"
                      />
                    </div>
                  </div>
                </q-card>
              </template>
            </q-table>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <skeleton flat v-else></skeleton>
  </div>
</template>

<script>
import { ref, computed, defineComponent, onMounted, watch } from "vue";
import { exportFile, useQuasar } from "quasar";
import { useStore } from "vuex";

import csvValue from "src/modules/app/utils/csv-value";

import Skeleton from "./skeleton";

export default defineComponent({
  components: {
    Skeleton,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    searchPlaceholder: {
      type: String,
      default: null,
    },
    userAdd: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    filters: {
      type: Array,
      default: () => [],
    },
    rowKey: {
      type: [String, Number],
      required: true,
    },
    pagination: {
      type: Object,
      default: () => ({}),
    },
    action: {
      type: String,
      default: null,
    },
    hideHeader: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      default: null,
    },
    params: {
      type: Object,
      default: () => ({}),
    },
    flat: {
      type: Boolean,
      default: true,
    },
    selection: {
      type: String,
      default: "none",
    },
    actions: {
      type: Function,
      default: () => {},
    },
    handleRowSelect: {
      type: Function,
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    duplicate: {
      type: Boolean,
      default: true,
    },
    noDataLabel: {
      type: String,
    },
  },
  setup(props, { slots, emit }) {
    // store
    const store = useStore();

    // $q
    const q = useQuasar();

    // Data
    const selected = ref([]);
    const table = ref(null);
    const isAutoFetch = !!props.action;
    const localValue = ref(null);
    const localLoading = ref(false);
    const data = computed(() => (isAutoFetch ? localValue.value : props.value));
    const isLoading = computed(() =>
      isAutoFetch ? localLoading.value : props.loading
    );

    // Search
    const isFilterMenuActive = ref(false);
    const search = ref();
    const filtersValue = ref({});
    const paginationData = ref({
      // Defaults
      page: 1,
      rowsPerPage: 15,
      descending: true,
      // Override
      ...props.pagination,
    });

    // Computed
    const cellsSlots = computed(() => {
      const cells = Object.entries(slots).reduce((result, [id]) => {
        if (id.includes("cell-")) {
          result.push({ id });
        }
        return result;
      }, []);
      const isThereActions = props.columns.find((column) => !!column.actions);
      const isThereLookups = props.columns.find((column) => !!column.lookup);

      // Hack for actions
      if (isThereActions) {
        props.columns
          .filter((column) => !!column.actions)
          .forEach((column) => {
            column.actions({}).forEach(() => {
              cells.push({
                id: `cell-${column.name}`,
                actions: (row) => column.actions(row),
              });
            });
          });
      }

      // Hack for lookups
      if (isThereLookups) {
        props.columns
          .filter((column) => !!column.lookup)
          .forEach((column) => {
            cells.push({
              id: `cell-${column.name}`,
              lookup: column.lookup,
            });
          });
      }
      return cells;
    });

    // Methods
    const handleExport = () => {
      const rows = table.value.computedRows;
      const columns = props.columns.filter((col) => !!col.field);

      // naive encoding to csv format
      const content = [columns.map((col) => csvValue(col.label))]
        .concat(
          rows.map((row) =>
            columns
              .filter((col) => !!col.field)
              .map((col) =>
                csvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format,
                  row
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("table-export.csv", "\ufeff" + content, {
        encoding: "UTF-8",
        mimeType: "text/csv;charset=UTF-8;",
      });

      if (status !== true) {
        q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    };
    const handleRequest = async (
      request = { pagination: paginationData.value }
    ) => {
      try {
        localLoading.value = true;
        const query = {
          ...props.params,
          ...request.pagination,
          ...filtersValue.value,
          search: request.filter,
        };

        const response = await store.dispatch(props.action, query);
        const { items, rowsNumber } = response.data;

        paginationData.value = { ...request.pagination, rowsNumber };
        localValue.value = items;
      } catch (error) {
        q.notify({
          message: "Something went wrong",
          type: "negative",
          position: "top",
        });

        return Promise.reject(error);
      } finally {
        localLoading.value = false;
      }
    };
    const handleFirstRun = () => {
      if (isAutoFetch) {
        // Reset
        paginationData.value.page = 1;

        // Run
        handleRequest({
          pagination: paginationData.value,
          search: search.value,
        });
      }
    };
    const isSlotColumn = (cell, col) => {
      return cell.id.split("cell-")[1] === col.field;
    };
    const isColHasSlot = (col) => {
      return cellsSlots.value.find(
        (slot) => slot.id.split("-")[1] === col.field
      );
    };
    const handleFilter = () => {
      isFilterMenuActive.value = false;

      handleRequest();
    };

    // Watchers
    watch(
      () => props.action,
      (nextValue, prevValue) => {
        if (nextValue !== prevValue) {
          handleFirstRun();
        }
      }
    );

    function handleRowClick(evt, row, index) {
      const { handleRowSelect } = props;

      if (handleRowSelect) {
        selected.value = [row];
        handleRowSelect(evt, row, index);
      }
    }

    // Lifecycle
    onMounted(() => handleFirstRun());

    return {
      filtersValue,
      table,
      isFilterMenuActive,
      handleFilter,
      handleExport,
      handleRequest,
      isLoading,
      data,
      search,
      paginationData,
      cellsSlots,
      isSlotColumn,
      isColHasSlot,
      selected,
      handleRowClick,
    };
  },
});
</script>

<style lang="scss">
.u-table {
  &__filters {
    width: 320px;
  }

  &__cards-contaner > div {
    margin-bottom: 1px;
    padding: 0;

    & > div.q-table__grid-item-card {
      border-radius: 0;
    }
  }
}
</style>
<style>
.btn-component {
  border-radius: 7px;
}

.custom-search-compoents,
.custom-search-compoents .q-field__prepend,
.custom-search-compoents .q-field__control-container {
  height: 48px;
}

.custom-search-compoents .q-field__control {
  height: 48px;
  border-radius: 7px;
}

.custom-search-compoents .q-placeholder {
  color: #000000;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
}

.myclass {
  color: #294b6c;
}

.btn-component-duplicate:before {
  border: 2px solid #e5e4e4;
  border-radius: 7px;
}

.btn-2 {
  background-color: #ca79c6;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.my-sticky-header-table .q-checkbox__inner--truthy .q-checkbox__bg {
  background-color: #ca79c6;
  border-color: #ca79c6;
}

.my-sticky-header-table .q-td {
  text-align: left;
}
.q-table--horizontal-separator tbody tr > td:last-child {
  text-align: center !important;
}
</style>
