<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-4 col-12">
        <obs-table
          :handleRowSelect="(evt, row) => (activeCountry = row)"
          :title="'Country'"
          row-key="id"
          :value="countries"
          :columns="[
            {
              name: 'number',
              label: '#',
              field: 'number',
              align: 'left'
            },
            {
              sortable: true,
              name: 'countryName',
              label: $t('app.administration.settings.countryName'),
              field: 'countryName',
              align: 'left'
            },
            {
              sortable: true,
              name: 'isActive',
              label: $t('app.administration.settings.addresses.active'),
              align: 'left',
              field: 'isActive'
            }
          ]"
        >
          <template #cell-isActive="item">
            <q-toggle
              :model-value="item.row.isActive"
              checked-icon="check"
              color="green"
              @update:model-value="handletoggleCountryAddress(item)"
            />
          </template>

          <template #cell-number="item">
            {{ item.rowIndex + 1 }}
          </template>
        </obs-table>
      </div>

      <div class="col-lg-4 col-12">
        <obs-table
          title="State/Region"
          row-key="id"
          no-data-label="please select country"
          :handleRowSelect="(evt, row) => (activeRegion = row)"
          :searchable="false"
          :value="regions"
          :onAdd="
            activeCountry &&
            (() => handleOpenForm({ id: activeCountry }, handleCreateRegion))
          "
          :columns="[
            {
              name: 'number',
              label: '#',
              field: 'number',
              align: 'left'
            },
            {
              sortable: true,
              name: 'regionName',
              label: 'State',
              field: 'regionName',
              align: 'left'
            },
            {
              name: 'options',
              label: 'Options',
              field: 'options',
              align: 'left'
            }
          ]"
        >
          <template #cell-number="item">
            {{ item.rowIndex + 1 }}
          </template>

          <template #cell-options="item">
            <q-btn round flat icon="more_vert">
              <q-menu>
                <q-list>
                  <q-item
                    @click="
                      handleOpenForm(
                        {
                          id: item.row.id,
                          name: item.row.regionName
                        },
                        handleUpdateRegion
                      )
                    "
                    clickable
                    v-close-popup
                  >
                    Edit
                  </q-item>
                  <q-item
                    @click="handleDeleteRegion(item)"
                    clickable
                    v-close-popup
                    class="text-red"
                  >
                    Delete
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>
        </obs-table>
      </div>

      <div class="col-lg-4 col-12">
        <obs-table
          :title="'City'"
          row-key="id"
          :searchable="false"
          :value="cities"
          no-data-label="please select State/Region"
          :onAdd="
            activeRegion &&
            (() => handleOpenForm({ id: activeRegion }, handleCreateCity))
          "
          :columns="[
            {
              name: 'number',
              label: '#',
              field: 'number',
              align: 'left'
            },
            {
              sortable: true,
              name: 'cityName',
              label: 'City',
              field: 'cityName',
              align: 'left'
            },
            {
              name: 'options',
              label: 'Options',
              field: 'options',
              align: 'left'
            }
          ]"
        >
          <template #cell-number="item">
            {{ item.rowIndex + 1 }}
          </template>

          <template #cell-options="item">
            <q-btn round flat icon="more_vert">
              <q-menu>
                <q-list>
                  <q-item
                    @click="
                      handleOpenForm(
                        {
                          id: item.row.id,
                          name: item.row.cityName
                        },
                        handleUpdateCity
                      )
                    "
                    clickable
                    v-close-popup
                  >
                    Edit
                  </q-item>
                  <q-item
                    @click="handleDeleteCity(item)"
                    clickable
                    v-close-popup
                    class="text-red"
                  >
                    Delete
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>
        </obs-table>
      </div>
    </div>

    <q-dialog @hide="clearForm" v-model="dialog" persistent>
      <q-card style="min-width: 280px">
        <q-card-section>
          <div class="text-h6">Fill Data Below</div>
        </q-card-section>

        <obs-form @obs-submit="onSubmit">
          <q-card-section class="q-pt-none">
            <obs-text-field
              name="name"
              placeholder="Name"
              type="text"
              :label="'Name'"
              v-model="form.name"
              rules="required"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Save" type="submit" />
          </q-card-actions>
        </obs-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { Loading, Notify } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useDialog, useEntity } from "src/composables/hooks";
import { computed, onMounted, ref, shallowRef, watch } from "vue";
import first from "lodash/first";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);

// function addDefaultRows(items) {
//   const length = items?.length || 0;
//   const defaultRows = Array.from(Array(10 - length).keys()).map(() => ({}));
//   const rows = Array.from(Array(length).keys()).map((i) => items[i]);
//   return [...rows, ...defaultRows];
// }

export default {
  setup() {
    const {
      getAddresses,
      toggleCountryAddress,
      createRegion,
      updateRegion,
      deleteRegion,
      createCity,
      updateCity,
      deleteCity
    } = useActions([
      "getAddresses",
      "toggleCountryAddress",
      "createRegion",
      "updateRegion",
      "deleteRegion",
      "createCity",
      "updateCity",
      "deleteCity"
    ]);
    const { refresh, data, on } = useEntity({ request: getAddresses });
    const { dialog, toggleDialog } = useDialog();
    const form = ref();
    let callback;
    const postEntity = useEntity();
    const deleteEntity = useEntity();
    const activeCountry = shallowRef();
    const activeRegion = shallowRef();
    const countries = computed(() => data.value?.data?.items);
    const regions = computed(() => {
      return countries.value?.find(({ id }) => id == activeCountry.value?.id)
        ?.detailedReigons;
    });
    const cities = computed(() => {
      return regions.value?.find(({ id }) => id == activeRegion.value?.id)
        ?.detailedCities;
    });

    const handletoggleCountryAddress = (item) => {
      // Loading.show();
      item.row.isActive = !item.row.isActive;

      toggleCountryAddress(item.row.id)
        .then(() => {
          // refresh();
        })
        .catch((error) => {
          item.row.isActive = !item.row.isActive;
          Loading.hide();
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: 'red',
            position: 'top'
          })
        }).finally(() => {
          Loading.hide();
        })
    };

    const clearForm = () => {
      form.value = {};
    };

    const onSubmit = () => {
      callback(form.value);
    };

    function handleOpenForm(data, _callback) {
      toggleDialog();

      form.value = data;

      callback = _callback;
    }

    function handleDeleteRegion(item) {
      deleteEntity.fire(() => deleteRegion(item.row.id));
    }

    function handleDeleteCity(item) {
      deleteEntity.fire(() => deleteCity(item.row.id));
    }

    function handleCreateRegion(data) {
      const payload = {
        countryId: activeCountry.value?.id,
        name: data.name
      };

      postEntity.fire(() => createRegion(payload));
    }

    function handleUpdateRegion(date) {
      postEntity.fire(() => updateRegion(date));
    }

    function handleCreateCity(data) {
      const payload = {
        regionId: activeRegion.value?.id,
        name: data.name
      };

      postEntity.fire(() => createCity(payload));
    }

    function handleUpdateCity(data) {
      postEntity.fire(() => updateCity(data));
    }

    onMounted(() => {
      deleteEntity.on({
        pending: Loading.show,
        completed: Loading.hide,
        fulfilled: () => {
          refresh();
        },
        rejected(error) {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top"
          });
        }
      });

      postEntity.on({
        pending: Loading.show,
        completed: Loading.hide,
        fulfilled: () => {
          toggleDialog();
          refresh();
        },
        rejected(error) {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top"
          });
        }
      });

      on({
        pending: Loading.show,
        completed: Loading.hide,
        rejected() {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top"
          });
        }
      });

      refresh();
    });

    return {
      handletoggleCountryAddress,
      countries,
      regions,
      cities,
      activeCountry,
      activeRegion,
      handleDeleteRegion,
      handleDeleteCity,
      dialog,
      toggleDialog,
      clearForm,
      onSubmit,
      handleCreateRegion,
      handleUpdateRegion,
      handleCreateCity,
      handleUpdateCity,
      handleOpenForm,
      form
    };
  }
};
</script>
