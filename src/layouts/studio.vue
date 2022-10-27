<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerToggle"
        />

        <q-toolbar-title>
          {{ $t("global.appTitle") }}
        </q-toolbar-title>

        <div>App version 1.1</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="isDrawerOpened" show-if-above bordered>
      <q-list>
        <q-item-label header>
          {{ $t("global.docs") }}
        </q-item-label>

        <q-item
          clickable
          v-for="route in routes"
          :key="route.title"
          :to="route.to"
        >
          <q-item-section v-if="route.icon" avatar>
            <q-icon :name="route.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ $t(route.title) }}</q-item-label>
            <q-item-label caption>
              {{ $t(route.caption) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const isDrawerOpened = ref(false);

    const routes = [
      {
        title: "global.settings",
        caption: "global.settingsDesc",
        icon: "settings",
        to: "/studio/settings",
      },
      {
        title: "global.forms",
        caption: "global.formsDesc",
        icon: "description",
        to: "/studio/forms",
      },
      {
        title: "global.components",
        caption: "global.componentsLinkDesc",
        icon: "code",
        to: "/studio/components",
      },
      {
        title: "global.helpers",
        caption: "global.helpersLinkDesc",
        icon: "chat",
      },
      {
        title: "global.demos",
        caption: "global.demosLinkDesc",
        icon: "record_voice_over",
      },
    ];

    return {
      routes,
      isDrawerOpened,
      drawerToggle() {
        isDrawerOpened.value = !isDrawerOpened.value;
      },
    };
  },
});
</script>
