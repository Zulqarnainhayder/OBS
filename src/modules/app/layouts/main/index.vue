<template>
  <div>
    <q-layout
      v-if="token && profile"
      view="hHh LpR lFr"
      :class="{
        'bg-dark-blue-4': $q.dark.isActive,
        'bg-offwhite-blue': !$q.dark.isActive,
      }"
    >
      <ucp-header :is-mini="isMini" @toggleDrawer="handleToggleDrawer" />

      <ucp-drawer
        :is-mini="isMini"
        :is-active="isActive"
        @toggleDrawer="handleToggleDrawer"
        @updateDrawerIsActive="handleUpdateDrawerIsActive"
      />

      <q-page-container>
        <router-view />
      </q-page-container>

      <UCPIcons
        :is-mini="isMini"
        :is-active="isActive"
        @toggleDrawer="handleToggleDrawer"
        @updateDrawerIsActive="handleUpdateDrawerIsActive"
      />
    </q-layout>

    <div
      class="column items-center justify-center fullscreen q-gutter-y-xl"
      v-else
    >
      <q-linear-progress
        indeterminate
        size="sm"
        :color="$q.dark.isActive ? 'primary-2' : 'primary'"
      />
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, onMounted, ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";

import UcpHeader from "./header";
import UcpDrawer from "./drawer";
import UCPIcons from "./icons-drawer.vue";

const { useActions, useState } = createNamespacedHelpers("AuthModule");
const { useState: useProfileState } = createNamespacedHelpers(
  "AppModule/ProfileModule"
);

export default defineComponent({
  components: {
    UcpHeader,
    UcpDrawer,
    UCPIcons,
  },
  setup() {
    const $q = useQuasar();
    const { checkAuthState } = useActions(["checkAuthState"]);
    const { token } = useState(["token"]);
    const { profile } = useProfileState(["profile"]);
    const isMini = ref(false);
    const isActive = ref($q.screen.gt.sm);

    onMounted(() => {
      checkAuthState();
    });

    return {
      token,
      profile,
      isMini,
      isActive,
      handleToggleDrawer() {
        if ($q.screen.gt.md) {
          isMini.value = !isMini.value;
        } else {
          isActive.value = !isActive.value;
        }
      },
      handleUpdateDrawerIsActive(value) {
        if ($q.screen.gt.md) {
          isMini.value = value;
        } else {
          isActive.value = value;
        }
      },
    };
  },
});
</script>
