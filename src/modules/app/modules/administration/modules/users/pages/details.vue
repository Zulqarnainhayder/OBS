<template>
  <q-page padding>
    <q-card class="my-card bg-white">
      <!-- Actions -->
      <div class="row  reverse-wrap justify-between items-center actions">
        <div class="q-gutter-sm col-md-12">
          <obs-form-action
            :label="$t('app.administration.users.userDetails.save')"
          />
          <obs-form-action
            outline
            :label="$t('app.administration.users.userDetails.discard')"
          />
          <obs-form-action
            outline
            :label="$t('app.administration.users.userDetails.duplicate')"
          />

          <obs-form-action
            outline
            :label="$t('app.administration.users.userDetails.delete')"
          />
          <obs-form-action
            outline
            :label="$t('app.administration.users.userDetails.sendEmail')"
          />
        </div>
      </div>
      <!--  -->
      <!--  -->
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <!-- <div class="row top">
           <div class="col-4">
            <q-input filled v-model="name" :label="$t('app.administration.users.userDetails.name')" lazy-rules
              style="width: 300px; margin-bottom: 2rem;" />
            <obs-phone-field
              name="phone"
              v-model="phone"
              filled
              :label="$t('app.administration.users.userDetails.mobile')"
              style="width: 300px; margin-bottom: 2rem;"
            />
            <obs-text-field
              name="email"
              rules="email"
              v-model="email"
              :label="$t('app.administration.users.userDetails.email')"
              style="width: 300px; margin-bottom: 2rem;"
            />
            <q-input filled v-model="password" :label="$t('app.administration.users.userDetails.password')"
              style="width: 160px; margin-bottom: 1rem; margin-right: 10px; display: inline-block;" />
            <q-input filled v-model="password_confirm" :label="$t('app.administration.users.userDetails.passwordConfirm')"
              style="width: 170px; margin-bottom: 1rem; margin-left: 10px; display: inline-block;" />

            <q-checkbox v-model="changeRequest" :label="$t('app.administration.users.userDetails.passwordChangeRequet')"
              style="width: 250px; margin-bottom: 2rem;"
            />

             <p> {{ $t('app.administration.users.userDetails.multiCompany') }}</p>
            <q-select filled multiple :options="companies"
              :label="$t('app.administration.users.userDetails.allowedCompany')" style="width: 300px; margin-bottom: 2rem;" />

          </div>
          <div class="col-3 centerSide" >
            <label class="type">{{ $t("app.administration.users.userDetails.userTypes") }}</label>
            <div class="q-pa-md">
              <q-option-group
                :options="userTypes"
                type="radio"
                v-model="typeGroup"
              />
            </div>
          </div>
          <div class="col-4 rightSide">
            <div class="uploadImg">
              <input type="file" @change="onFileChange" />
              <div id="preview">
                <img v-if="url" :src="url" />
              </div>
            </div>
          </div>
        </div> -->
        <!--  -->
        <div class="row">
          <p>{{$t('app.administration.users.userDetails.applicationAccessRights')}}</p>
          <div class="col-4">
              <q-select
                v-model="selected"
                filled
                multiple
                option-value="id"
                :options="adminList" option-label="label"
                :label="$t('app.administration.users.userDetails.adminstration')" style="width: 300px; margin-bottom: 2rem;" />
           <p>{{ selected }}</p>
          </div>
        </div>

      </q-form>
    </q-card>
  </q-page>
</template>
<script>
  import { ref } from 'vue';
  import axios from "axios";

  //
  export default {
    setup() {
      return {
        url: null,
        typeGroup: ref(null),
        changeRequest: ref(false),
        useLocalCurrencyOnly: ref(false),
        useDefaultUOMOnly: ref(false),
        blockDocumentOrReportColumns: ref(false),
        userTypes: [
          { label: 'Adminastration', value: 'adminastration', color: 'green' },
          { label: 'Internal', value: 'internal', color: 'green' },
          { label: 'Guest', value: 'guest', color: 'green' },
          { label: 'Portal', value: 'portal', color: 'green' }
        ],

        companies: [
          'company 1', 'company 2', 'company 3', 'company 4', 'company 5'
        ],
        adminList: [],
        generlLedgerList: [],
        budgetList: [],
        fixedAssetsList: [],
        accountReceivableList: [],
        accountPayableList: [],
        purchasingList: [],
        inventoryList: [],
        salesList: [],
        timeAttendanceList: [],
        payrollList: [],
        personalList: [],
        vehicleInspectionList: [],
        tasksList: [],
        manufacturingList: [],
        maintenanceList: [],
        propertyManagementList: [],
        projectsList: [],

        selected: null,
      }

    },
    methods: {
      onFileChange(e) {
        const file = e.target.files[0];
        this.url = URL.createObjectURL(file);

      },
      // Adminstration id=1
      async getAdminList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/1`).then(function (response) {
          that.adminList = response.data.value;
        });
      },
      // Generl Ledger id=2
      async getGenerlLedgerList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/2`).then(function (response) {
          that.generlLedgerList = response.data.value;
          console.log(that.generlLedgerList);
        });
      },
      // Budget id=3
      async getBudgetList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/3`).then(function (response) {
          that.budgetList = response.data.value;
          console.log(that.budgetList);
        });
      },
      // Fixed Assets id=4
      async getFixedAssetsList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/4`).then(function (response) {
          that.fixedAssetsList = response.data.value;
          console.log(that.fixedAssetsList);
        });
      },
      // Account Receivable id=5
      async getAccountReceivableList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/5`).then(function (response) {
          that.accountReceivableList = response.data.value;
          console.log(that.accountReceivableList);
        });
      },
      // Account Payable id=6
      async getAccountPayableList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/6`).then(function (response) {
          that.accountPayableList = response.data.value;
          console.log(that.accountPayableList);
        });
      },
      // Purchasing id=7
      async getPurchasingList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/7`).then(function (response) {
          that.purchasingList = response.data.value;
          console.log(that.purchasingList);
        });
      },
      // Inventory id=8
      async getInventoryList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/8`).then(function (response) {
          that.inventoryList = response.data.value;
          console.log(that.inventoryList);
        });
      },
      // Sales id=9
      async getSalesList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/9`).then(function (response) {
          that.salesList = response.data.value;
          console.log(that.salesList);
        });
      },
      // Time Attendance id=10
      async getTimeAttendanceList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/10`).then(function (response) {
          that.timeAttendanceList = response.data.value;
          console.log(that.timeAttendanceList);
        });
      },
      // Payroll id=11
      async getPayrollList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/11`).then(function (response) {
          that.payrollList = response.data.value;
          console.log(that.payrollList);
        });
      },
      // Personal id=12
      async getPersonalList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/12`).then(function (response) {
          that.personalList = response.data.value;
          console.log(that.personalList);
        });
      },
      // Vehicle Inspection id=13
      async getVehicleInspectionList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/13`).then(function (response) {
          that.vehicleInspectionList = response.data.value;
          console.log(that.vehicleInspectionList);
        });
      },
      // Tasks id=14
      async getTasksList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/14`).then(function (response) {
          that.tasksList = response.data.value;
          console.log(that.tasksList);
        });
      },
      // Manufacturing id=15
      async getManufacturingList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/15`).then(function (response) {
          that.manufacturingList = response.data.value;
          console.log(that.manufacturingList);
        });
      },
      // Maintenance id=17
      async getMaintenanceList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/17`).then(function (response) {
          that.maintenanceList = response.data.value;
          console.log(that.maintenanceList);
        });
      },
      // Maintenance id=18
      async getpropertyManagementList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/18`).then(function (response) {
          that.propertyManagementList = response.data.value;
          console.log(that.propertyManagementList);
        });
      },
      // Maintenance id=19
      async getProjectsList() {
          const that = this;
          axios.get(`https://obs-api-beta.azurewebsites.net/api/AccessGroups/DropDownList/19`).then(function (response) {
          that.projectsList = response.data.value;
          console.log(that.projectsList);
        });
      },

    },
    mounted() {
      this.getAdminList();
      this.getGenerlLedgerList();
      this.getBudgetList();
      this.getFixedAssetsList();
      this.getAccountReceivableList();
      this.getAccountPayableList();
      this.getPurchasingList();
      this.getInventoryList();
      this.getSalesList();
      this.getTimeAttendanceList();
      this.getPayrollList();
      this.getPersonalList();
      this.getVehicleInspectionList();
      this.getTasksList();
      this.getManufacturingList();
      this.getMaintenanceList();
      this.getpropertyManagementList();
      this.getProjectsList();

    },
  }

</script>
<style scoped>
  .my-card {
    min-height: 656px;
    padding: 1rem;
  }
  .actions {
    margin-bottom: 5rem;
  }
  .link {
    display: block;
    margin-bottom: 1rem;
    width: 150px;
    text-decoration: none;
    text-align: center;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 1rem;
    background-color: #4caf50;
    border: 1px solid #4caf50;
    color: #fff;
  }

  p {
    display: block;
    width: 100%;
  }

  .q-pa-md {
    border-left: 1px solid;
    padding: 0 16px;
  }
  .rightSide,
  .centerSide {
    position: relative;
  }
  .centerSide {
    margin-left: 4rem;
  }
  label.type {
    position: absolute;
    left: -28%;
    top: 0;
    bottom: 100%;
  }
  #preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
.top {
  border-bottom: 1px solid #ccc;
}
</style>
