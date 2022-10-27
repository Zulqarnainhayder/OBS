<template>
  <div>
    <p class="no-margin text-subtitle1 text-grey-6">
      {{ label }}
    </p>
    <p
      v-if="!lookup"
      class="no-margin text-h6 text-weight-regular"
      :class="{
        'text-dark-blue-3': !$q.dark.isActive,
        'text-offwhite-blue': $q.dark.isActive,
      }"
    >
      {{ value }}
    </p>
    <p
      v-else
      class="no-margin text-h6 text-weight-regular"
      :class="{
        'text-dark-blue-3': !$q.dark.isActive,
        'text-offwhite-blue': $q.dark.isActive,
      }"
    >
      <obs-lookups  :lookup="lookup" :value="value" />
    </p>

  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: null,
      required: true,
    },
    lookup: {
      type: String,
      default: null,
      required: false,
    },
  },
});
</script>
