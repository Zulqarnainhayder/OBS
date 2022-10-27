<template>
  <q-page padding>
    <obs-table
      :key="key"
      :title="$t('app.administration.settings.businessSector')"
      row-key="id"
      action="AppModule/AdministrationModule/SettingsModule/getBusinessSectors"
      :onAdd="toggleDialog"
      :columns="[
        {
          name: 'number',
          label: '#',
          field: 'number'
        },
        {
          sortable: true,
          name: 'businessSectorNameEn',
          label: $t('app.administration.settings.businessSector'),
          align: 'left',
          field: 'businessSectorNameEn'
        },
        {
          sortable: true,
          name: 'activityTypeNameEn',
          label: $t('app.administration.settings.activityTypes'),
          field: 'activityTypeNameEn',
          align: 'left'
        },
        {
          name: 'actions',
          label: $t('app.administration.settings.actions'),
          align: 'left',
          actions: (item) => [
            {
              icon: 'edit',
              label: $t('app.administration.settings.edit'),
              onClick: () => handleEdit(item)
            },
            {
              icon: 'delete',
              color: 'red',
              label: $t('app.administration.settings.delete'),
              onClick: () => confirmDeleteSector(item)
            }
          ]
        }
      ]"
    >
      <template #cell-number="item">
        {{ item.rowIndex + 1 }}
      </template>
    </obs-table>

    <q-dialog v-model="dialog" @hide="cancelForm" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">
            {{ $t("app.administration.settings.fillContent") }}
          </div>
        </q-card-section>

        <obs-form @obs-submit="submitForm">
          <q-card-section class="q-pt-none">
            <obs-text-field
              name="businessSectorNameEn"
              type="text"
              :label="
                $t(
                  'app.administration.settings.businessSectors.businessSectorNameEn'
                )
              "
              :model-value="form.businessSectorNameEn"
              rules="required"
            />

            <obs-lookup-field
              name="activityTypeId"
              :model-value="form.activityTypeId"
              type="select"
              rules="required"
              lookup="ActivityTypes"
              :label="
                $t('app.administration.settings.businessSectors.activityType')
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
import { Loading, Dialog, Notify } from "quasar";
import { shallowRef } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useDialog, useRemount } from "src/composables/hooks";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);

export default {
  setup() {
    const { dialog, toggleDialog } = useDialog();
    const { key, remount } = useRemount();
    const form = shallowRef({});
    const { deleteBusinessSector, updateBusinessSector, createBusinessSector } =
      useActions([
        "deleteBusinessSector",
        "updateBusinessSector",
        "createBusinessSector"
      ]);

    function handleEdit(item) {
      toggleDialog();
      form.value = item;
    }

    function submitForm(values) {
      const { id } = form.value;
      const method = id ? updateBusinessSector : createBusinessSector;

      const payload = {
        ...(id && { id }),
        ...values
      };

      Loading.show();

      method(payload)
        .then(() => {
          toggleDialog();
          remount();
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
    }

    function cancelForm() {
      form.value = {};
    }

    const confirmDeleteSector = (item) => {
      Dialog.create({
        title: `Confirm Deleting`,
        message: "Would you like to delete this Sector?",
        cancel: true,
        persistent: true
      }).onOk(() => {
        handleDeleteSector(item);
      });
    };

    const handleDeleteSector = (item) => {
      const { id } = item;

      Loading.show();

      deleteBusinessSector(id)
        .then(() => {
          remount();
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

    return {
      form,
      dialog,
      toggleDialog,
      key,
      handleEdit,
      submitForm,
      cancelForm,
      confirmDeleteSector
    };
  }
};
</script>
