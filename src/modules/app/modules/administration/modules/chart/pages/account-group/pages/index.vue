<template>
  <q-page padding>
    <div class="text-h6 q-mb-sm">{{$t('app.administration.charts.details.title')}}</div>
      <div class="bg-white shadow-1 q-px-lg q-py-xl column">
        <template
          v-if="!$route.params.id"
        >
          <obs-lookup-field
            type="radio"
            name="groupOrAccount"
            label="groupOrAccount"
            lookup="$AccGruopCharts"
            v-model="createAccountOrGroup"
          />

          <q-separator class="q-my-lg" />
        </template>
        <template  v-if="createAccountOrGroup == 1">
          <account-form />
        </template>

        <!-- Create Group Form -->
        <template v-else-if="createAccountOrGroup == 0">
          <group-form />
        </template>

    </div>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import GroupForm from "../components/GroupForm.vue";
import AccountForm from "../components/AccountForm.vue";

export default {
    setup() {
        const route = useRoute();
        const createAccountOrGroup = ref();

        onMounted(async () => {
          route.name === 'group' ? createAccountOrGroup.value = 0 : createAccountOrGroup.value = 1
        });




        return {
            createAccountOrGroup,
        };
    },
    components: { GroupForm, AccountForm }
};
</script>

<style>
.official-data {
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
