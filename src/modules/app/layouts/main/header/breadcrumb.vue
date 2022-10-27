<template>
  <div class="column">
    <q-breadcrumbs class="text-grey q-mt-xs">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" />
      </template>

      <q-breadcrumbs-el
        v-for="route in routes"
        :key="route.path"
        :label="$t(route.meta.label)"
        :to="route.path"
        :icon="route.meta.icon"
        :exact-active-class="$q.dark.isActive ? 'text-white' : 'text-black'"
      />
    </q-breadcrumbs>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const routes = computed(() =>
      route.matched
        .filter((r) => r.path !== "/" && !!r.meta.label)
        .map((r) => {
          let path = r.path;

          if (r.path.includes(":id")) {
            path = r.path.replace(":id", route.params.id);
          }

          return {
            ...r,
            path,
          };
        })
    );

    return {
      routes,
    };
  },
});
</script>
