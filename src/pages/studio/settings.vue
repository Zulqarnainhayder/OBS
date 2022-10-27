<template>
  <q-page padding>
    <p class="text-h6">{{ $t("global.languages") }}</p>
    <p class="text-body2">{{ $t("global.languageDesc") }}</p>

    <q-btn-group push>
      <q-btn
        push
        :label="$t('global.arabic')"
        @click="applyLang('ar')"
        :disable="$i18n.locale === 'ar'"
      />
      <q-btn
        push
        :label="$t('global.english')"
        @click="applyLang('en-US')"
        :disable="$i18n.locale !== 'ar'"
      />
    </q-btn-group>

    <q-separator spaced="xl" />

    <p class="text-h6">{{ $t("global.darkMode") }}</p>
    <p class="text-body2">{{ $t("global.darkModeDesc") }}</p>

    <q-btn-group push>
      <q-btn
        push
        :label="$t('global.dark')"
        @click="applyDark(true)"
        :disable="dark"
      />
      <q-btn
        push
        :label="$t('global.light')"
        @click="applyDark(false)"
        :disable="!dark"
      />
    </q-btn-group>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";
import { useActions, useState } from "vuex-composition-helpers";

export default defineComponent({
  setup() {
    const { applyLang, applyDark } = useActions(["applyLang", "applyDark"]);
    const { dark } = useState(["dark"]);

    return {
      dark,
      applyLang,
      applyDark,
    };
  },
});
</script>
