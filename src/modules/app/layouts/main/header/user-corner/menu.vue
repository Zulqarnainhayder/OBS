<template>
  <q-btn rounded flat padding="0">
      <img src="/images/user-dp.svg" />

    <q-menu class="high-shadow upc-user-area-menu rounded-borders" :offset="[0, 9]">
      <div class="q-px-md q-pb-none q-pt-md q-mb-md">
        <div class="q-mr-md self-center text-center">
          <q-avatar size="50px" text-color="white">
            <img src="/images/user-dp.svg" />
          </q-avatar>
        </div>
      </div>
      <div class="self-center text-center">
        <p class="text-subtitle2 no-margin">
          {{ profile.firstName }} {{ profile.lastName }}
        </p>
        <p class="text-caption text-grey-6">{{ profile.email }}</p>
      </div>
      <q-separator  class="q-mt-lg" />
      <div class="q-pa-xs">
        <q-list separator>
          <q-item clickable v-close-popup to="/app/profile">
            <q-item-section avatar>
              <q-icon name="svguse:/images/vectors.svg#cog" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t("app.profile.update") }}</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="() => logout()">
            <q-item-section avatar>
              <q-icon name="svguse:/images/vectors.svg#logout" size="20px" />
            </q-item-section>
            <q-item-section>{{ $t("app.logout") }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";

const { useActions } = createNamespacedHelpers("AuthModule");
const { useState: useProfileState } = createNamespacedHelpers(
  "AppModule/ProfileModule"
);

export default defineComponent({
  setup() {
    const { logout } = useActions(["logout"]);
    const { profile } = useProfileState(["profile"]);

    return {
      profile,
      logout,
    };
  },
});
</script>
