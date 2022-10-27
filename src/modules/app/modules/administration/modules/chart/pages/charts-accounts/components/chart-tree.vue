<template>
  <q-tree
    v-if="nodes.length > 0 && layout === 'tree'"
    label-key="name"
    node-key="id"
    :nodes="nodes"
    default-expand-all
    children-key="accounts"
    tick-strategy="strict"
    v-model:ticked="ticked"
    :filter="filter"
    @update:ticked="handleTickedItemsChange"
  >
    <template v-slot:default-header="prop">
      {{ prop.node.no }} - {{ prop.node.name }}
      <q-chip
        v-if="prop.node.creationTypeName === 'Group'"
        size="xs"
        color="blue"
        text-color="white"
        >Group</q-chip
      >
      <q-chip v-else size="xs" color="green" text-color="white">Account</q-chip>

      <q-menu touch-position context-menu>
        <q-list dense class="q-my-sm">
          <q-item
            clickable
            v-close-popup
            @click="() => $emit('duplicate-item', prop.node)"
          >
            {{ $t("app.administration.charts.main.duplicate") }}
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="() => $emit('copy-item', prop.node)"
          >
            {{ $t("app.administration.charts.main.copy") }}
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="() => $emit('cut-item', prop.node)"
          >
            {{ $t("app.administration.charts.main.cut") }}
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="() => $emit('paste-item', prop.node)"
            :disable="clipboard.id.length < 1"
          >
            {{ $t("app.administration.charts.main.paste") }}
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="() => $emit('delete-item', prop.node)"
          >
            {{ $t("app.administration.charts.main.delete") }}
          </q-item>

          <q-item
            clickable
            v-close-popup
            @click="() => handleSelectAllItem(prop.node)"
          >
            {{ $t("app.administration.charts.main.selectAll") }}
          </q-item>
        </q-list>
      </q-menu>
    </template>
  </q-tree>

  <obs-table
    v-else-if="layout === 'list'"
    row-key="id"
    :value="nodes"
    hide-header
    @obs-row-click="handleRowSelect"
    :columns="[
      {
        name: 'level',
        label: 'Level',
        field: 'level',
        align: 'left',
      },
      {
        name: 'name',
        label: 'Account',
        field: 'name',
        align: 'left',
        format: (_, item) => `${item.no} - ${item.name}`,
      },
      {
        name: 'type',
        label: 'Type',
        field: 'creationTypeName',
        align: 'left',
      },
      {
        name: 'posting',
        label: 'Posting',
        field: 'postingtypeName',
        align: 'left',
      },
      {
        name: 'typical',
        label: 'Typical',
        field: 'typicalName',
        align: 'left',
      },
      {
        name: 'category',
        label: 'Category',
        field: 'accTypeName',
        align: 'left',
      },
      {
        name: 'active',
        label: $t('app.administration.settings.languages.active'),
        align: 'left',
        field: 'isActive',
      },
    ]"
  >
    <template #cell-active="item">
      <q-toggle
        v-model="item.row.isActive"
        checked-icon="check"
        color="green"
        unchecked-icon="clear"
        @click="handleIsActive(item)"
      />
    </template>
  </obs-table>

  <div v-else class="row">
    <div class="col col-3 q-ma-md" v-for="item in nodes" :key="item.id">
      <q-card
        class="cursor-pointer grid-card"
        flat
        bordered
        @click="() => handleRowSelect(item)"
      >
        <div class="text-right">
          <q-btn
            text-color="grey-6"
            color="grey-7"
            class="absolute fixed-top-right"
            size="1.3em"
            round
            flat
            icon="more_vert"
          >
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Remove Card</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Send Feedback</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Share</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="q-pa-md">
          <q-card-section>
            <div class="text-OBS">{{ item.name }}</div>
            <div class="text-OBS">{{ item.creationTypeName }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-OBS">
            - Postingtype: {{ item.postingtypeName }} <br />
            - Typical: {{ item.typicalName }} <br />
            - Type: {{ item.accTypeName }}
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { Router } from "src/router";
import { computed, ref, toRefs, watch } from "vue";

export default {
  emits: [
    "cut-item",
    "copy-item",
    "duplicate-item",
    "paste-item",
    "delete-item",
    "select-items",
    "toggle-active",
  ],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    clipboard: {
      type: Object,
      default: () => ({ id: [] }),
    },
    filter: {
      type: String,
      default: "",
    },
    layout: {
      type: String,
      default: "tree",
    },
    tickedList: {
      type: [],
      default: [],
    },
  },
  setup(props, { emit }) {
    const ticked = ref([]);

    // Helpers
    const generateIds = (root) => {
      const selected = [root.id];

      const getSelectedNodeIds = (item) => {
        if (item.accounts && item.accounts.length > 0) {
          item.accounts.forEach((subItem) => {
            selected.push(subItem.id);
            getSelectedNodeIds(subItem);
          });
        }
      };

      getSelectedNodeIds(root);

      return selected;
    };

    // Methods
    const handleTickedItemsChange = (items) => {
      emit("select-items", items);
    };
    const handleSelectAllItem = (item) => {
      const ids = generateIds(item);
      ticked.value = ids;
      handleTickedItemsChange(ids);
    };
    const generateList = () => {
      const list = [];

      const generateListFromItem = (listItem) => {
        list.push(listItem);
        if (listItem.accounts && listItem.accounts.length > 0) {
          listItem.accounts.forEach((item) => {
            generateListFromItem(item);
          });
        }
      };

      props.data.forEach(generateListFromItem);

      return list;
    };
    const generateAccountsList = () => {
      const list = [];

      const generateListFromItem = (listItem) => {
        if (listItem.creationTypeName === "Account") {
          list.push(listItem);
        }

        if (listItem.accounts && listItem.accounts.length > 0) {
          listItem.accounts.forEach((item) => {
            generateListFromItem(item);
          });
        }
      };

      props.data.forEach(generateListFromItem);

      return list;
    };
    const handleIsActive = (item) => {
      emit("toggle-active", item);
    };
    const handleRowSelect = ({ id, creationTypeName }) => {
      const isGroup = creationTypeName === "Group";
      const route = `/app/administration/charts/charts-accounts/edit-${
        isGroup ? "group" : "account"
      }/${id}`;
      Router.push(route);
    };

    // Computed
    const nodes = computed(() => {
      if (props.layout === "list") {
        return generateList().map(({ accounts, ...rest }) => rest);
      }

      if (props.layout === "grid") {
        return generateAccountsList().map(({ accounts, ...rest }) => rest);
      }

      return props.data;
    });

    // watch(
    //   () => props.data,
    //   () => {
    //     ticked.value = [];
    //   }
    // );
    watch(
      () => props.tickedList,
      () => {
        ticked.value = props.tickedList;
      }
    );
    return {
      nodes,
      ticked,
      handleSelectAllItem,
      handleTickedItemsChange,
      handleIsActive,
      handleRowSelect,
    };
  },
};
</script>
<style>
.grid-card {
  border: 2px solid #e6e8ec;
  border-radius: 20px;
}

.text-OBS {
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #606060;
}
</style>
