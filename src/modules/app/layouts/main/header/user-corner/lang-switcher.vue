<template>
  <q-btn
    icon="language"
    unelevated
    :label="language"
    color="purple-1"
    text-color="black"
  >
  <q-menu>
    <obs-text-field
      name="searchlang"
      :label="$t('app.search')"
      v-model="searchValue"
      @update:model-value="handleSearch"
    />
    <q-list style="min-width: 100px">
      <q-item v-for="lang in filterdList" :key="lang.id" clickable v-close-popup>
        <q-item-section @click="() => handleLang(lang)">{{lang.language}}</q-item-section>
      </q-item>
    </q-list>
  </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent, onMounted, ref, shallowRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useState as useGlobalState, useActions as useGlobalActions, createNamespacedHelpers } from 'vuex-composition-helpers';

const { useActions } = createNamespacedHelpers("AppModule/AdministrationModule/SettingsModule");
const { useState } = createNamespacedHelpers("AppModule/AdministrationModule/SettingsModule");

export default defineComponent({
  setup() {
    const { applyLang } = useGlobalActions(["applyLang"]);
    const { chooseLangList } = useActions([ "chooseLangList"]);
    const { langList } = useState([ "langList"]);
    const { lang } = useGlobalState(['lang']);
    const i18n = useI18n();

    const languageList = shallowRef()
    const filterdList = shallowRef()
    const language = ref('')
    const searchValue = ref('')

    onMounted(() => {
      chooseLangList().then(() => handleList())
    })

    const handleList = () => {
        languageList.value = langList.value
        filterdList.value = languageList.value
        const languageObj = languageList.value.find(({isoCode}) => isoCode == lang.value)
        if(!languageObj) {
          language.value = 'English'
        } else {
          language.value = languageObj.language
        }
    }

    watch(() => langList.value, ()=> handleList())

    const handleLang = (lang) => {
      applyLang(lang.isoCode == 'en' ? 'en-US' : lang.isoCode)
      language.value = lang.language
    }

    const handleSearch = () => {
      filterdList.value = languageList.value.filter(lang => lang.language.toLowerCase().includes(searchValue.value.trim().toLowerCase()))
    }

    return {
      applyLang,
      languageList,
      filterdList,
      handleLang,
      language,
      searchValue,
      handleSearch
    };
  },
});
</script>
