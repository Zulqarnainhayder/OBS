<template>
  <q-page padding>
    <q-card class="my-card bg-white">
      <div class="row inviteUser">
        <p>{{ $t("app.administration.users.invitation.sendEmailTxt") }}</p>
      </div>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="row">
          <div class="col-6">
            <q-input filled v-model="email" :label="$t('app.administration.users.invitation.mailInpt')" lazy-rules
              style="width: 300px; margin-bottom: 2rem;" />
            <q-select
              filled multiple
              v-model="companies_selected"
              option-value="id"
              :options="companies" option-label="companyLabel"
              @update:model-value="val => showChannel(val)"
              :label="$t('app.administration.users.invitation.companiesSelect')"
               style="width: 300px; margin-bottom: 2rem;" />
            </div>
          <div class="col-6 rightSide" >
            <label class="type">{{ $t("app.administration.users.invitation.userTypeLabel") }}</label>
            <div class="q-pa-md">
              <q-option-group
                :options="userTypes"
                type="radio"
                v-model="roleId"
              />
            </div>
          </div>
        </div>

        <div>
          <q-btn :label="$t('app.administration.users.invitation.sendEmailLink')" type="submit" color="positive" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>
<script>
  import { ref } from 'vue';
  import api from "axios";
  export default {
    data () {
      return {
        roleId: ref('0'),
        userTypes: [
          { label: 'Adminastration', value: '0', color: 'green' },
          { label: 'Internal', value: '1', color: 'green' },
          { label: 'Guest', value: '2', color: 'green' },
          { label: 'Portal', value: '3', color: 'green' }
        ],
        companies: [],
        companies_selected: [],
        companyIds: [],
        email: '',
      }
    },
    methods: {
      showChannel(val) {
        for (var i = 0; i < val.length; i++) {
          this.companyIds = val.map( (item) => item.id);
          console.log( this.companyIds);
        }
      },
      async getAllCompanies() {
        let that = this;
        await api
        .get('https://obs-api-beta.azurewebsites.net/api/Organization/GetAllCompanies')
        .then(function (response) {
            that.companies = response.data.value;
        });
      },
      async onSubmit() {
        let that = this;
        let data = {
          "email": that.email,
          "companyIds": that.companyIds,
          "roleId": that.roleId
        }

        await api
          .post(`https://obs-api-beta.azurewebsites.net/api/InvitationUsers/Create`, data)
          .then(function (res) {
            console.log(res);

          });
      }
    },
    created() {
      this.getAllCompanies();
    },
  }

</script>
<style scoped>
  .my-card {
    min-height: 656px;
    padding: 4rem 3rem;
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

  .inviteUser {
    margin-bottom: 2rem;
  }
  .q-pa-md {
    border-left: 1px solid;
    padding: 0 16px;
  }
  .rightSide {
    position: relative;
  }
  label.type {
    position: absolute;
    left: -15%;
    bottom: 100%;
  }
</style>
