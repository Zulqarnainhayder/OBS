<template>
  <q-layout
    view="hHh lpR fFf"
    :class="{
      'bg-dark-blue-4': $q.dark.isActive,
      'bg-offwhite-blue': !$q.dark.isActive,
    }"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";

const { useActions, useState } = createNamespacedHelpers("AuthModule");
const { useState: useProfileState } = createNamespacedHelpers(
  "AppModule/ProfileModule"
);

export default defineComponent({
  setup() {
    const { logout } = useActions(["logout"]);
    const { token } = useState(["token"]);
    const { profile } = useProfileState(["profile"]);

    onMounted(() => {
      if (!token || !profile) {
        logout();
      }
    });
  },
});
</script>
