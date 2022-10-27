<template>
  <q-list class="q-mb-sm right-sidebar-app">
    <template v-for="(item, index) in items" :key="index">
      <q-expansion-item
        v-if="item.items"
        :icon="item.icon || 'svguse:/images/vectors.svg#circle'"
        :content-inset-level="insetLevel"
        :to="item.to"
        class="upc-list-item-wrapper"
        v-bind="item"
        :label="$t(item.label)"
      >
        <template
          v-for="(subitem, subitemIndex) in item.items"
          :key="subitemIndex"
        >
          <q-expansion-item
            v-if="subitem.items"
            :icon="subitem.icon || 'svguse:/images/vectors.svg#circle'"
            :label="$t(subitem.label)"
            :content-inset-level="insetLevel"
            :to="subitem.to"
          >
            <ucp-drawer-list :items="subitem.items" />
          </q-expansion-item>

          <q-item v-else clickable v-ripple :to="subitem.to">
            <q-item-section avatar>
              <q-icon name="svguse:/images/vectors.svg#circle" />
            </q-item-section>
            <q-item-section>{{ $t(subitem.label) }}</q-item-section>
          </q-item>
        </template>
      </q-expansion-item>

      <q-item v-else :to="item.to" clickable @click="changeItem(item)" v-ripple>
        <q-item-section class="q-pr-xs" avatar>
          <img :src="item.icon" />
        </q-item-section>
        <q-item-section>{{ $t(item.label) }}</q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
import { defineComponent } from "vue";

const INSET_LEVEL = 0.5;

export default defineComponent({
  name: "ucp-drawer-list",
  props: {
    label: {
      type: String,
      default: null,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const changeItem = (data) => {
      
    }
    return {
      insetLevel: INSET_LEVEL,
      changeItem
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep .ucp-list-item {
  .q-item__section--avatar {
    min-width: auto;
    padding-right: 0px;
  }
}

.upc-list-item-wrapper {
  ::v-deep .q-expansion-item__content:before {
    content: "";
    border-right: 1px dotted map-get($colors, dark-blue-2);
    position: absolute;
    top: 0;
    bottom: 0;
  }
}
</style>

<style>
.right-sidebar-app .q-router-link--active {
  background-color: #2b4c6b;
  margin-right: 3px;
  border-radius: 0 25px 25px 0;
}
.right-sidebar-app .q-router-link--active .q-item__section--main {
  font-weight: 800;
  font-size: 18px;
  color: #FFFFFF;
  line-height: 27px;
}
.right-sidebar-app .q-item__section--avatar span svg{
  color: #335471;
}
.right-sidebar-app .q-item__section--main {
  font-weight: 800;
  font-size: 20px;
  color: #335471;
  line-height: 45px;
}
.right-sidebar-app .body.desktop .q-hoverable:hover > .q-focus-helper{
  background-color: #335471;
}
.right-sidebar-app .q-item__section--avatar{
  min-width: 40px;
}
</style>
