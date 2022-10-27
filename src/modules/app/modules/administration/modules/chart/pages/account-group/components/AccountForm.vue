<template>
  <obs-form @obs-submit="onSubmitAccount">
    <div class="row q-col-gutter-lg">
      <div class="col-12">
        <obs-lookup-field
          type="select"
          name="mainGroupId"
          lookup="#api/LookUps/AccountsMainGroup"
          v-model="accountForm.mainGroupId"
          :cached="false"
          rules="required"
          :label="$t('app.administration.charts.details.mainGroup')"
          @update:model-value="mainGroupChanged"
        />
      </div>
      <div class="col-md-6 col-12">
        <obs-text-field
          name="no"
          v-model="accountForm.no"
          rules="numeric"
          :label="$t('app.administration.charts.details.accountNo')"
        />
      </div>
      <div class="col-md-6 col-12">
        <obs-lookup-field
          v-model="accountForm.level"
          name="level"
          :label="$t('app.administration.charts.main.level')"
          lookup="$Levels"
          :clearable="false"
          :disable="true"
        />
      </div>
      <div class="col-12">
        <obs-text-field
          name="name"
          rules="required"
          v-model="accountForm.name"
          :label="$t('app.administration.charts.details.accountLabel')"
        />
      </div>
      <div class="col-md-6 col-12">
        <obs-lookup-field
          type="select"
          name="accountType"
          v-model="accountForm.accountType"
          lookup="$AccountsType"
          rules="required"
          :label="$t('app.administration.charts.details.accountType')"
        />
      </div>
      <div class="col-md-6 col-12">
        <obs-lookup-field
          type="select"
          name="currencyId"
          v-model="accountForm.currencyId"
          lookup="#api/LookUps/Currencies"
          :label="$t('app.administration.charts.details.allCuurencyLabel')"
        />
      </div>
    </div>
    <q-separator class="q-my-lg" />
    <div>
      <div class="text-h6 q-mb-sm">
        {{ $t("app.administration.charts.details.properties") }}
      </div>
      <div class="row q-col-gutter-lg q-mt-xs q-mb-xl">
        <div class="col-md-6 col-12">
          <p class="text-subtitle2 q-mb-sm">
            {{ $t("app.administration.charts.details.postingTypeLabel") }}
          </p>
          <obs-lookup-field
            type="radio"
            name="postingtype"
            :label="$t('app.administration.charts.details.postingTypeLabel')"
            v-model="accountForm.postingtype"
            lookup="$Postingtypes"
          />
        </div>
        <div class="col-md-6 col-12">
          <p class="text-subtitle2 q-mb-sm">
            {{ $t("app.administration.charts.details.typicalLabel") }}
          </p>
          <obs-lookup-field
            type="radio"
            name="typical"
            :label="$t('app.administration.charts.details.typicalLabel')"
            v-model="accountForm.typical"
            lookup="$Typical"
          />
        </div>
        <div class="col-md-6 col-12">
          <p class="text-subtitle2 q-mb-sm">
            {{ $t("app.administration.charts.details.accountCategoryLabel") }}
          </p>
          <obs-lookup-field
            type="radio"
            name="accCategory"
            :label="
              $t('app.administration.charts.details.accountCategoryLabel')
            "
            v-model="accountForm.accCategory"
            lookup="$AccCategory"
          />
        </div>
        <div class="col-12">
          <obs-lookup-field
            type="select"
            name="tagIds"
            lookup="#api/LookUps/TagsOfAccountCharts"
            v-model="accountForm.tagIds"
            :cached="false"
            multiple
            :label="$t('app.administration.charts.details.tagsLabel')"
          />
        </div>
      </div>
    </div>
    <div class="row justify-between">
      <obs-form-action
        class="q-mb-sm col-auto"
        color="primary"
        :label="
          !accountForm.isActive
            ? $t('app.administration.charts.details.activeBtn')
            : $t('app.administration.charts.details.disableBtn')
        "
        @click="onActiveAccount"
      />
      <div class="col-auto">
        <obs-form-action
          class="q-mr-sm q-mb-sm"
          type="reset"
          color="red"
          :label="$t('app.administration.charts.details.discard')"
          icon="cancel"
          @click="onResetAccount"
        />
        <obs-form-action
          class="q-ml-auto q-mr-sm q-mb-sm"
          type="submit"
          :label="
            edit
              ? $t('app.administration.charts.details.editAccount')
              : $t('app.administration.charts.details.save')
          "
          icon="check"
        />
      </div>
    </div>
  </obs-form>
</template>

<script>
import { Dialog, Loading, Notify } from "quasar";
import { onMounted, ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { Router } from "src/router";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule"
);

export default {
  setup() {
    const { editAccount, getAccount, createAccount, getGroupLevel } =
      useActions([
        "editAccount",
        "getAccount",
        "createAccount",
        "getGroupLevel",
      ]);

    const edit = ref();

    const route = useRoute();

    const i18n = useI18n();

    const accountForm = ref({
      mainGroupId: null,
      no: null,
      name: null,
      accountType: 0,
      currencyId: 0,
      postingtype: null,
      typical: null,
      level: 1,
      accCategory: null,
      isActive: true,
      tagIds: null,
    });

    async function onAddAccount() {
      Loading.show();
      await createAccount(accountForm.value)
        .then(() => {
          Notify.create({
            message: i18n.t("app.administration.charts.details.done"),
            color: "green",
            position: "top",
          });

          Router.push("/app/administration/charts/charts-accounts");
        })
        .catch((error) => {
          Notify.create({
            message: error.data.errorMessage,
            color: "red",
            position: "top",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    }

    async function onEditAccount() {
      Loading.show();
      accountForm.value.id = route.params.id;
      await editAccount(accountForm.value)
        .then(() => {
          Notify.create({
            message: i18n.t("app.administration.charts.details.done"),
            color: "green",
            position: "top",
          });

          Router.push("/app/administration/charts/charts-accounts");
        })
        .catch((error) => {
          Notify.create({
            message: error.data.errorMessage,
            color: "red",
            position: "top",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    }

    function onSubmitAccount() {
      edit.value ? onEditAccount() : onAddAccount();
    }

    function onResetAccount() {
      Dialog.create({
        title: i18n.t("app.administration.charts.details.discardTitle"),
        message: i18n.t("app.administration.charts.details.discardMsg"),
        cancel: true,
        persistent: true,
      }).onOk(() => {
        accountForm.value = {
          mainGroupId: null,
          no: null,
          name: null,
          accountType: null,
          currencyId: null,
          postingtype: null,
          typical: null,
          accCategory: null,
          isActive: true,
          tagIds: null,
        };
      });
    }
    function onActiveAccount() {
      accountForm.value.isActive = !accountForm.value.isActive;
    }
    async function fetchAccount(id) {
      Loading.show();
      await getGroupLevel(id).then(({ data }) => {
        accountForm.value = data.value;
        Loading.hide();
      });
    }

    const mainGroupChanged = async (id) => {
      Loading.show();
      await getGroupLevel(id).then(({ data }) => {
        accountForm.value.level = data.value.level;
        Loading.hide();
      });
    };

    onMounted(async () => {
      accountForm.value.mainGroupId = route.params.id - 0;
    });

    return {
      accountForm,
      edit,
      onSubmitAccount,
      onResetAccount,
      onActiveAccount,
      mainGroupChanged,
    };
  },
};
</script>

<style lang="scss" scoped></style>
