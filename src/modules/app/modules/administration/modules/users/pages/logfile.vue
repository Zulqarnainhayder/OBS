<template>
  <q-page padding>
    <obs-table
      :title="$t('app.administration.users.logfile.userLogLabel')"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      action="AppModule/AdministrationModule/UsersModule/getLogUsers"

      :columns="[
        {
          name: 'id',
          label: '#',
          field:'id',
          align: 'left'
        },
        {
          name: 'userName',
          label: $t('app.administration.users.logfile.nameLabel'),
          field: 'userName',
          align: 'left',
        },
        {
          name: 'userEmail',
          label: $t('app.administration.users.logfile.emailLabel'),
          field: 'userEmail',
          align: 'left',
        },
        {
          name: 'userType',
          label: $t('app.administration.users.logfile.userTypeLabel'),
          field: 'userType',
          align: 'left',
        },
        {
          name: 'date',
          label: $t('app.administration.users.logfile.dateLabel'),
          field: 'date',
          align: 'left',
        },
        {
          name: 'file',
          label: $t('app.administration.users.logfile.logFileLabel'),
          field: 'file',
          align: 'left',
        },
        {
          name: 'company',
          label: $t('app.administration.users.users.companyLabel'),
          field: 'company',
          align: 'left',
        },

      ]"
    >
    <template v-slot:top>
        <q-btn class="q-btn q-btn-item " label="User Details" @click="showUserDetails(item)" />
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

    return{

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
        color: #fff;
    border: 1px solid #4caf50;
    background-color: #4caf50;
 }
 .q-btn:before {
  border: 0 ;
  box-shadow: none;
 }
  .q-focus-helper {
    background: currentColor !important;
}
.q-table__top .q-select {
  margin-left: 1rem;
}
</style>
