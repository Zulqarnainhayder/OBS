<template>
  <div class="column justify-center items-center">
    <q-avatar size="140px" class="avatar-picker-cover q-mb-sm">
      <img v-if="previewData" :src="previewData" />
      <img
        v-else
        src="/images/camera.svg"
      />
    </q-avatar>

    <q-btn
      @click="handleButtonClick"
      :disable="disable"
      flat
      :label="label"
      padding="xs"
      class="replace-btn"
    >
    <img class="q-mr-sm" src="/images/upload.svg" /> Replace
  </q-btn>
  </div>
</template>

<script>
import { useObsField } from "src/composables/fields";
import { getCurrentInstance, toRef } from "vue";

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    modelValue: {
      type: String,
      default: null
    },
    preview: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { props } = getCurrentInstance();
    const previewData = toRef(props, "preview");
    const { fieldValue, handleChange } = useObsField();

    function handleButtonClick() {
      const input = document.createElement("input");

      input.setAttribute("accept", "image/*");
      input.setAttribute("type", "file");
      input.onchange = handleInputChange;
      input.click();
    }

    function handleInputChange(event) {
      const [image] = event.target.files;

      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
          const { result } = reader;

          handleChange(result);
          previewData.value = result;
        };
        reader.onerror = (error) => {};
      }
    }

    return {
      fieldValue,
      handleButtonClick,
      previewData
    };
  }
};
</script>

<style lang="scss" scoped>
.avatar-picker-cover {
  img {
    object-fit: cover;
  }
}
</style>
<style scoped>
.replace-btn{
  color: #53B9EA;
}
</style>
