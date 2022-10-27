<template>
  <q-btn
    :icon="!dark ? 'dark_mode' : 'light_mode'"
    round
    flat
    @click="applyDark(!dark)"
  />
</template>

<script>
import { defineComponent } from "vue";
import { useActions, useState } from "vuex-composition-helpers";

export default defineComponent({
  setup() {
    const { applyDark } = useActions(["applyDark"]);
    const { dark } = useState(["dark"]);

    return {
      dark,
      applyDark,
    };
  },
});
</script>
