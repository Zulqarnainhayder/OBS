import { ref, computed } from "vue";
import { copyToClipboard } from "quasar";

export const useClipboardCopy = (value) => {
  const isCopied = ref(false);

  const click = () => {
    copyToClipboard(value).then(() => {
      isCopied.value = true;

      setTimeout(() => {
        isCopied.value = false;
      }, 1000);
    });
  };

  return { click, isCopied };
};
