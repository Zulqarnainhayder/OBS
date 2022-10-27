<template>
  <q-page padding>
    <q-card class="my-card bg-white">
      <!-- Actions -->
      <div class="row  reverse-wrap justify-between items-center actions">
        <div class="q-gutter-sm col-md-12">
          <obs-form-action
            :label="$t('app.administration.users.chartGroupDetails.save')"
          />
          <obs-form-action
            outline
            :label="$t('app.administration.users.chartGroupDetails.discard')"
          />
          <obs-form-action
            outline
            :label="$t('app.administration.users.chartGroupDetails.duplicate')"
          />

          <obs-form-action
            outline
            :label="$t('app.administration.users.chartGroupDetails.delete')"
          />
        </div>
      </div>
      <!--  -->
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <div class="row">
          <div class="col-12">
            <q-input filled v-model="email" :label="$t('app.administration.users.chartGroupDetails.groupNameLabel')" lazy-rules
              style="width: 300px; margin-bottom: 2rem;" />
            <q-select filled multiple :options="charts"
              :label="$t('app.administration.users.chartGroupDetails.companyLabel')" style="width: 300px; margin-bottom: 2rem;" />
          </div>

        </div>


      </q-form>
    </q-card>
  </q-page>
</template>
<script>
  import { ref } from 'vue'
  export default {
    setup() {

      return {


        charts: [
          'company 1', 'company 2', 'company 3', 'company 4', 'company 5'
        ],
      }
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
    left: -30%;
    top: 5%;
    bottom: 100%;
  }
</style>
