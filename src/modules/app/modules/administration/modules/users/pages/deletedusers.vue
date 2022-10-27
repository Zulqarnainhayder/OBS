<template>
  <q-page padding>
    <obs-table
      :title="$t('app.administration.users.deletedUsers.deletedUsersLabel')"
      row-key="id"
      selection="multiple"
      v-model="selectedRow"
      @change="changeData()"
      action="AppModule/AdministrationModule/UsersModule/getdeletedUsers"

      :columns="[
        {
          name: 'id',
          label: '#',
          field:'id',
          align: 'left'
        },
        {
          name: 'name',
          label: $t('app.administration.users.deletedUsers.name'),
          field: 'name',
          align: 'left',
        },
        {
          name: 'email',
          label: $t('app.administration.users.deletedUsers.login'),
          field: 'email',
          align: 'left',
        },
        {
          name: 'roleName',
          label: $t('app.administration.users.deletedUsers.userType'),
          field: 'roleName',
          align: 'left',
        },
        {
          name: 'date',
          label: $t('app.administration.users.deletedUsers.deletionDate'),
          field: 'date',
          align: 'left',
        },
        {
          name: 'permanentdate',
          label: $t('app.administration.users.deletedUsers.permanentDeletionDate'),
          field: 'permanentdate',
          align: 'left',
        },

      ]"
    >
    <template v-slot:top>
        <router-link class="link userDetails" to="/app/administration/users/user-details">
          {{ $t("app.administration.users.deletedUsers.restore") }}
        </router-link>
        <router-link class="q-btn q-btn-item" to="/app/administration/users/user-details">
          {{ $t("app.administration.users.deletedUsers.deletePermanentaly") }}
        </router-link>
        <q-space />
        <q-select
          filled

          multiple
          :options="filters"
          label="Filters"
          style="width: 200px"
        />
        <q-select
          filled

          multiple
          :options="groups"
          label="Groups"
          style="width: 200px"
        />
        <q-select
          filled

          multiple
          :options="companies"
          label="Companies"
          style="width: 200px"
        />

      </template>
      <template #cell-number="item">
        {{item.rowIndex + 1}}
      </template>
    </obs-table>

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
    const { getUserById, deleteUser, editUser, addUser } = useActions(['getUserById', 'deleteUser', 'editUser', 'addUser']);

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
    const deletedeletedUsers = (item) => {
      console.log(item);
    }

    const changeData = () =>{
      console.log("ddddddddddd");
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
      deletedeletedUsers,
      changeData,


      selectedRow: '',
      multiple: ref(null),

      groups: [
        'group 1', 'group 2', 'group 3', 'group 4', 'group 5'
      ],
      companies: [
        'company 1', 'company 2', 'company 3', 'company 4', 'company 5'
      ],
      filters: [
        'User Name', 'User Type', 'Email', 'Language', 'Company'
      ]
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
.userDetails {
  display: block;
  margin: 0 1rem;
  width: 150px;
  text-decoration: none;
  text-align: center;
  padding: 4px 16px;
  border-radius: 3px;
  font-size: 1rem;
  background-color: #4caf50;
  border: 1px solid #4caf50;
  color: #fff;
}
</style>
