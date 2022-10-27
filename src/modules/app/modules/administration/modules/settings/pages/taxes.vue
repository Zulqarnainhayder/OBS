<template>
  <q-page padding>
    <obs-table
      :title="$t('app.administration.settings.taxes.label')"
      row-key="id"
      class="taxes-table"
      action="AppModule/AdministrationModule/SettingsModule/getTaxes"
      selection="multiple"
      :duplicate="false"
      v-model:selected="selected"
      :onAdd="toggleDialog"
      :key="key"
      :columns="[
        {
          name: 'taxName',
          label: $t('app.administration.settings.taxes.table.name'),
          field: 'taxName',
          align: 'center',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'taxLabel',
          label: $t('app.administration.settings.taxes.table.label'),
          align: 'center',
          field: 'taxLabel',
          headerClasses: 'text-uppercase',
        },
        // {
        //   sortable: true,
        //   name: 'scope',
        //   label: $t('app.administration.settings.taxes.table.scope'),
        //   align: 'center',
        //   field: 'scope'
        // },
        {
          name: 'taxSign',
          label: $t('app.administration.settings.taxes.table.sign'),
          align: 'center',
          field: 'taxSign',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'taxComputation',
          label: $t('app.administration.settings.taxes.table.computation'),
          align: 'center',
          field: 'taxComputation',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'taxValue',
          label: $t('app.administration.settings.taxes.table.value'),
          align: 'center',
          field: 'taxValue',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'taxAccount',
          label: $t('app.administration.settings.taxes.table.account'),
          align: 'center',
          field: 'taxAccount',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'taxAccountReturns',
          label: $t(
            'app.administration.settings.taxes.table.accountForReturns'
          ),
          align: 'center',
          field: 'taxAccountReturns',
          headerClasses: 'text-uppercase',
        },
        {
          name: 'isActive',
          label: $t('app.administration.settings.taxes.table.active'),
          align: 'center',
          field: 'isActive',
        },
        {
          name: 'actions',
          label: $t('app.administration.settings.taxes.actions'),
          align: 'center',
          actions: (item) => [
            {
              icon: 'edit',
              label: $t('app.administration.settings.tags.edit'),
              onClick: () => editItem(item),
            },
            {
              icon: 'delete',
              color: 'red',
              label: $t('app.administration.settings.delete'),
              onClick: () => confirmDeleteSector(item),
            },
          ],
        },
      ]"
    >
      <template #cell-isActive="item">
        <q-toggle
          class="custome-toggle-dark"
          checked-icon="check"
          color="green"
          :model-value="item.row.isActive"
          @update:model-value="toggleActive(item)"
        />
      </template>

      <template #cell-number="item">
        {{ item.rowIndex + 1 }}
      </template>

      <template #cell-taxAccountReturns="item">
        {{ item.row.taxAccountReturns?.chartName }}
      </template>

      <template #cell-taxAccount="item">
        {{ item.row.taxAccount?.chartName }}
      </template>

      <template #cell-taxComputation="item">
        <obs-lookups
          lookup="$TaxComputation"
          :value="item.row.taxComputation"
        />
      </template>

      <template #cell-taxSign="item">
        <obs-lookups lookup="$Signature" :value="item.row.taxSign" />
      </template>
    </obs-table>

    <q-dialog @hide="clearForm" v-model="dialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Fill Tax Details</div>
        </q-card-section>

        <obs-form @obs-submit="onSubmitForm">
          <q-card-section class="q-pt-none">
            <obs-text-field
              name="taxName"
              type="text"
              :label="$t('app.administration.settings.taxes.table.name')"
              v-model="form.taxName"
              rules="required"
            />

            <obs-text-field
              name="taxLabel"
              type="text"
              :label="$t('app.administration.settings.taxes.table.label')"
              v-model="form.taxLabel"
              rules="required"
            />

            <obs-lookup-field
              type="select"
              name="taxSign"
              lookup="$Signature"
              rules="required"
              v-model="form.taxSign"
              :label="$t('app.administration.settings.taxes.table.sign')"
            />

            <obs-lookup-field
              type="select"
              name="taxComputation"
              lookup="$TaxComputation"
              rules="required"
              v-model="form.taxComputation"
              :label="$t('app.administration.settings.taxes.table.computation')"
            />

            <obs-text-field
              name="taxValue"
              type="number"
              :label="$t('app.administration.settings.taxes.table.value')"
              v-model="form.taxValue"
              rules="required"
            />

            <obs-lookup-field
              type="select"
              name="taxAccountId"
              lookup="Charts"
              rules="required"
              v-model="form.taxAccountId"
              :label="$t('app.administration.settings.taxes.table.account')"
            />

            <obs-lookup-field
              type="select"
              name="taxAccountReturnsId"
              lookup="Charts"
              rules="required"
              v-model="form.taxAccountReturnsId"
              :label="
                $t('app.administration.settings.taxes.table.accountForReturns')
              "
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn
              flat
              :label="$t('app.administration.settings.submit')"
              type="submit"
            />
          </q-card-actions>
        </obs-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { Dialog, Loading, Notify } from "quasar";
import { useDialog, useRemount } from "src/composables/hooks";
import { ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import Lookup from "src/components/form/inputs/lookup.vue";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);

export default {
  setup() {
    const { updateTax, createTax, deleteTax, ToggleTaxIsActive } = useActions([
      "updateTax",
      "createTax",
      "deleteTax",
      "ToggleTaxIsActive",
    ]);
    const { dialog, toggleDialog } = useDialog();
    const { key, remount } = useRemount();
    const form = ref({});
    const editItem = (item) => {
      toggleDialog();
      if (item) {
        form.value = {
          ...item,
          taxAccountId: item.taxAccount?.chartId,
          taxAccountReturnsId: item.taxAccountReturns?.chartId,
        };
      }
    };
    const clearForm = () => {
      form.value = {};
    };
    const onSubmitForm = () => {
      const { id } = form.value;
      const method = id ? updateTax : createTax;
      const payload = form.value;
      Loading.show();
      method(payload)
        .then(() => {
          toggleDialog();
          remount();
        })
        .catch((error) => {
          Notify.create({
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "red",
            position: "top",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    };
    const confirmDeleteSector = (item) => {
      Dialog.create({
        title: `Confirm Deleting Tax`,
        message: "Would you like to delete this tax?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        handleDeleteSector(item);
      });
    };
    const handleDeleteSector = (item) => {
      const { id } = item;
      Loading.show();
      deleteTax(id)
        .then(() => {
          remount();
        })
        .catch((error) => {
          Notify.create({
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "red",
            position: "top",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    };
    function toggleActive(item) {
      // Loading.show();
      item.row.isActive = !item.row.isActive;

      ToggleTaxIsActive(item.row.id)
        .then(() => {
          // remount();
        })
        .catch((error) => {
          item.row.isActive = !item.row.isActive;

          Notify.create({
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "ref",
            position: "top",
          });
        })
        .finally(() => {
          // Loading.hide();
        });
    }
    return {
      form,
      dialog,
      editItem,
      onSubmitForm,
      toggleDialog,
      clearForm,
      key,
      confirmDeleteSector,
      toggleActive,
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
.taxes-table .my-sticky-header-table .q-td {
  text-align: center;
}
</style>
