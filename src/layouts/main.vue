<template>
  <router-view v-slot="{ Component }">
    <transition
      name="custom-classes-transition"
      enter-active-class="animate__animated animate__fadeIn animate__faster animate__delay-500ms"
      leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>
<script>
import { defineComponent } from "vue";
import { useActions } from "vuex-composition-helpers";

export default defineComponent({
  setup() {
    const { applySettings } = useActions(["applySettings"]);

    applySettings();
  },
});
</script>
