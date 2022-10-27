<template>
  <q-form @submit.prevent="onSubmit">
    <slot :actions="{ onSubmit }" />
  </q-form>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useForm } from "vee-validate";

export default defineComponent({
  setup(_props, { emit }) {
    const { handleSubmit } = useForm();

    const onSubmit = handleSubmit((values) => {
      emit("obs-submit", values);
    });

    return {
      onSubmit,
    };
  },
});
</script>
