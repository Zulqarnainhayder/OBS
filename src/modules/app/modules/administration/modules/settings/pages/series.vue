<template>
  <q-page padding>
    <obs-table
      :title="$t('app.administration.settings.series.label')"
      row-key="id"
      action="AppModule/AdministrationModule/SettingsModule/getSeries"
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
          name: 'seriesName',
          label: $t('app.administration.settings.series.seriesName'),
          field: 'seriesName',
          align: 'left',
        },
        {
          sortable: true,
          name: 'stator',
          label: $t('app.administration.settings.series.stator'),
          align: 'left',
          field: 'stator',
        },
        {
          name: 'year',
          label: $t('app.administration.settings.series.year'),
          align: 'left',
          field: 'year',
        },
        {
          name: 'month',
          label: $t('app.administration.settings.series.month'),
          align: 'left',
          field: 'month',
        },
        {
          name: 'sequenceStart',
          label: $t('app.administration.settings.series.sequenceStart'),
          align: 'left',
          field: 'sequenceStart',
        },
        {
          name: 'executeModule',
          label: $t('app.administration.settings.series.executeModule'),
          align: 'left',
          field: 'executeModule',
        },
        {
          sortable: true,
          name: 'isActive',
          label: $t('app.administration.settings.series.active'),
          align: 'left',
          field: 'isActive',
        },
        {
          name: 'actions',
          label: $t('app.administration.settings.series.actions'),
          align: 'left',
          actions: (item) => [
            {
              icon: 'edit',
              label: $t('app.administration.settings.series.edit'),
              onClick: () => openAddDialog(item) ,
            },
            {
              icon: 'delete',
              color: 'red',
              label: $t('app.administration.settings.series.delete'),
              onClick: () => confirmDeleteSeries(item) ,
            },
          ],
        }
      ]"
    >
      <template #cell-rowIndex="item">
        {{ item.rowIndex + 1 }}
      </template>
      <template #cell-executeModule="item">
        <div class="q-pa-md q-gutter-md">
          <q-badge outline color="primary" v-for="(executeModule, i) in item.row.executeModuleList" :key="i" :label="executeModule.label" />
        </div>
      </template>
      <template #cell-year="item">
        <q-toggle
          v-model="item.row.year"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          @update:model-value="updateYear(item.row)"
        />
      </template>
      <template #cell-month="item">
        <q-toggle
          v-model="item.row.month"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          @update:model-value="updateMonth(item.row)"
        />
      </template>
      <template #cell-isActive="item">
        <q-toggle
          v-model="item.row.isActive"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          @update:model-value="updateIsActive(item.row)"
        />
      </template>
    </obs-table>

    <q-dialog v-model="toggleDialog" persistent>

      <q-card style="min-width: 280px">
        <q-card-section>
          <div class="text-h6" v-if="addOrEdit == 'Add Series'">{{$t('app.administration.settings.series.addSeries')}}</div>
          <div class="text-h6" v-else>{{$t('app.administration.settings.series.editSeries')}}</div>
        </q-card-section>

        <obs-form @obs-submit="submitAddSeries(newSeries)">
          <q-card-section class="q-pt-none">
            <obs-text-field
              name="seriesName"
              type="text"
              :label="$t('app.administration.settings.series.seriesName')"
              v-model="newSeries.seriesName"
              rules="required"
            />
            <obs-text-field
              name="stator"
              type="text"
              :label="$t('app.administration.settings.series.stator')"
              v-model="newSeries.stator"
            />
            <obs-text-field
              name="sequenceStart"
              type="number"
              :label="$t('app.administration.settings.series.sequenceStart')"
              v-model="newSeries.sequenceStart"
              rules="required|numeric"
            />

            <obs-lookup-field
              type="select"
              name="select"
              v-model="newSeries.executeModuleIds"
              multiple
              lookup="#api/lookUps/ExecuteModules"
              :cached="false"
              :use-input="false"
              use-chips
              :label="$t('app.administration.settings.series.executeModule')"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('app.administration.settings.series.cancel')" v-close-popup />
            <q-btn flat :label="addOrEdit" type="submit"  />
          </q-card-actions>
        </obs-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { Loading , Dialog, Notify} from 'quasar';
import { ref } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';
import { useI18n } from 'vue-i18n';

const { useActions } = createNamespacedHelpers("AppModule/AdministrationModule/SettingsModule");

export default {
  setup() {
    const toggleDialog = ref(false)
    const {
      deleteSeries,
      editSeries,
      addSeries,
      toggleIsSeriesActive,
      toggleYear,
      toggleMonth
    } = useActions(['deleteSeries', 'editSeries', 'addSeries', 'toggleIsSeriesActive', 'toggleYear', 'toggleMonth']);
    const i18n = useI18n();

    const tableKey = ref(Math.random())
    const reMountTable = () => {
      tableKey.value = Math.random()
    }

    const addOrEdit = ref('')

    const newSeries = ref({
      seriesName : null,
      stator: null,
      sequenceStart: null,
      executeModuleIds: null
    })

    const openAddDialog = (item) => {
      toggleDialog.value = true
      newSeries.value.seriesName = item?.seriesName
      newSeries.value.stator = item?.stator
      newSeries.value.sequenceStart = item?.sequenceStart
      newSeries.value.executeModuleIds = item?.executeModuleList?.map(item => item.id)


      if(item){
        addOrEdit.value = i18n.t('app.administration.settings.series.editSeries')
        newSeries.value.id = item.id
      } else {
        addOrEdit.value = i18n.t('app.administration.settings.series.addSeries')
        newSeries.value.year = false
        newSeries.value.month = false
        newSeries.value.isActive = false
      }
    }

    const submitAddSeries = (series) => {
      Loading.show();
      if(!newSeries.value.executeModuleIds){
        newSeries.value.executeModuleIds = []
      }

      if(addOrEdit.value == 'Add Series'){
        addSeries(series).then(() => {
          toggleDialog.value = false
          newSeries.value = {
            seriesName : null,
            stator: null,
            sequenceStart: null,
            executeModuleIds: []
          }
          reMountTable()
        }).catch((error) => {
          Loading.hide();
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: 'red',
            position: 'top'
          })
        }).finally(() => {
          Loading.hide();
        })
      } else {
        editSeries(series).then(() => {
          toggleDialog.value = false
          newSeries.value = {
            seriesName : null,
            stator: null,
            sequenceStart: null,
            executeModuleIds: []
          }
          reMountTable()
        }).catch((error) => {
          Loading.hide();
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

    const updateIsActive = (row) => {
      toggleIsSeriesActive(row.id).then(() => {

      }).catch((error) => {
        row.isActive = !row.isActive
        Notify.create({
          message: error.response ? error.response.data.errorMessage : error.message,
          color: 'red',
          position: 'top'
        })
      })
    }

    const updateYear = (row) => {
      toggleYear(row.id).then(() => {

      }).catch((error) => {
        row.year = !row.active
        Notify.create({
          message: error.response ? error.response.data.errorMessage : error.message,
          color: 'red',
          position: 'top'
        })
      })
    }

    const updateMonth = (row) => {
      toggleMonth(row.id).then(() => {

      }).catch((error) => {
        row.month = !row.month
        Notify.create({
          message: error.response ? error.response.data.errorMessage : error.message,
          color: 'red',
          position: 'top'
        })
      })
    }

    const confirmDeleteSeries = (item) => {
      Dialog.create({
        title: `Confirm Deleting Series ${item.seriesName}`,
        message: 'Would you like to delete this Series?',
        cancel: true,
        persistent: true,

      }).onOk(() => {
        handleDeleteSeries(item)
      })
    }

    const handleDeleteSeries = (item) => {
      Loading.show();

      deleteSeries({id: item.id}).then(() => {
        reMountTable()
        Notify.create({
          message: i18n.t('app.administration.settings.series.seriesDeleted'),
          color: 'green',
          position: 'top'
        })
      }).catch((error) => {
        Notify.create({
          message: `${error}`,
          color: 'red',
          position: 'top'
        })
      }).finally(() => {
        Loading.hide();
      });
    }


    return{
      handleDeleteSeries,
      confirmDeleteSeries,
      toggleDialog,
      openAddDialog,
      newSeries,
      submitAddSeries,
      addOrEdit,
      updateIsActive,
      updateYear,
      updateMonth,
      tableKey,
      reMountTable,
    }
  },
}
</script>
