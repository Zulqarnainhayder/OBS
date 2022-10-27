<template>
  <q-page padding>
    <obs-table
      :title="$t('app.administration.users.invitedUsers.invitedUsersLabel')"
      row-key="id"
      selection="multiple"
      v-model="selectedRow"
      @change="changeData()"
      action="AppModule/AdministrationModule/UsersModule/getInvitationUsers"

      :columns="[
        {
          name: 'id',
          label: '#',
          field:'id',
          align: 'left'
        },
        {
          name: 'userName',
          label: $t('app.administration.users.users.nameLabel'),
          field: 'userName',
          align: 'left',
        },
        {
          name: 'email',
          label: $t('app.administration.users.users.emailLabel'),
          field: 'email',
          align: 'left',
        },
        {
          name: 'roleName',
          label: $t('app.administration.users.users.userTypeLabel'),
          field: 'roleName',
          align: 'left',
        },

        {
          name: 'company',
          label: $t('app.administration.users.users.companyLabel'),
          field: 'company',
          align: 'left',
        },
        {
          name: 'active',
          label: $t('app.administration.users.invitedUsers.finalRegistrationTxt'),
          align: 'left',
          field: 'active',
        }

      ]"
    >
    <template v-slot:top>
        <router-link class="link userDetails" to="/app/administration/users/user-details">
          {{ $t("app.administration.users.invitedUsers.userDetailsLink") }}
        </router-link>
        <q-btn class="q-btn q-btn-item " label="Delete" @click="deleteInvitedUsers" />
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
      <template #cell-company="item">
        <div class="q-pa-md q-gutter-md">
          <q-badge outline color="primary" v-for="(itm, i) in item.row.company" :key="i" :label="itm.label" />
        </div>
      </template>
      <template #cell-active="item">
        <q-toggle
          v-model="item.row.active"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          @click="toggleIsActive({id: item.row.id})"
        />
      </template>
    </obs-table>
    <q-dialog v-model="toggleDialog" persistent>

      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Add User</div>
        </q-card-section>

        <obs-form @obs-submit="submitAddUser(newUser)">
          <q-card-section class="q-pt-none">
            <obs-text-field
              name="userName"
              placeholder="User Name"
              type="text"
              :label="$t('app.administration.users.users.nameLabel')"
              v-model="newUser.userName"
              rules="required"
            />
            <obs-text-field
              name="userEmail"
              placeholder="Email"
              type="text"
              :label="$t('app.administration.users.users.emailLabel')"
              v-model="newUser.userEmail"
              rules="required"
            />
            <obs-text-field
              name="userType"
              placeholder="User Type"
              type="text"
              :label="$t('app.administration.users.users.userTypeLabel')"
              v-model="newUser.userType"
              rules="required"
            />
            <obs-text-field
              name="language"
              placeholder="Language"
              type="text"
              :label="$t('app.administration.users.users.languageLabel')"
              v-model="newUser.language"
              rules="required"
            />



            <obs-lookup-field
              type="select"
              name="select"
              :model-value="newUser.company"
              multiple
              lookup="$Company"
              :use-input="true"
              use-chips
              :label="$t('app.administration.users.users.companyLabel')"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat :label="addOrEdit" type="submit"  />
          </q-card-actions>
        </obs-form>
      </q-card>
    </q-dialog>
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
    const deleteInvitedUsers = (item) => {
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
      deleteInvitedUsers,
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
