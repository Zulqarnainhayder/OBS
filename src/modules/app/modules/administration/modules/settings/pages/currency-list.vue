<template>
  <q-page padding>
    <obs-table
      selection="multiple"
      :duplicate="false"
      v-model:selected="selected"
      class="custom-badge-table currency-table"
      :title="$t('app.administration.settings.currency.currencyList')"
      row-key="id"
      action="AppModule/AdministrationModule/SettingsModule/getCurrencies"
      :key="`${tableKey}`"
      :columns="[
        {
          name: 'currencyName',
          label: $t('app.administration.settings.currency.currencyName'),
          field: 'currencyName',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'isoCode',
          label: $t('app.administration.settings.currency.isoCode'),
          field: 'isoCode',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'fractionalUnit',
          label: $t('app.administration.settings.currency.fractionalUnit'),
          field: 'fractionalUnit',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'numberToBasic',
          label: $t('app.administration.settings.currency.numberToBasic'),
          field: 'numberToBasic',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'executeDate',
          label: $t('app.administration.settings.currency.excuteDate'),
          field: 'executeDate',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'currentRate',
          label: $t('app.administration.settings.currency.currentRate'),
          field: 'currentRate',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'localCurrency',
          label: $t('app.administration.settings.currency.localCurrency'),
          field: 'localCurrency',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'active',
          label: $t('app.administration.settings.currency.active'),
          field: 'isActive',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'editablity',
          label: $t('app.administration.settings.currency.editablity'),
          field: 'isEditability',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'actions',
          label: $t('app.administration.settings.currency.actionsName'),
          align: 'center',
          headerClasses: 'text-uppercase',
          actions: (item) => [
            {
              icon: 'edit',
              label: $t('app.administration.settings.currency.actionsName'),
              onClick: () => openEditDialog(item),
            },
          ],
        },
      ]"
      ><template #cell-localCurrency="item">
        <q-badge
          rounded
          :color="item.row.localCurrency ? '#2684FF' : 'grey'"
          class="custom-badge q-mt-xs"
        />
      </template>
      <template #cell-executeDate="item">
        {{ new Date(item.row.executeDate).toLocaleDateString("en-GB") }}
      </template>
      <template #cell-editablity="item">
        <q-toggle
          class="custome-toggle-dark color-orange"
          v-model="item.row.isEditability"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          :disable="!item.row.isActive"
          @update:model-value="updateIsEditiibility(item.row)"
        />
      </template>
      <template #cell-active="item">
        <q-toggle
          class="custome-toggle-dark"
          v-model="item.row.isActive"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          @update:model-value="updateIsActive(item.row)"
        />
      </template>
    </obs-table>
    <q-dialog v-model="editCurrencyDialog" persistent>
      <q-card style="min-width: 280px">
        <q-card-section>
          <div class="text-h6">
            {{ $t("app.administration.settings.currency.editCurrencyRate") }}
          </div>
        </q-card-section>

        <obs-form @obs-submit="handleCurrencyRate(editedCurrency)">
          <q-card-section class="q-pt-none">
            <obs-text-field
              name="currencyRate"
              placeholder="Currency Rate"
              type="number"
              :label="$t('app.administration.settings.currency.currentRate')"
              v-model="editedCurrency.currentRate"
              rules="required"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn
              flat
              :label="$t('app.administration.settings.currency.cancel')"
              v-close-popup
            />
            <q-btn
              flat
              :label="
                $t('app.administration.settings.currency.editCurrencyRate')
              "
              type="submit"
            />
          </q-card-actions>
        </obs-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { Loading, Notify } from "quasar";
import { ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);

export default {
  setup() {
    const editCurrencyDialog = ref(false);

    const editedCurrency = ref({
      id: null,
      currentRate: null,
    });
    const allValues = ref();

    const tableKey = ref(Math.random());
    const reMountTable = () => {
      tableKey.value = Math.random();
    };

    const { toggleIsCurrencyActive, toggleIsEditiibility, updateCurrentRate } =
      useActions([
        "editCurrency",
        "toggleIsCurrencyActive",
        "toggleIsEditiibility",
        "updateCurrentRate",
      ]);

    function openEditDialog(currentCurrency) {
      editCurrencyDialog.value = true;
      allValues.value = currentCurrency;
      editedCurrency.value.id = currentCurrency.id;
      editedCurrency.value.currentRate = currentCurrency.currentRate;
    }

    const handleCurrencyRate = (values) => {
      editedCurrency.value = {
        ...values,
      };
      Loading.show();
      updateCurrentRate(editedCurrency.value)
        .then(() => {
          editCurrencyDialog.value = false;
          reMountTable();
        })
        .catch(({ response }) => {
          Notify.create({
            message: response.data.errorMessage,
            color: "red",
            position: "top",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    };

    const updateIsActive = (row) => {
      toggleIsCurrencyActive(row.id)
        .then(() => {})
        .catch((error) => {
          row.isActive = !row.isActive;

          Notify.create({
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "red",
            position: "top",
          });
        });
    };

    const updateIsEditiibility = (row) => {
      toggleIsEditiibility(row.id)
        .then(() => {})
        .catch((error) => {
          // Handle reset value
          row.isEditability = !row.isEditability;

          // Send message
          Notify.create({
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "red",
            position: "top",
          });
        });
    };

    return {
      editCurrencyDialog,
      editedCurrency,
      openEditDialog,
      handleCurrencyRate,
      tableKey,
      reMountTable,
      updateIsActive,
      updateIsEditiibility,
    };
  },
};
</script>
<style>
.custome-toggle-dark .q-toggle__thumb:after,
.custome-toggle-dark .q-toggle__inner--truthy .q-toggle__thumb .q-icon {
  display: none;
}

.custome-toggle-dark .q-toggle__inner--truthy .q-toggle__track {
  opacity: 1;
}

.custome-toggle-dark .text-green {
  color: #00d92f !important;
}

.color-orange .text-green {
  color: #ff8a00 !important;
}

.q-toggle__inner {
  font-size: 45px;
  padding: 0.325em 0.1em;
}

.custome-toggle-dark .q-toggle__track {
  opacity: 1;
  /* color: #F75C6C; */
}

.custome-toggle-dark .non-selectable {
  color: #e0e0e8;
}

.custome-toggle-dark .q-toggle__thumb {
  display: none;
}

.custom-badge {
  padding: 7px 30px 8px 25px;
}
.custom-badge-table .bg-grey {
  background: #e0e0e8 !important;
}
.custom-badge-table .q-badge {
  background-color: #2684ff;
}
.currency-table .my-sticky-header-table .q-td {
  text-align: center;
}
</style>
