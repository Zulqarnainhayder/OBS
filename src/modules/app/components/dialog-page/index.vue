<template>
  <q-dialog
    v-model="dialogShowValue"
    :maximized="true"
    persistent
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="bg-grey-1 q-pa-xl">
      <q-card-section class="text-right">
        <q-btn
          color="white"
          text-color="black"
          label="Close"
          @click="closeDialog"
        />
      </q-card-section>
      <q-card-section class="records-table">
        <div class="q-pa-xl shadow-1 border-radius bg-white">
          <div class="text-h6">Records Table</div>
          <q-table :rows="rows" :columns="columns" row-key="name">
            <template v-slot:body="props">
              <q-tr
                :props="props"
                :class="props.row.errors?.length > 0 ? 'bg-red-2' : ''"
              >
                <q-td key="GroupNo" :props="props">
                  {{ props.row.index }}
                </q-td>
                <q-td key="GroupNo" :props="props">
                  {{ props.row.parentGroupNo }}

                  <q-popup-edit
                    v-model="props.row.parentGroupNo"
                    buttons
                    v-slot="scope"
                  >
                    <q-input
                      type="text"
                      v-model="scope.value"
                      dense
                      autofocus
                    />
                  </q-popup-edit>
                </q-td>
                <q-td key="creationType" :props="props">
                  {{ creationTypeOptions[props.row.creationType]?.label }}
                  <q-popup-edit
                    v-model="props.row.creationType"
                    buttons
                    v-slot="scope"
                  >
                    <q-select
                      v-model="scope.value"
                      :options="creationTypeOptions"
                      emit-value
                      map-options
                    />
                  </q-popup-edit>
                </q-td>
                <q-td key="no" :props="props">
                  <div class="text-pre-wrap">{{ props.row.no }}</div>
                  <q-popup-edit v-model="props.row.no" v-slot="scope" buttons>
                    <q-input
                      type="number"
                      v-model="scope.value"
                      dense
                      autofocus
                    />
                  </q-popup-edit>
                </q-td>
                <q-td key="name" :props="props">
                  {{ props.row.name }}
                  <q-popup-edit
                    v-model="props.row.name"
                    buttons
                    persistent
                    v-slot="scope"
                  >
                    <q-input
                      type="text"
                      v-model="scope.value"
                      dense
                      autofocus
                    />
                    <!-- hint="Use buttons to close" -->
                  </q-popup-edit>
                </q-td>
                <q-td key="currencyId" :props="props">
                  {{
                    getProperityName(currencyIdOptions, props.row.currencyId)
                  }}
                  <q-popup-edit
                    v-model="props.row.currencyId"
                    buttons
                    v-slot="scope"
                  >
                    <q-select
                      v-model="scope.value"
                      :options="currencyIdOptions"
                      emit-value
                      map-options
                    />
                  </q-popup-edit>
                </q-td>
                <q-td key="accountType" :props="props">
                  {{ accountTypeOptions[props.row.accountType]?.label }}
                  <q-popup-edit
                    v-model="props.row.accountType"
                    buttons
                    v-slot="scope"
                  >
                    <q-select
                      v-model="scope.value"
                      :options="accountTypeOptions"
                      emit-value
                      map-options
                    />
                  </q-popup-edit>
                </q-td>
                <q-td key="postingtype" :props="props">
                  {{ postingtypeOptions[props.row.postingtype]?.label }}
                  <q-popup-edit
                    v-model="props.row.postingtype"
                    buttons
                    v-slot="scope"
                  >
                    <q-select
                      v-model="scope.value"
                      :options="postingtypeOptions"
                      emit-value
                      map-options
                    />
                  </q-popup-edit>
                </q-td>

                <q-td key="typical" :props="props">
                  {{ typicalOptions[props.row.typical]?.label }}
                  <q-popup-edit
                    v-model="props.row.typical"
                    buttons
                    v-slot="scope"
                  >
                    <q-select
                      v-model="scope.value"
                      :options="typicalOptions"
                      emit-value
                      map-options
                    />
                  </q-popup-edit>
                </q-td>
              </q-tr>
            </template>
          </q-table>
          <!-- erros table -->
          <div>
            <div class="text-h6 q-py-md">Erros List</div>
            <template v-for="record in rows" :key="record">
              <div
                class="row bg-red-2 q-pa-md q-mb-sm border-radius"
                v-if="record.errors?.length > 0"
              >
                <div class="col-1">
                  {{ record.index }}
                </div>
                <div class="col-11">
                  <div class="row">
                    <template v-for="error in record.errors" :key="error">
                      <div class="col-md-6 q-pa-sm">
                        <span class="text-bold"
                          >{{ error.propertyName }} :
                        </span>
                        <span class="text-grey-9">{{
                          error.errorMessage
                        }}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="text-center q-mt-xl">
            <q-btn color="primary-2" label="Submit" @click="submitRecords" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Loading, Notify } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/MainPage"
);
export default defineComponent({
  emits: ["treeUpdate"],
  setup(props, { emit }) {
    const { checkErrors } = useActions(["checkErrors"]);

    let dialogShowValue = ref(false);
    let closeDialog = () => {
      dialogShowValue.value = false;
    };

    const columns = [
      {
        name: "index",
        label: "#",
        field: "index",
      },
      {
        name: "GroupNo",
        required: true,
        label: "Parent Group No",
        align: "center",
        field: "GroupNo",
      },
      {
        name: "creationType",
        align: "center",
        label: "Group/Account",
        field: "creationType",
      },
      {
        name: "no",
        label: "Group/Account no",
        field: "no",
        align: "center",
      },
      {
        name: "name",
        label: "Group/Account name",
        field: "name",
        align: "center",
      },
      {
        name: "currencyId",
        label: "Currency",
        field: "currencyId",
        align: "center",
      },
      {
        name: "accountType",
        label: "Account type",
        field: "accountType",
        align: "center",
      },
      {
        name: "postingtype",
        label: "Posting type",
        field: "postingtype",
        align: "center",
      },
      {
        name: "typical",
        label: "Typical",
        field: "typical",
        align: "center",
      },
    ];

    let rows = ref([]);

    let dialogRows = (data) => {
      data.forEach((row, index) => {
        row.index = index;
      });
      rows.value = [...data];
    };
    let getProperityName = (options, id) => {
      let name = options.filter((obj) => {
        return obj.value === id;
      })[0]?.label;
      return name;
    };
    let submitRecords = async () => {
      let submitionData = [...rows.value];

      submitionData.forEach((row) => {
        row.errors = [];
        delete row.index;
        row.accountTypeName = getProperityName(
          accountTypeOptions,
          row.accountType
        );

        row.creationTypeName = getProperityName(
          creationTypeOptions,
          row.creationType
        );

        row.currency = getProperityName(currencyIdOptions, row.currencyId);

        row.typicalName = getProperityName(typicalOptions, row.typical);

        row.postingTypeName = getProperityName(
          postingtypeOptions,
          row.postingtype
        );
      });
      try {
        Loading.show();
        const { data } = await checkErrors({
          accountGuideList: submitionData,
        });
        emit("treeUpdate");
        closeDialog();
      } catch (error) {
        checkErrorsType(error.response.data.errors);
      } finally {
        Loading.hide();
      }
    };

    let creationTypeOptions = [
      {
        label: "Account",
        value: 0,
      },
      {
        label: "Group",
        value: 1,
      },
    ];
    let currencyIdOptions = [
      {
        label: "Afghan afghani",
        value: 1,
      },
      {
        label: "Albanian lek",
        value: 2,
      },
      {
        label: "Algerian dinar",
        value: 3,
      },
      {
        label: "Angolan kwanza",
        value: 4,
      },
      {
        label: "Argentine peso",
        value: 5,
      },
      {
        label: "Armenian dram",
        value: 6,
      },
    ];
    let accountTypeOptions = [
      {
        label: "Reqular",
        value: 0,
      },
      {
        label: "FixedAsset",
        value: 1,
      },
    ];
    let postingtypeOptions = [
      {
        label: "BalanceSheet",
        value: 0,
      },
      {
        label: "IncomeStatement",
        value: 1,
      },
    ];
    let typicalOptions = [
      {
        label: "Credit",
        value: 0,
      },
      {
        label: "Debit",
        value: 1,
      },
    ];

    let groupId = ref(0);
    let checkErrorsType = (errors) => {
      let errorsList = [];
      for (const property in errors) {
        let errorIndex = property.substring(property.indexOf("[") + 1)[0];
        let errorObj = {
          propertyName: property.substring(property.indexOf(".") + 1),
          errorMessage: errors[property][0],
        };
        rows.value[errorIndex].errors.push(errorObj);
      }
      return errorsList;
    };
    return {
      dialogShowValue,
      closeDialog,
      columns,
      rows,
      creationTypeOptions,
      currencyIdOptions,
      accountTypeOptions,
      postingtypeOptions,
      typicalOptions,
      dialogRows,
      submitRecords,
      groupId,
      checkErrorsType,
      getProperityName,
    };
  },
});
</script>
<style>
.records-table .q-table thead th {
  font-size: 18px;
  font-weight: bold;
}
.border-radius {
  border-radius: 5px;
}
</style>
