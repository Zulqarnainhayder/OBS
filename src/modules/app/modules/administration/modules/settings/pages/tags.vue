<template>
  <q-page padding>
    <obs-table
      :title="$t('app.administration.settings.tags.tagsList')"
      row-key="id"
      action="AppModule/AdministrationModule/SettingsModule/getTags"
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
          name: 'tagName',
          label: $t('app.administration.settings.tags.tagName'),
          field: 'tagName',
          align: 'left',
        },
        {
          sortable: true,
          name: 'tagLabel',
          label: $t('app.administration.settings.tags.tagLabel'),
          align: 'left',
          field: 'tagLabel',
        },
        {
          name: 'detailedCharts',
          label: $t('app.administration.settings.tags.charts'),
          align: 'left',
          field: 'detailedCharts',
        },
        {
          name: 'actions',
          label: $t('app.administration.settings.tags.actions'),
          align: 'left',
          actions: (item) => [
            {
              icon: 'edit',
              label: $t('app.administration.settings.tags.edit'),
              onClick: () => openAddDialog(item) ,
            },
            {
              icon: 'delete',
              color: 'red',
              label: $t('app.administration.settings.tags.delete'),
              onClick: () => confirmDeleteTag(item) ,
            },
          ],
        }
      ]"
    >
      <template #cell-rowIndex="item">
        {{ item.rowIndex + 1 }}
      </template>
      <template #cell-detailedCharts="item">
        <template v-if="item.row.detailedCharts.length">
          <div class="q-pa-md q-gutter-md">
            <q-badge outline color="primary" v-for="(chart, i) in item.row.detailedCharts" :key="i" :label="chart.chartName" />
          </div>
        </template>
        <template v-else>
          <div class="q-pa-md q-gutter-md">
            <q-badge
              outline
              color='primary'
              :label="$t('app.administration.settings.tags.allTags')"
            />
          </div>
        </template>
      </template>
    </obs-table>

    <q-dialog v-model="toggleDialog" persistent>

      <q-card style="min-width: 280px">
        <q-card-section>
          <div class="text-h6">{{$t('app.administration.settings.tags.tagDetails')}}</div>
        </q-card-section>

        <obs-form @obs-submit="submitTag(newTag)">
          <q-card-section class="q-pt-none">
            <obs-text-field
              name="tagName"
              type="text"
              :label="$t('app.administration.settings.tags.tagName')"
              v-model="newTag.tagName"
              rules="required"
            />
            <obs-text-field
              name="tagLabel"
              type="text"
              :label="$t('app.administration.settings.tags.tagLabel')"
              v-model="newTag.tagLabel"
              rules="required"
            />
            <obs-lookup-field
              type="select"
              name="select"
              v-model="newTag.chartIds"
              multiple
              lookup="#api/LookUps/Charts"
              :cached="false"
              :use-input="false"
              use-chips
              :label="$t('app.administration.settings.tags.charts')"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat :label="$t('app.administration.settings.tags.cancel')" v-close-popup />
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
    const { deleteTag, editTag, addTag } = useActions(['deleteTag', 'editTag', 'addTag']);
    const i18n = useI18n();

    const tableKey = ref(Math.random())
    const reMountTable = () => {
      tableKey.value = Math.random()
    }


    const addOrEdit = ref('')

    const newTag = ref({
      tagName : null,
      tagLabel: null,
      chartIds: null
    })

    const confirmDeleteTag = (item) => {
      Dialog.create({
        title: `Confirm Deleting Tag ${item.tagName}`,
        message: 'Would you like to delete this tag?',
        cancel: true,
        persistent: true,

      }).onOk(() => {
        handleDeleteTag(item.id)
      })
    }

    const handleDeleteTag = (id) => {
      Loading.show();
      deleteTag(id).then(() => {
        reMountTable()
        Notify.create({
          message: i18n.t('app.administration.settings.tags.tagDeleted'),
          color: 'green',
          position: 'top'
        })
      }).catch((error) => {
        Notify.create({
          message: `${error.data.errorMessage}`,
          color: 'red',
          position: 'top'
        })
      }).finally(() => {
        Loading.hide();
      });
    }


    const openAddDialog = (item) => {
      toggleDialog.value = true

      newTag.value.tagName = item?.tagName
      newTag.value.tagLabel = item?.tagLabel
      newTag.value.chartIds = item?.detailedCharts?.map(item => item.id)

      if(item){
        addOrEdit.value = i18n.t('app.administration.settings.tags.editTag')
        newTag.value.id = item.id
      } else {
        addOrEdit.value = i18n.t('app.administration.settings.tags.addTag')
      }
    }

    const submitTag = (tag) => {
      Loading.show();
      if(!newTag.value.chartIds){
        newTag.value.chartIds = []
      }
      if(!newTag.value.id){
        addTag(tag).then(() => {
          toggleDialog.value = false
          newTag.value = {
            tagName : null,
            tagLabel: null,
            chartIds: []
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
        editTag(tag).then(() => {
          toggleDialog.value = false
          newTag.value = {
            tagName : null,
            tagLabel: null,
            chartIds: []
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
      handleDeleteTag,
      confirmDeleteTag,
      toggleDialog,
      openAddDialog,
      newTag,
      submitTag,
      addOrEdit,
      tableKey,
      reMountTable,
    }
  },
}
</script>
