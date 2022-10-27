<template>
  <q-page padding>
    <q-card class="my-card">
      <div class="bg-white shadow-1 q-pa-lg q-mb-md">
        <div class="row q-mt-lg items-center user-select">
          <div class="col-md-5"><h3 class="no-margin">Chart Of Accounts</h3></div>
          <div class="col-md-7">
            <q-input
              outlined
              debounce="500"
              v-model="search"
              class="user-search"
              placeholder="Search"
              style="margin-right: 1.5rem"
            />
          </div>
        </div>
        <!-- Actions -->
        <div class="row q-mt-lg items-center user-select">
          <!-- <div class="q-gutter-sm col-md-6">
            <obs-form-action
              to="user-details"
              :label="$t('app.administration.users.users.create')"
            />
            <obs-form-action
              to="user-details"
              outline
              :label="$t('app.administration.users.users.edit')"
            />
            <obs-form-action
              outline
              :label="$t('app.administration.users.users.duplicate')"
            />

            <obs-form-action
              outline
              :label="$t('app.administration.users.users.delete')"
            />

            <obs-form-action
              outline
              :label="$t('app.administration.users.users.export')"
            />

            <obs-form-action
              outline
              :label="$t('app.administration.charts.main.import')"
            />
          </div> -->
          <div class="col-md-4">
            <q-select
              outlined
              multiple
              :options="filters"
              label="Filters"
              style="margin-right: 1.5rem"
            />
          </div>
          <div class="col-md-4">
            <q-select
              outlined
              multiple
              :options="content"
              label="Content"
              style="margin-right: 1.5rem"
            />
          </div>
          <div class="col-md-4">
            <q-select
              outlined
              multiple
              :options="companies"
              label="Company"
              style="margin-right: 1.5rem"
            />
          </div>
        </div>
      </div>
    </q-card>
    <q-card class="my-card">
      <div class="q-pa-lg">
        <div class="row">
          <div class="col-6 q-mb-md">
            <q-btn outline class="btn-component-duplicate q-mr-md" padding="10px 25px">
              <img src="/images/duplicate.svg" class="q-mr-sm" />
              Edit
            </q-btn>
            <q-btn outline class="btn-component-duplicate" padding="10px 25px">
              <img src="/images/duplicate.svg" class="q-mr-sm" />
              Duplicate
            </q-btn>
          </div>
          <div class="col-4 q-mb-md q-px-lg">
          </div>
          <div class="col-2 q-mb-md">
            <!-- Add Button -->
            <q-btn
              label="Create"
              class="q-ml-md btn-2 btn-component"
              padding="10px 60px"
              unelevated
              :to="to"
              @click="$attrs.onAdd"
              no-caps
            />
            <q-btn
              text-color="grey-6"
              color="grey-7"
              size="1.3em"
              round
              flat
              class="float-right"
              icon="more_vert"
            >
              <q-menu
                fit
                auto-close
                transition-show="scale"
                transition-hide="scale"
              >
                <q-list style="min-width: 200px">
                  <q-item clickable>
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Export</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Import</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <div class="border-chart q-pa-md q-mr-lg full-height">
              <chart-tree
                :data="tree"
                :layout="layout"
                :clipboard="clipboard"
                :filter="search"
                :tickedList="ticked"
                @duplicate-item="handleDuplicateItem"
                @copy-item="handleCopyItem"
                @cut-item="handleCutItem"
                @paste-item="handlePasteItem"
                @delete-item="handleDeleteItem"
                @select-items="handleSelectItems"
                @toggle-active="handleToggleItemActive"
              />
            </div>
          </div>

          <div class="col-2">
            <div class="row q-col-gutter-sm q-mb-md">
              <div
                class="col-4 custom-style-tabs"
                v-for="({ icon, id }, i) in layouts"
                :key="i"
              >
                <q-btn
                  class="q-pa-sm"
                  :outline="id == layout"
                  @click="layout = id"
                >
                  <img :src="icon" />
                </q-btn>
              </div>
            </div>
            <q-select
              outlined
              multiple
              :options="filters"
              label="Level"
              class="q-mb-md"
            />
            <q-btn
              v-for="{ name, id } in groups"
              :key="id"
              flat
              @click="group = id"
              style="width: 100%"
              class="q-mb-md q-pa-lg list-buttons"
              color="white"
              text-color="black"
              label="Standard"
              >{{ name }}</q-btn
            >
            <!-- <q-list bordered separator v-if="groups">
              <q-item
                v-for="{ name, id } in groups"
                @click="group = id"
                :key="id"
                clickable
                v-ripple
                :active="id === group"
                active-class="bg-grey-3 text-black"
              >
                <q-item-section class="q-py-md">{{ name }}</q-item-section>
              </q-item>
            </q-list> -->
          </div>
        </div>
      </div>
    </q-card>
    <!-- <div class="bg-white shadow-1 q-pa-lg q-mb-md">
      <h3>Need to discuss this</h3>
      <div class="row items-start">
        <obs-text-field
          name="search"
          :label="$t('app.administration.charts.main.search')"
          class="col q-mr-md"
          v-model:model-value="search"
        />

        <q-btn
          round
          flat
          color="primary"
          icon="tune"
          class="q-mt-sm"
          @click="toggleDialog"
        />

        <q-dialog @hide="onCancel" v-model="dialog">
          <q-card style="min-width: 280px">
            <q-card-section>
              <div class="text-h6">Choose filters from below</div>
            </q-card-section>

            <obs-form @obs-submit="onSubmit">
              <q-card-section class="q-pt-none q-gutter-y-md">
                <obs-lookup-field
                  v-model="treeFilters.level"
                  name="level"
                  :label="$t('app.administration.charts.main.level')"
                  lookup="$Levels"
                />

                <div>
                  <div class="text-body1">
                    {{ $t("app.administration.charts.main.accountsType") }}
                  </div>
                  <obs-lookup-field
                    v-model="treeFilters.filters.accType"
                    name="accType"
                    type="checkbox"
                    lookup="$AccountsType"
                    multiple
                  />
                </div>

                <div>
                  <div class="text-body1">
                    {{ $t("app.administration.charts.main.Postingtypes") }}
                  </div>
                  <obs-lookup-field
                    v-model="treeFilters.filters.postingtype"
                    name="postingtype"
                    type="checkbox"
                    lookup="$Postingtypes"
                  />
                </div>

                <div>
                  <div class="text-body1">
                    {{ $t("app.administration.charts.main.Typical") }}
                  </div>
                  <obs-lookup-field
                    v-model="treeFilters.filters.typical"
                    name="typical"
                    type="checkbox"
                    :label="$t('app.administration.charts.main.Typical')"
                    lookup="$Typical"
                  />
                </div>

                <div>
                  <div class="text-body1">
                    {{ $t("app.administration.charts.main.AccCategory") }}
                  </div>
                  <obs-lookup-field
                    v-model="treeFilters.filters.accCategory"
                    name="accCategory"
                    type="checkbox"
                    :label="$t('app.administration.charts.main.AccCategory')"
                    lookup="$AccCategory"
                  />
                </div>

                <div>
                  <div class="text-body1">
                    {{ $t("app.administration.charts.main.content") }}
                  </div>
                  <obs-lookup-field
                    v-model="treeFilters.creationType"
                    name="creationType"
                    type="radio"
                    :label="$t('app.administration.charts.main.content')"
                    lookup="$AccGruopCharts"
                  />
                </div>
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Reset" v-close-popup @click="handleReset" />
                <q-btn flat label="Save" v-close-popup type="submit" />
              </q-card-actions>
            </obs-form>
          </q-card>
        </q-dialog>
      </div>

      <div class="row reverse-wrap q-gutter-x-sm">
        <obs-form-action
          :to="
            ticked?.length
              ? 'charts-accounts/details/' + ticked[0]
              : 'charts-accounts/details'
          "
          :label="$t('app.administration.charts.main.create')"
        />

        <obs-form-action
          outline
          :label="$t('app.administration.charts.main.edit')"
          @click="handleEditItem"
          :disable="ticked.length !== 1"
        />

        <obs-form-action
          outline
          :label="$t('app.administration.charts.main.duplicate')"
          @click="() => handleDuplicateItem({ id: ticked[0] })"
          :disable="ticked.length !== 1"
        />

        <obs-form-action
          outline
          :label="$t('app.administration.charts.main.delete')"
          @click="() => handleDeleteItem({})"
          :disable="ticked.length < 1"
        />

        <obs-form-action
          outline
          :label="$t('app.administration.charts.main.export')"
          @click="handleExport"
        />

        <obs-form-action
          outline
          :label="$t('app.administration.charts.main.downloadForm')"
          icon="download"
          @click="handleDownloadForm"
        />

        <div style="width: 230px">
          <q-file
            clearable
            class="full-width"
            dense
            v-model="importedFile"
            outlined
            :label="$t('app.administration.charts.main.import')"
            @update:model-value="handleImport"
            accept=".xlsx, .csv"
          >
            <template v-slot:prepend>
              <q-icon name="upload" />
            </template>
          </q-file>
        </div>
      </div>
    </div> -->
    <obs-dialog-page
      ref="errorsDialog"
      @treeUpdate="handleRefresh"
    ></obs-dialog-page>
  </q-page>
</template>

<script>
import chartTree from "../components/chart-tree.vue";
import { ref, shallowRef, reactive } from "@vue/reactivity";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { Loading, Notify } from "quasar";
import { useDialog, useEntity } from "src/composables/hooks";
import { Router } from "src/router";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/MainPage"
);
const { useActions: useChartsActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule"
);

export default {
  components: {
    chartTree,
  },
  setup() {
    // Store
    const { editGroup, editAccount } = useChartsActions([
      "editGroup",
      "editAccount",
    ]);
    const {
      filter,
      importTree,
      exportTree,
      getGroups,
      getTree,
      pastItem,
      deleteItem,
      duplicateItem,
      checkErrors,
    } = useActions([
      "filter",
      "importTree",
      "exportTree",
      "getGroups",
      "getTree",
      "pastItem",
      "deleteItem",
      "duplicateItem",
      "checkErrors",
    ]);
    const errorsDialog = ref();
    const search = ref("");
    const form = ref({});
    const { dialog, toggleDialog } = useDialog();

    const group = ref();
    const groupsEntity = useEntity({ request: getGroups });
    const groups = computed(() => groupsEntity.data.value?.data?.value);

    const treeFilters = ref({
      mainGroupId: group.value,
      filters: {
        accType: [],
        typical: [],
        postingtype: [],
        accCategory: [],
      },
      creationType: 0,
      isActive: true,
      level: null,
      typeView: 1,
    });
    const treeEntity = useEntity({ request: () => getTree(treeFilters.value) });
    const isFilteredMode = ref(false);
    const filteredTree = ref([]);
    const tree = computed(() => {
      if (isFilteredMode.value) {
        return filteredTree.value;
      }

      return treeEntity.data.value?.data?.value;
    });

    const layout = ref("grid");
    const layouts = [
      {
        icon: "/images/grid.svg",
        id: "grid",
      },
      {
        icon: "/images/list.svg",
        id: "list",
      },
      {
        icon: "/images/tree.svg",
        id: "tree",
      },
    ];

    const ticked = ref([]);
    const clipboard = reactive({ id: [] });

    const importedFile = ref(null);

    // Methods
    const getItemsFlat = (items) => {
      const list = [];

      const generateListFromItem = (listItem) => {
        list.push(listItem);
        if (listItem.accounts && listItem.accounts.length > 0) {
          listItem.accounts.forEach((item) => {
            generateListFromItem(item);
          });
        }
      };

      items.forEach(generateListFromItem);

      return list;
    };
    const onCancel = () => {
      //
    };
    const handleRefresh = () => {
      treeEntity.refresh();
    };
    const handleDispatchAction = async (action, payload, handelType = null) => {
      try {
        // Loading
        Loading.show();

        // Call api
        await action(payload);

        // Refresh tree
        handleRefresh();
      } catch (error) {
        if (handelType === "import") {
          errorsDialog.value.dialogRows(error.response.data);
          errorsDialog.value.dialogShowValue = true;
          errorsDialog.value.groupId = group.value;
        }
      } finally {
        // Loading
        Loading.hide();
        ticked.value = [];
        clipboard.id = [];
      }
    };

    let tickedElemnts = [];
    const extractTickedFromData = (data) => {
      data.forEach((record) => {
        tickedElemnts.push(
          record.creationType === 0 ? record.mainGroupId : record.id
        );

        if (record.accounts && record.accounts.length > 0)
          extractTickedFromData(record.accounts);
      });
      ticked.value = [...tickedElemnts];
    };
    const handelCompyCutSelection = async (id) => {
      let oldMainId = treeFilters.value.mainGroupId;
      treeFilters.value.mainGroupId = id;
      const { data } = await getTree(treeFilters.value);
      tickedElemnts = [];
      extractTickedFromData(data.value);
      treeFilters.value.mainGroupId = oldMainId;
    };

    const handleCopyItem = ({ id }) => {
      // Set Clipboard
      clipboard.id = [...new Set([...clipboard.id, id])];
      clipboard.copy = true;

      handelCompyCutSelection(id);
    };
    const handleCutItem = ({ id }) => {
      // Set Clipboard
      clipboard.id = [...new Set([...clipboard.id, id])];
      clipboard.copy = false;

      handelCompyCutSelection(id);
    };
    const handlePasteItem = ({ id: mainGroupId }) => {
      const payload = {
        ...clipboard,
        mainGroupId,
      };

      handleDispatchAction(pastItem, payload);
    };
    const handleDeleteItem = ({ id }) => {
      clipboard.id = [...new Set(id ? [...clipboard.id, id] : clipboard.id)];

      handleDispatchAction(deleteItem, clipboard.id);
    };
    const handleDuplicateItem = ({ id }) => {
      handleDispatchAction(duplicateItem, id);
    };
    const handleEditItem = () => {
      const id = ticked.value[0];
      const items = getItemsFlat(tree.value);
      const selectedItem = items.find((i) => i.id === id);
      const isGroup = selectedItem.creationTypeName === "Group";
      const routeName = `edit-${isGroup ? "group" : "account"}`;
      Router.push(
        `/app/administration/charts/charts-accounts/${routeName}/${id}`
      );
    };
    const handleSelectItems = (items) => {
      clipboard.id = items;
      ticked.value = items;
    };
    const handleExport = async () => {
      try {
        Loading.show();

        const { data } = await exportTree();

        window.open(data, "_blank");
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };
    const handleImport = async (file) => {
      const formData = new FormData();

      formData.append("File", file);

      await handleDispatchAction(importTree, formData, "import");

      importedFile.value = null;
    };
    const onSubmit = async () => {
      try {
        Loading.show();
        const { data } = await getTree(treeFilters.value);

        isFilteredMode.value = true;
        filteredTree.value = data.value;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };
    const resetFilters = () => {
      treeFilters.value.creationType = 0;
      treeFilters.value.level = 0;
      Object.keys(treeFilters.value.filters).forEach((key) => {
        treeFilters.value.filters[key] = [];
      });
    };
    const handleReset = () => {
      isFilteredMode.value = false;
      resetFilters();
      treeEntity.refresh();
    };
    const handleDownloadForm = () => {
      window.open("/form-template.xlsx", "_target");
    };
    const handleToggleItemActive = async ({ row }) => {
      const action = row.creationTypeName === "Group" ? editGroup : editAccount;

      try {
        await action(row);
        treeEntity.refresh();
      } catch (error) {
        console.log(error);
      }
    };

    // Lifecycle
    onMounted(() => {
      groupsEntity.on({
        pending: Loading.show,
        completed: Loading.hide,
        rejected(error) {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top",
          });
        },
      });

      treeEntity.on({
        pending: Loading.show,
        completed: Loading.hide,
        rejected(error) {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top",
          });
        },
      });

      groupsEntity.refresh();
      treeEntity.refresh();
    });

    // Watchers
    watch(group, () => {
      treeFilters.value.mainGroupId = group.value;
      treeEntity.refresh();
    });

    return {
      // State
      ticked,
      form,
      layouts,
      layout,
      groups,
      tree,
      group,
      dialog,
      clipboard,
      importedFile,
      search,
      treeFilters,
      // Methods
      handleDownloadForm,
      toggleDialog,
      onCancel,
      onSubmit,
      handleRefresh,
      handleCopyItem,
      handleCutItem,
      handlePasteItem,
      handleDeleteItem,
      handleDuplicateItem,
      handleSelectItems,
      handleEditItem,
      handleExport,
      handleImport,
      handleReset,
      handleToggleItemActive,
      errorsDialog,
      content: ["group 1", "group 2", "group 3", "group 4", "group 5"],
      companies: [
        "company 1",
        "company 2",
        "company 3",
        "company 4",
        "company 5",
      ],
      filters: ["User Name", "User Type", "Email", "Language", "Company"],
      tab: ref("mails"),
    };
  },
};
</script>
<style>
.custom-style-tabs .q-btn:before {
  box-shadow: unset;
}
.border-chart {
  border: 2px solid #e6e8ec !important;
  border-radius: 20px;
}
.list-buttons {
  background: #ffffff;
  box-shadow: 0px 4px 39px rgba(81, 69, 159, 0.09);
  border-radius: 8px;
}
</style>
