<template>
  <q-btn
    v-if="!isCopied"
    flat
    round
    icon="content_copy"
    size="xs"
    @click="click"
    v-bind="$props"
  >
    <q-tooltip>
      {{ $t("global.copy") }}
    </q-tooltip>
  </q-btn>

  <q-badge v-else color="positive">{{ $t("global.copied") }}</q-badge>
</template>

<script>
import { defineComponent } from "vue";

import { useClipboardCopy } from "src/composables/clipboard-copy";

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    const { click, isCopied } = useClipboardCopy(props.value);

    return {
      click,
      isCopied,
    };
  },
});
</script>
