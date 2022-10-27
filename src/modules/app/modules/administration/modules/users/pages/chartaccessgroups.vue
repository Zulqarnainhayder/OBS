<template>
  <q-page padding>
    <div class="bg-white shadow-1 q-pa-lg q-mb-md">
      <!-- Search -->
      <div class="row items-start">
        <obs-text-field
          :label="$t('app.administration.users.chartAccessGroups.search')"
          class="col q-mr-md"
        />
      </div>
      <!-- Actions -->
      <div class="row  reverse-wrap justify-between items-center">
        <div class="q-gutter-sm col-md-12">
          <obs-form-action
            to="chart-group-details"
            :label="$t('app.administration.users.chartAccessGroups.create')"
          />
          <obs-form-action
            to="chart-group-details"
            outline
            :label="$t('app.administration.users.chartAccessGroups.edit')"
          />
          <obs-form-action
            outline
            :label="$t('app.administration.users.chartAccessGroups.duplicate')"
          />

          <obs-form-action
            outline
            :label="$t('app.administration.users.chartAccessGroups.delete')"
          />
        </div>

      </div>

    </div>
    <!-- Table -->
    <div class="bg-white shadow-1 q-pa-lg q-mb-md">
      <obs-table
         :hide-header="$q.screen.lt.lg"
          row-key="id"
          :key="key"
          selection="multiple"
          action="AppModule/AdministrationModule/UsersModule/getUsers"

          :columns="[
            {
              name: 'number',
              label: '#',
              field: 'number'
            },
            {
              name: 'groupName',
              label: $t('app.administration.users.chartAccessGroups.groupName'),
              field: 'groupName',
              align: 'left',
            },


          ]"
        >

          <template #cell-number="item">
            {{item.rowIndex + 1}}
          </template>
          <template #cell-company="item">
            <div class="q-pa-md q-gutter-md">
              <q-badge outline color="primary" v-for="(itm, i) in item.row.company" :key="i" :label="itm.label" />
            </div>
          </template>
          <template #cell-isActive="item">
            <q-toggle
              checked-icon="check"
              color="green"
              :model-value="item.row.isActive"
              @update:model-value="toggleActive(item)"
            />
          </template>
        </obs-table>
    </div>

  </q-page>
</template>
<script>
import { Loading, Dialog, Notify } from 'quasar';
import { ref } from 'vue';
import { createNamespacedHelpers } from 'vuex-composition-helpers';

const { useActions } = createNamespacedHelpers("AppModule/AdministrationModule/UsersModule");

export default {
  setup() {

    const toggleDialog = ref(false)
    const { getUserById, deleteUser, editUser, addUser, ToggleTaxIsActive } = useActions(['getUserById', 'deleteUser', 'editUser', 'addUser', "ToggleTaxIsActive"]);

    const addOrEdit = ref('')

    const newUser = ref({
      userName : null,
      userEmail: null,
      userType: null,
      language: null,
      company: null
    })

    const confirmDeleteUser = (item) => {
      Dialog.create({
        title: `Confirm Deleting User ${item.userName}`,
        message: 'Would you like to delete this user?',
        cancel: true,
        persistent: true,

      }).onOk(() => {
        handleDeleteUser(item)
      }).onOk(() => {
        Notify.create({
          message: 'User Deleted',
          color: 'green',
          position: 'top'
        })
      }).onCancel(() => {
        Notify.create({
          message: 'Deleting was canceled',
          color: 'red',
          position: 'top'
        })
      })
    }

    const handleDeleteUser = (item) => {
      Loading.show();

      deleteUser(item).then(() => {
        Loading.hide();
      });
    }


    const openAddDialog = (item, edit) => {
      toggleDialog.value = true

      newUser.value.userName = item.userName
      newUser.value.userEmail = item.userEmail
      newUser.value.userType = item.userType
      newUser.value.language = item.language
      newUser.value.company = item.company?.map(item => item.id)

      if(edit){
        addOrEdit.value = 'Edit User'
        newUser.value.id = item.id
      } else {
        addOrEdit.value = 'Add User'
      }
    }

    const submitAddUser = (user) => {
      Loading.show();
      if(addOrEdit.value == 'Add User'){
        addUser(user).then(() => {
          toggleDialog.value = false
          Loading.hide();
          newUser.value = {
            userName : null,
            userEmail: null,
            userType: null,
            language: null,
            company: null
          }
        })
      } else {
        editUser(user).then(() => {
          toggleDialog.value = false
          Loading.hide();
          newUser.value = {
            userName : null,
            userEmail: null,
            userType: null,
            language: null,
            company: null
          }
        })
      }
    }

    const handleChange = (item) => {
      Loading.show();

      editUser(item).then(() => {
        console.log(item);
        Loading.hide();
      });
    }

    const duplicateRow = (item) => {
      getUserById(item).then(() => {
        console.log(item);
      });
    }
    const exportTable = (item) => {
      console.log(item);
    }
    function toggleActive(item) {
      // Loading.show();
      item.row.isActive = !item.row.isActive;

      ToggleTaxIsActive(item.row.id)
        .then(() => {
          // remount();
        })
        .catch((error) => {
          item.row.isActive = !item.row.isActive;

          Notify.create({
            message: error.response ? error.response.data.errorMessage : error.message,
            color: "ref",
            position: "top"
          });
        })
        .finally(() => {
          // Loading.hide();
        });
    }

    return{
      handleDeleteUser,
      confirmDeleteUser,
      toggleDialog,
      handleChange,
      openAddDialog,
      newUser,
      submitAddUser,
      addOrEdit,
      duplicateRow,
      exportTable,
      toggleActive,


      multiple: ref(null),


    }
  },
}
</script>
<style scoped>
 .q-btn {
    margin-right: 1rem;
    color: #9e9e9e ;
    border: 1px solid #9e9e9e  ;
 }
 .q-btn:before {
  border: 1px solid #fafafa ;
  box-shadow: none;
 }
  .q-focus-helper {
    background: currentColor !important;
}
.q-table__top .q-select {
  margin-left: 1rem;
}
.q-btn.q-btn-item {
  padding: 9px 15px !important;
  margin-right: 0rem !important;
}
</style>
