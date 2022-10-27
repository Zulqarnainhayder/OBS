<template>
  <div class="q-mx-sm select-component" style="width: 200px">
    <obs-lookup-field
      name="company-switcher"
      :label="name"
      :clearable="false"
      hide-bottom-space
      lookup="#/api/Organization/GetAllCompanies"
      :model-value="profile.companyId"
      label-key="companyLabel"
      @obs-change="handleCompany"
      :use-input="false"
      color="primary"
      class="border-company"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";

const { useActions: useOrganizationActions} = createNamespacedHelpers("AppModule/AdministrationModule/organizationModule")

const { useState: useProfileState, useActions: useProfileActions } = createNamespacedHelpers(
  "AppModule/ProfileModule"
);

export default defineComponent({
  setup() {

    const name = ref('');

    const { getOrganization } = useOrganizationActions(["getOrganization"])

    const { update } = useProfileActions(["update"]);
    const { profile } = useProfileState(["profile"]);

    onMounted(() => {
      getOrganization().then((res)=> {
        name.value = res.data.value.organizationLabel
      });
    })

    const handleCompany = (companyId) => {
      const payload = {
        userId: "1",
        languageId: 1,
        companyId
      }

      update(payload);
    }

    return {
      name,
      profile,
      handleCompany,
    };
  },
});
</script>
<style>
.select-component .q-field--standard .q-field__control:before{
  border: 2px solid #EFEEEB;
  border-radius: 10px;
}
.select-component .q-select--without-input .q-field__control{
  padding: 5px 15px;
}
</style>
