<template>
  <obs-form @obs-submit="onSubmitGroup">
    <div>
      <div class="row q-col-gutter-lg">
        <div class="col-12">
          <obs-lookup-field
            type="select"
            name="mainGroupId"
            lookup="#api/LookUps/AccountsMainGroup"
            v-model="groupForm.mainGroupId"
            :cached="false"
            :label="$t('app.administration.charts.details.mainGroup')"
            @update:model-value="mainGroupChanged"
          />
        </div>
        <div class="col-md-6 col-12">
          <obs-text-field
            name="no"
            v-model="groupForm.no"
            rules="numeric"
            :label="$t('app.administration.charts.details.groupNo')"
          />
        </div>
        <div class="col-6">
          <obs-lookup-field
            v-model="groupForm.level"
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
            v-model="groupForm.name"
            rules="required"
            :label="$t('app.administration.charts.details.groupLabel')"
          />
        </div>
      </div>
      <q-separator class="q-my-lg" />
      <div>
        <div class="text-h6 q-mb-sm">
          {{ $t("app.administration.charts.details.defaults") }}
        </div>
        <div class="row q-col-gutter-lg q-mt-xs q-mb-xl">
          <div class="col-12">
            <obs-lookup-field
              type="select"
              name="currencyId"
              v-model="groupForm.currencyId"
              lookup="#api/LookUps/Currencies"
              :label="$t('app.administration.charts.details.allCuurencyLabel')"
            />
          </div>
          <div class="col-md-6 col-12">
            <p class="text-subtitle2 q-mb-sm">
              {{ $t("app.administration.charts.details.postingTypeLabel") }}
            </p>
            <obs-lookup-field
              type="radio"
              name="postingtype"
              label="Postingtypes"
              v-model="groupForm.postingtype"
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
              label="Typical"
              v-model="groupForm.typical"
              lookup="$Typical"
            />
          </div>
        </div>
      </div>
      <div class="row justify-end">
        <obs-form-action
          class="q-mr-sm"
          type="reset"
          color="red"
          :label="$t('app.administration.charts.details.discard')"
          icon="cancel"
          @click="onResetGroup"
        />
        <obs-form-action
          type="submit"
          :label="
            edit
              ? $t('app.administration.charts.details.editGroup')
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
    const { getGroup, editGroup, createGroup, getGroupLevel } = useActions([
      "getGroup",
      "editGroup",
      "createGroup",
      "getGroupLevel",
    ]);

    const edit = ref();

    const route = useRoute();

    const i18n = useI18n();

    const groupForm = ref({
      mainGroupId: null,
      no: null,
      name: null,
      currencyId: 0,
      postingtype: null,
      typical: null,
      level: 1,
    });

    async function onAddGroup() {
      Loading.show();

      await createGroup(groupForm.value)
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

    async function onEditGroup() {
      Loading.show();
      groupForm.value.id = route.params.id;
      await editGroup(groupForm.value)
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

    function onSubmitGroup() {
      edit.value ? onEditGroup() : onAddGroup();
    }

    function onResetGroup() {
      Dialog.create({
        title: i18n.t("app.administration.charts.details.discardTitle"),
        message: i18n.t("app.administration.charts.details.discardMsg"),
        cancel: true,
        persistent: true,
      }).onOk(() => {
        groupForm.value = {
          mainGroupId: null,
          no: null,
          name: null,
          currencyId: null,
          postingtype: null,
          typical: null,
        };
      });
    }

    async function fetchGroup(id) {
      Loading.show();
      await getGroup(id).then(({ data }) => {
        groupForm.value = data.value;
        Loading.hide();
      });
    }
    const mainGroupChanged = async (id) => {
      Loading.show();
      await getGroupLevel(id).then(({ data }) => {
        groupForm.value.level = data.value.level;
        Loading.hide();
      });
    };
    onMounted(async () => {
      const { id } = route.params;
      if (id) {
        edit.value = true;
        fetchGroup(id);
      }
    });

    return {
      groupForm,
      onSubmitGroup,
      onResetGroup,
      edit,
      onEditGroup,
      mainGroupChanged,
    };
  },
};
</script>

<style lang="scss" scoped></style>
