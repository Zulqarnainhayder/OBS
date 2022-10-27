<template>
  <q-page padding>
    <obs-table
      :title="
        $t('app.administration.settings.accountingPeriods.accountingPeriods')
      "
      row-key="id"
      class="accounting-table"
      selection="multiple"
      v-model:selected="selected"
      :value="periods"
      :duplicate="false"
      :onAdd="toggleDialog"
      :columns="[
        {
          sortable: true,
          name: 'accountingPeriodName',
          label: $t('app.administration.settings.accountingPeriods.label'),
          field: 'accountingPeriodName',
          align: 'center',
          style: 'width: 250px',
          headerStyle: 'width: 250px',
          headerClasses: 'text-uppercase'
        },
        {
          sortable: true,
          name: 'openingDate',
          label: $t(
            'app.administration.settings.accountingPeriods.openingDate'
          ),
          align: 'center',
          field: 'openingDate',
          headerClasses: 'text-uppercase'
        },
        {
          sortable: true,
          name: 'endingDate',
          label: $t('app.administration.settings.accountingPeriods.endingDate'),
          align: 'center',
          field: 'endingDate',
          headerClasses: 'text-uppercase'
        },
        {
          name: 'isClosing',
          label: $t('app.administration.settings.accountingPeriods.closing'),
          align: 'center',
          field: 'isClosing',
          headerClasses: 'text-uppercase'
        },
        {
          name: 'actions',
          label: $t('app.administration.settings.accountingPeriods.delete'),
          align: 'center',
          actions: (item) => [
            {
              icon: 'delete',
              color: 'red',
              label: $t('app.administration.settings.accountingPeriods.delete'),
              onClick: () => confirmDeleteAccountingPeriod(item)
            }
          ],
          headerClasses: 'text-uppercase'
        }
      ]"
    >
      <template #cell-number="item">
        {{ item.rowIndex + 1 }}
      </template>

      <template #cell-isClosing="item">
        <q-toggle
          class="custome-toggle"
          checked-icon="check"
          color="green"
          :model-value="item.row.isClosing"
          @update:model-value="handletoggleAccountingPeriod(item)"
        />
      </template>
    </obs-table>

    <q-dialog @hide="clearForm" v-model="dialog" persistent>
      <q-card style="min-width: 280px">
        <q-card-section>
          <div class="text-h6">Add Accounting Periods</div>
        </q-card-section>

        <obs-form @obs-submit="submitAddAccountingPeriod">
          <q-card-section class="q-pt-none">
            <obs-text-field
              name="accountingPeriodName"
              placeholder="Accounting Period"
              type="text"
              :label="$t('app.administration.settings.accountingPeriods.label')"
              v-model="form.accountingPeriodName"
              rules="required"
            />
            <obs-date-field
              name="openingDate"
              placeholder="Opening Date"
              format="YYYY-MM-DD"
              :disable="Boolean(minDateEntity.data.value?.data?.value)"
              :label="
                $t('app.administration.settings.accountingPeriods.openingDate')
              "
              v-model="form.openingDate"
              rules="required"
            />
            <obs-date-field
              name="endingDate"
              placeholder="Ending Date"
              :handleDisable="handleDisable"
              format="YYYY-MM-DD"
              :label="
                $t('app.administration.settings.accountingPeriods.endingDate')
              "
              v-model="form.endingDate"
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
import { Loading, Dialog, Notify } from "quasar";
import { computed, onBeforeMount, ref, watch } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useDialog, useEntity, useRemount } from "src/composables/hooks";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);

export default {
  setup() {
    const {
      deleteAccountingPeriod,
      addAccountingPeriod,
      toggleAccountingPeriod,
      getOpeningDate,
      getAccountingPeriods
    } = useActions([
      "deleteAccountingPeriod",
      "addAccountingPeriod",
      "toggleAccountingPeriod",
      "getOpeningDate",
      "getAccountingPeriods"
    ]);
    const periodsEntity = useEntity({ request: getAccountingPeriods });
    const periods = computed(() => periodsEntity.data.value?.data?.items);
    const minDateEntity = useEntity({ request: getOpeningDate });
    const { dialog, toggleDialog } = useDialog();
    const initialValue = {
      isClosing: false
    };
    const form = ref({ ...initialValue });

    const clearForm = () => {
      form.value = {
        ...initialValue
      };
    };

    function handleDisable(date) {
      return new Date(date) > new Date(form.value.openingDate);
    }

    const confirmDeleteAccountingPeriod = (item) => {
      Dialog.create({
        title: `Confirm Deleting Accounting Period`,
        message: "Would you like to delete this Accounting Period?",
        cancel: true,
        persistent: true
      }).onOk(() => {
        handleDeleteAccountingPeriod(item);
      });
    };

    const handleDeleteAccountingPeriod = (item) => {
      Loading.show();

      deleteAccountingPeriod(item.id)
        .then(() => {
          periodsEntity.refresh();
          minDateEntity.refresh();
        })
        .catch((error) => {
          Notify.create({
            message: `${error?.errorMessage}`,
            color: "red",
            position: "top"
          });
        })
        .finally(() => {
          Loading.hide();
        });
    };

    const submitAddAccountingPeriod = () => {
      Loading.show();

      addAccountingPeriod(form.value)
        .then(() => {
          toggleDialog();
          periodsEntity.refresh();
          minDateEntity.refresh();
        })
        .catch((error) => {
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: "red",
            position: "top"
          });
        })
        .finally(() => {
          Loading.hide();
        });
    };

    const handletoggleAccountingPeriod = (item) => {
      // Loading.show();
      item.row.isClosing = !item.row.isClosing;

      toggleAccountingPeriod(item.row.id)
        .then(() => {
          // periodsEntity.refresh();
          // minDateEntity.refresh();
        })
        .catch((error) => {
          item.row.isClosing = !item.row.isClosing;

          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: "red",
            position: "top"
          });
        })
        .finally(() => {
          // Loading.hide();
        });
    };

    onBeforeMount(() => {
      periodsEntity.on({
        pending: Loading.show,
        completed: Loading.hide,
        rejected(error) {
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: "red",
            position: "top"
          });
        }
      });

      minDateEntity.on({
        pending: Loading.show,
        completed: Loading.hide,
        rejected(error) {
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: "red",
            position: "top"
          });
        }
      });

      minDateEntity.refresh();
      periodsEntity.refresh();
    });

    watch(dialog, (dialog) => {
      if (dialog) {
        form.value.openingDate = minDateEntity.data.value?.data?.value;
      }
    });

    return {
      confirmDeleteAccountingPeriod,
      form,
      submitAddAccountingPeriod,
      handletoggleAccountingPeriod,
      dialog,
      toggleDialog,
      clearForm,
      minDateEntity,
      handleDisable,
      periods
    };
  }
};
</script>
<style>
.custome-toggle .q-toggle__thumb:after, .custome-toggle .q-toggle__inner--truthy .q-toggle__thumb .q-icon{
  display: none;
}
.custome-toggle .q-toggle__inner--truthy .q-toggle__track{
  opacity: 1;
}
.custome-toggle .text-green{
  color: #00D92F !important;
}
.q-toggle__inner{
  font-size: 45px;
  padding: 0.325em 0.1em;
}
.custome-toggle .q-toggle__track{
  opacity: 1;
  /* color: #F75C6C; */
}
.custome-toggle .non-selectable{
  color: #F75C6C;
}
.accounting-table .my-sticky-header-table .q-td {
  text-align: center;
}
</style>
