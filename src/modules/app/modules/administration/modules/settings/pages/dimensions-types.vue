<template>
  <q-page padding>
    <obs-table
      :title="$t('app.administration.settings.dimensionsTypes.label')"
      row-key="id"
      action="AppModule/AdministrationModule/SettingsModule/getDimensionsTypes"
      :onAdd="() => openAddDialog()"
      :key="`${tableKey}`"
      :columns="[
        {
          name: 'rowIndex',
          label: '#',
          field: 'rowIndex',
          align: 'left',
        },
        {
          sortable: true,
          name: 'name',
          label: $t('app.administration.settings.dimensionsTypes.label'),
          field: 'name',
          align: 'left',
        },
        {
          name: 'actions',
          label: $t('app.administration.settings.dimensionsTypes.actions'),
          align: 'left',
          actions: (item) => [
            {
              icon: 'edit',
              label: $t('app.administration.settings.dimensionsTypes.edit'),
              onClick: () => openAddDialog(item) ,
            },
            {
              icon: 'delete',
              color: 'red',
              label: $t('app.administration.settings.dimensionsTypes.delete'),
              onClick: () => confirmDeleteDimensionType(item) ,
            },
          ],
        }
      ]"
    >
      <template #cell-rowIndex="item">
        {{ item.rowIndex + 1 }}
      </template>
    </obs-table>
    <q-dialog v-model="toggleDialog" persistent>

      <q-card style="min-width: 280px">
        <q-card-section>
          <div class="text-h6">{{$t('app.administration.settings.dimensionsTypes.dimensionDetails')}}</div>
        </q-card-section>

        <obs-form @obs-submit="submitAddDimensionType(newDimensionsType)">
          <q-card-section class="q-pt-none">
            <obs-text-field
              name="dimensionsTypes"
              type="text"
              :label="$t('app.administration.settings.dimensionsTypes.label')"
              v-model="newDimensionsType.name"
              rules="required"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('app.administration.settings.dimensionsTypes.cancel')" v-close-popup />
            <q-btn flat :label="addOrEdit" type="submit"  />
          </q-card-actions>
        </obs-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
const toggleDialog = ref(false)
import { Loading , Dialog, Notify} from 'quasar';
import { ref } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { useI18n } from 'vue-i18n';

const { useActions } = createNamespacedHelpers("AppModule/AdministrationModule/SettingsModule");

export default {
  setup() {
    const { deleteDimensionType, addDimensionType, editDimensionType } = useActions(['deleteDimensionType', 'addDimensionType', 'editDimensionType']);
    const i18n = useI18n();

    const tableKey = ref(Math.random())
    const reMountTable = () => {
      tableKey.value = Math.random()
    }
    const addOrEdit = ref('')

    const newDimensionsType = ref({
      name : null,
    })
    const confirmDeleteDimensionType = (item) => {
      Dialog.create({
        title: `Confirm Deleting dimension Type ${item.name}`,
        message: 'Would you like to delete this dimension Type?',
        cancel: true,
        persistent: true,

      }).onOk(() => {
        handleDeleteDimensionsType(item.id)
      })
    }

    const handleDeleteDimensionsType = (id) => {
      Loading.show();

      deleteDimensionType(id).then(() => {
        reMountTable()
        Notify.create({
          message: i18n.t('app.administration.settings.dimensionsTypes.dimensionDeleted'),
          color: 'green',
          position: 'top'
        })
      }).catch((error) => {
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: 'red',
            position: 'top'
          })
      }).finally(() => {
        Loading.hide();
      });
    }


    const openAddDialog = (item) => {
      toggleDialog.value = true

      newDimensionsType.value.name = item?.name

      if(item){
        addOrEdit.value = i18n.t('app.administration.settings.dimensionsTypes.editDimensionType')
        newDimensionsType.value.id = item.id
      } else {
        addOrEdit.value = i18n.t('app.administration.settings.dimensionsTypes.addDimensionType')
      }
    }

    const submitAddDimensionType = (dimension) => {
      Loading.show();
      if(!newDimensionsType.value.id){
        addDimensionType(dimension).then(() => {
          toggleDialog.value = false
          newDimensionsType.value = {
            name : null,
          }
          reMountTable()
        }).catch((error) => {
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: 'red',
            position: 'top'
          })
        }).finally(() => {
          Loading.hide();
        })
      } else {
        editDimensionType(dimension).then(() => {
          toggleDialog.value = false
          newDimensionsType.value = {
            name : null,
          }
          reMountTable()
        }).catch((error) => {
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: 'red',
            position: 'top'
          })
        }).finally(() => {
          Loading.hide();
        })
      }
    }


    return{
      handleDeleteDimensionsType,
      confirmDeleteDimensionType,
      toggleDialog,
      openAddDialog,
      newDimensionsType,
      submitAddDimensionType,
      addOrEdit,
      tableKey,
      reMountTable,
    }
  },
}
</script>
