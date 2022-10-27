<template>
  <q-page padding>
    <q-card class="my-card">
      <div class="bg-white shadow-1 q-pa-lg q-mb-md">
        <div class="row q-mt-lg items-center user-select">
          <div class="col-md-5"><h3 class="no-margin">Users</h3></div>
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
              :options="groups"
              label="Groups"
              style="margin-right: 1.5rem"
            />
          </div>
          <div class="col-md-4">
            <q-select
              outlined
              multiple
              :options="companies"
              label="Companies"
              style="margin-right: 1.5rem"
            />
          </div>
        </div>
      </div>
    </q-card>
    <!-- Table -->
    <obs-table
      :hide-header="$q.screen.lt.lg"
      row-key="id"
      :key="key"
      selection="multiple"
      :searchable="false"
      :duplicate="true"
      :userAdd="true"
      action="AppModule/AdministrationModule/UsersModule/getUsers"
      :columns="[
        {
          name: 'name',
          label: $t('app.administration.users.users.nameLabel'),
          field: 'name',
          align: 'center',
          style: 'width: 200px',
          headerStyle: 'width: 200px',
        },
        {
          name: 'login',
          label: $t('app.administration.users.users.emailLabel'),
          field: 'login',
          align: 'center',
          style: 'width: 200px',
          headerStyle: 'width: 200px',
        },
        {
          name: 'userType',
          label: $t('app.administration.users.users.userTypeLabel'),
          field: 'userType',
          align: 'center',
          style: 'width: 200px',
          headerStyle: 'width: 200px',
        },
        {
          name: 'language',
          label: $t('app.administration.users.users.languageLabel'),
          field: 'language',
          align: 'center',
          style: 'width: 200px',
          headerStyle: 'width: 200px',
        },
        {
          name: 'company',
          label: $t('app.administration.users.users.companyLabel'),
          field: 'company',
          align: 'center',
        },
        {
          name: 'isActive',
          label: $t('app.administration.users.users.active'),
          align: 'center',
          field: 'isActive',
          style: 'width: 200px',
          headerStyle: 'width: 200px',
        },
      ]"
    >
      <template #cell-name="item">
        <q-avatar v-if="item.row.name">
          <img
            style="object-fit: cover"
            class="q-mr-sm"
            src="/images/user-dp.svg"
          />
        </q-avatar>
        {{ item.row.name }}
      </template>
      <template #cell-number="item">
        {{ item.rowIndex + 1 }}
      </template>
      <template #cell-company="item">
        <div class="q-pa-md q-gutter-md">
          <q-badge
            outline
            color="primary"
            v-for="(itm, i) in item.row.company"
            :key="i"
            :label="itm.label"
          />
        </div>
      </template>
      <template #cell-isActive="item">
        <q-toggle
          class="custome-toggle-dark"
          checked-icon="check"
          color="green"
          :model-value="item.row.isActive"
          @update:model-value="toggleActive(item)"
        />
      </template>
    </obs-table>
  </q-page>
</template>
<script>
import { Loading, Dialog, Notify } from "quasar";
import { ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/UsersModule"
);

export default {
  setup() {
    const toggleDialog = ref(false);
    const { getUserById, deleteUser, editUser, addUser, ToggleTaxIsActive } =
      useActions([
        "getUserById",
        "deleteUser",
        "editUser",
        "addUser",
        "ToggleTaxIsActive",
      ]);

    const addOrEdit = ref("");

    const newUser = ref({
      userName: null,
      userEmail: null,
      userType: null,
      language: null,
      company: null,
    });

    const confirmDeleteUser = (item) => {
      Dialog.create({
        title: `Confirm Deleting User ${item.userName}`,
        message: "Would you like to delete this user?",
        cancel: true,
        persistent: true,
      })
        .onOk(() => {
          handleDeleteUser(item);
        })
        .onOk(() => {
          Notify.create({
            message: "User Deleted",
            color: "green",
            position: "top",
          });
        })
        .onCancel(() => {
          Notify.create({
            message: "Deleting was canceled",
            color: "red",
            position: "top",
          });
        });
    };

    const handleDeleteUser = (item) => {
      Loading.show();

      deleteUser(item).then(() => {
        Loading.hide();
      });
    };

    const openAddDialog = (item, edit) => {
      toggleDialog.value = true;

      newUser.value.userName = item.userName;
      newUser.value.userEmail = item.userEmail;
      newUser.value.userType = item.userType;
      newUser.value.language = item.language;
      newUser.value.company = item.company?.map((item) => item.id);

      if (edit) {
        addOrEdit.value = "Edit User";
        newUser.value.id = item.id;
      } else {
        addOrEdit.value = "Add User";
      }
    };

    const submitAddUser = (user) => {
      Loading.show();
      if (addOrEdit.value == "Add User") {
        addUser(user).then(() => {
          toggleDialog.value = false;
          Loading.hide();
          newUser.value = {
            userName: null,
            userEmail: null,
            userType: null,
            language: null,
            company: null,
          };
        });
      } else {
        editUser(user).then(() => {
          toggleDialog.value = false;
          Loading.hide();
          newUser.value = {
            userName: null,
            userEmail: null,
            userType: null,
            language: null,
            company: null,
          };
        });
      }
    };

    const handleChange = (item) => {
      Loading.show();

      editUser(item).then(() => {
        console.log(item);
        Loading.hide();
      });
    };

    const duplicateRow = (item) => {
      getUserById(item).then(() => {
        console.log(item);
      });
    };
    const exportTable = (item) => {
      console.log(item);
    };
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
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "ref",
            position: "top",
          });
        })
        .finally(() => {
          // Loading.hide();
        });
    }

    return {
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

      groups: ["group 1", "group 2", "group 3", "group 4", "group 5"],
      companies: [
        "company 1",
        "company 2",
        "company 3",
        "company 4",
        "company 5",
      ],
      filters: ["User Name", "User Type", "Email", "Language", "Company"],
    };
  },
};
</script>
<style scoped>
.q-btn {
  margin-right: 1rem;
  color: #9e9e9e;
  border: 1px solid #9e9e9e;
}
.q-btn:before {
  border: 1px solid #fafafa;
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
<style>
.user-select .q-field__control {
  border: 1px solid #e5e4e4;
  border-radius: 8px;
}
.custome-toggle-dark .q-toggle__thumb:after,
.custome-toggle-dark .q-toggle__inner--truthy .q-toggle__thumb .q-icon {
  display: none;
}
.custome-toggle-dark .q-toggle__inner--truthy .q-toggle__track {
  opacity: 1;
}
.custome-toggle-dark .text-green {
  color: #00d92f !important;
}
.q-toggle__inner {
  font-size: 45px;
  padding: 0.325em 0.1em;
}
.custome-toggle-dark .q-toggle__track {
  opacity: 1;
  /* color: #F75C6C; */
}
.custome-toggle-dark .non-selectable {
  color: #e0e0e8;
}
.user-search .q-placeholder {
  color: #000000;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
}
</style>
