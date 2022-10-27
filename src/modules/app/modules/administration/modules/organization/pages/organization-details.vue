<template>
  <q-page padding>
    <obs-form @obs-submit="onSubmit">
      <div class="bg-white shadow-1 q-px-lg q-py-xl column">
        <div class="row q-col-gutter-lg">
          <div class="col-md-5 col-sm-6 col-12">
            <obs-text-field
              name="organizationName"
              v-model="form.organizationName"
              rules="required"
              :label="$t('app.administration.organization.details.nameField')"
            />
          </div>
        </div>

        <q-separator class="q-my-lg" />

        <div class="row q-col-gutter-lg q-mt-xs q-mb-xl">
          <div class="col-md-5 col-sm-6 col-12">
            <div class="text-h6 q-mb-lg">
              {{
                $t("app.administration.organization.details.generalInformation")
              }}
            </div>

            <obs-text-field
              name="organizationLabel"
              v-model="form.organizationLabel"
              rules="required"
              :label="$t('app.administration.organization.details.labelField')"
            />

            <obs-phone-field
              name="phone"
              v-model="form.phone"
              filled
              :label="$t('app.administration.organization.details.phoneField')"
            />

            <obs-phone-field
              name="unifiedNo"
              filled
              v-model="form.unifiedNo"
              :label="
                $t('app.administration.organization.details.unifiedNoField')
              "
            />

            <obs-text-field
              name="email"
              rules="email"
              v-model="form.email"
              :label="$t('app.administration.organization.details.emailField')"
            />

            <obs-text-field
              name="websiteUrl"
              v-model="form.websiteUrl"
              rules="mini_url"
              :label="
                $t('app.administration.organization.details.websiteField')
              "
            />
          </div>

          <div class="col-md-7 col-sm-6 col-12">
            <div class="text-h6 q-mb-lg">
              {{ $t("app.administration.organization.details.address") }}
            </div>

            <obs-text-field
              name="addressLineOne"
              v-model="form.addressLineOne"
              :label="
                $t('app.administration.organization.details.address1Field')
              "
            />

            <obs-text-field
              name="addressLineTwo"
              v-model="form.addressLineTwo"
              :label="
                $t('app.administration.organization.details.address2Field')
              "
            />

            <div class="row q-col-gutter-x-sm">
              <div class="col-md-6 col-sm-12 col-6">
                <obs-lookup-field
                  name="countryId"
                  v-model="form.countryId"
                  type="select"
                  lookup="Countries"
                  :cached="false"
                  :label="
                    $t('app.administration.organization.details.countryField')
                  "
                />
              </div>

              <div class="col-md-6 col-sm-12 col-6">
                <obs-text-field
                  name="postCode"
                  v-model="form.postCode"
                  :label="
                    $t('app.administration.organization.details.poCodeField')
                  "
                />
              </div>
            </div>

            <obs-lookup-field
              name="regionId"
              v-model="form.regionId"
              type="select"
              lookup="RegionsByCountryId"
              :params="{ CountryId: form.countryId }"
              :cached="false"
              :loading="false"
              :label="$t('app.administration.organization.details.stateField')"
            />

            <obs-lookup-field
              name="cityId"
              v-model="form.cityId"
              type="select"
              lookup="CitiesByRegionId"
              :params="{ RegionId: form.regionId }"
              :cached="false"
              :loading="false"
              :label="$t('app.administration.organization.details.cityField')"
            />
          </div>
        </div>

        <obs-form-action
          class="q-ml-auto"
          type="submit"
          label="Save"
          icon="check"
        />
      </div>
    </obs-form>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { Loading, Notify } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/organizationModule"
);

export default {
  setup() {
    const form = ref({
      // Defaults
      phone: {
        countryCode: "eg"
      },
      unifiedNo: {
        countryCode: "eg"
      }
    });
    const { getOrganization, updateOrganization } = useActions([
      "updateOrganization",
      "getOrganization"
    ]);

    async function fetch() {
      Loading.show();

      await getOrganization()
        .then(({ data }) => {
          form.value = data.value;
        })
        .catch((error) => {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top"
          });
        })
        .finally(() => {
          Loading.hide();
        });
    }

    async function onSubmit(values) {
      const payload = {
        id: form.value.id,
        ...values
      };

      Loading.show();

      updateOrganization(payload)
        .then(() => {
          fetch();
        })
        .catch((error) => {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top"
          });
        })
        .finally(() => {
          Loading.hide();
        });
    }

    onMounted(async () => {
      fetch();
    });

    return {
      form,
      onSubmit
    };
  }
};
</script>

<style></style>
