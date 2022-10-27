<template>
  <q-card
    class="high-shadow u-page-title-bg q-mb-md"
    :class="{ 'q-mt-md': $q.screen.lt.md, 'small-bg-image': smallBgImage }"
    :style="$q.screen.gt.sm ? `background-image: url(${image})` : ''"
  >
    <q-card-section class="row items-center q-pa-md" v-if="!skeleton">
      <div class="q-mr-md">
        <q-icon color="primary-2" :name="icon" size="80px" />
      </div>
      <div class="q-mt-md">
        <p class="text-h5 q-mb-xs text-weight-medium">{{ title }}</p>
        <p class="text-title text-grey-6">
          {{ subtitle }}
        </p>
      </div>
    </q-card-section>

    <skeleton v-else />

    <slot />
  </q-card>
</template>

<script>
import { defineComponent } from "vue";

import Skeleton from "./skeleton";

export default defineComponent({
  components: { Skeleton },
  props: {
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: "/images/il-1.png",
    },
    icon: {
      type: String,
      default: "svguse:/images/vectors.svg#reservations",
    },
    smallBgImage: {
      type: Boolean,
      default: false,
    },
    skeleton: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss">
.u-page-title-bg {
  background-size: auto 160%;
  background-position-x: 100%;
  background-position-y: 50%;
  background-repeat: no-repeat;

  &.small-bg-image {
    background-size: auto 100%;
    background-position-y: -70px;
  }
}
</style>
