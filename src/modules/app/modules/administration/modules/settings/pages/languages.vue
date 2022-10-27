<template>
  <q-page padding>
    <obs-table
      :title="$t('app.administration.settings.languages.languages')"
      row-key="id"
      action="AppModule/AdministrationModule/SettingsModule/getLanguages"
      :columns="[
        {
          name: 'rowIndex',
          label: '#',
          field:'rowIndex',
          align: 'left'
        },
        {
          sortable: true,
          name: 'languagesName',
          label: $t('app.administration.settings.languages.languages'),
          field: 'language',
          align: 'left',
        },
        {
          name: 'isoCode',
          label: $t('app.administration.settings.languages.isoCode'),
          align: 'left',
          field: 'isoCode',
        },
        {
          name: 'direction',
          label: $t('app.administration.settings.languages.direction'),
          align: 'left',
          field: 'rtl',
        },
        {
          name: 'translatable',
          label: $t('app.administration.settings.languages.translatable'),
          align: 'left',
          field: 'translatable',
        },
        {
          sortable: true,
          name: 'active',
          label: $t('app.administration.settings.languages.active'),
          align: 'left',
          field: 'active',
        },
      ]"
    >
      <template #cell-rowIndex="item">
        {{ item.rowIndex + 1 }}
      </template>
      <template #cell-direction="item">
        {{ item.row.rtl ? $t('app.administration.settings.languages.rtl') : $t('app.administration.settings.languages.ltr')}}
      </template>
      <template #cell-translatable="item">
        <q-toggle
          v-model="item.row.translatable"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          :disable="!item.row.active"
          @update:model-value="toggleIsTranslatable(item.row)"
        />
      </template>
      <template #cell-active="item">
        <q-toggle
          v-model="item.row.active"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          @click="toggleIsActive(item)"
        />
      </template>
    </obs-table>
  </q-page>
</template>
<script>
import { Loading, Notify } from 'quasar';
import { useI18n } from 'vue-i18n';
import { createNamespacedHelpers } from 'vuex-composition-helpers';

const { useActions } = createNamespacedHelpers("AppModule/AdministrationModule/SettingsModule");

export default {
  setup() {
    const { toggleIsLanguageActive, updateTranslatable } = useActions(['toggleIsLanguageActive', 'updateTranslatable']);
    const i18n = useI18n();

    const toggleIsTranslatable = (row) => {
      updateTranslatable({id: row.id}).then(() => {

      }).catch((error) => {
        row.translatable = !row.translatable;
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: 'red',
            position: 'top'
        })
      })
    }

    const toggleIsActive = (item) => {
      // don't toggle active if it is the app language
      if( i18n.locale.value == item.row.isoCode || ( i18n.locale.value == 'en-US' && item.row.isoCode == 'en')){
          item.row.active = !item.row.active
          Notify.create({
            message: i18n.t('app.administration.settings.languages.errActiveMsg'),
            color: 'red',
            position: 'top'
          })
      } else {
        toggleIsLanguageActive({id: item.row.id})
        .catch((error) => {
          item.row.active = !item.row.active
          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: 'red',
            position: 'top'
          })
        })
      }
    }

    return{
      toggleIsTranslatable,
      toggleIsActive,
    }
  },
}
</script>
