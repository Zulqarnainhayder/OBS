<template>
  <q-page padding>
    <obs-form @obs-submit="onSubmit">
      <div class="q-py-sm q-pb-xl column">
        <q-card class="my-card q-pa-xl q-pb-xl">
          <div class="">
            <h3>
              {{ $t("app.administration.company.details.generalInformation") }}
            </h3>
          </div>
          <div class="row q-col-gutter-lg">
            <div class="col-md-12 col-12">
              <obs-avatar-field
                name="fileAsBase64"
                :preview="form.imageUrl"
                model-value=""
              />
            </div>
            <div class="col-md-12 col-12">
              <q-input
                name="companyName"
                class="company-name"
                rules="required"
                v-model="form.companyName"
                :label="
                  $t('app.administration.company.details.nameField') + '*'
                "
              />
            </div>
          </div>

          <div>
            <div class="row q-col-gutter-lg q-mt-xs q-mb-xl">
              <div class="col-md-6 col-12">
                <obs-phone-field
                  name="unifiedNo"
                  v-model="form.unifiedNo"
                  :label="
                    $t('app.administration.company.details.unifiedNoField')
                  "
                />
                <obs-phone-field
                  name="phone"
                  v-model="form.phone"
                  :label="
                    $t('app.administration.organization.details.phoneField')
                  "
                />
                <obs-text-field
                  name="email"
                  v-model="form.email"
                  rules="email"
                  :label="$t('app.administration.company.details.emailField')"
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

              <div class="col-md-6 col-12">
                <obs-text-field
                  name="companyLabel"
                  rules="required"
                  v-model="form.companyLabel"
                  :label="
                    $t('app.administration.organization.details.labelField')
                  "
                />
                <obs-lookup-field
                  name="currencyId"
                  v-model="form.currencyId"
                  type="select"
                  :cached="false"
                  lookup="Currencies"
                  rules="required"
                  :label="
                    $t('app.administration.company.details.currencyField')
                  "
                />

                <obs-lookup-field
                  name="activityTypeId"
                  v-model="form.activityTypeId"
                  type="select"
                  lookup="ActivityTypes"
                  :label="
                    $t('app.administration.company.details.activityTypeField')
                  "
                />

                <obs-lookup-field
                  :loading="false"
                  name="businessSectorId"
                  v-model="form.bussinessSectorId"
                  :params="{ ActivityTypeId: form.activityTypeId }"
                  type="select"
                  lookup="BusinessSectorsByActivityTypeId"
                  :cached="false"
                  :label="
                    $t('app.administration.company.details.businessSectorField')
                  "
                />
              </div>
            </div>
          </div>

          <div class="row q-col-gutter-lg q-mb-xl">
            <div class="col-md-6 col-12">
              <div class="card-heading-2 q-mb-lg">
                {{ $t("app.administration.company.details.officialData") }}
              </div>

              <obs-text-field
                name="crNo"
                v-model="form.crNo"
                :label="$t('app.administration.company.details.crNoField')"
              />
              <obs-text-field
                name="taxOffice"
                v-model="form.taxOffice"
                :label="$t('app.administration.company.details.taxOfficeField')"
              />
              <obs-text-field
                name="taxId"
                v-model="form.taxId"
                :label="$t('app.administration.company.details.taxIDField')"
              />
              <obs-text-field
                name="vatNo"
                v-model="form.vatNo"
                :label="$t('app.administration.company.details.VatNoField')"
              />
            </div>

            <div class="col-md-6 col-12">
              <div class="card-heading-2 q-mb-lg">
                {{ $t("app.administration.company.details.address") }}
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
              <div class="row q-col-gutter-x-sm">
                <div class="col-md-6 col-sm-12 col-6">
                  <obs-lookup-field
                    name="regionId"
                    v-model="form.regionId"
                    type="select"
                    lookup="RegionsByCountryId"
                    :params="{ CountryId: form.countryId }"
                    :cached="false"
                    :loading="false"
                    :label="$t('app.administration.company.details.stateField')"
                  />
                </div>

                <div class="col-md-6 col-sm-12 col-6">
                  <obs-lookup-field
                    name="cityId"
                    v-model="form.cityId"
                    type="select"
                    lookup="CitiesByRegionId"
                    :params="{ RegionId: form.regionId }"
                    :cached="false"
                    :loading="false"
                    :label="$t('app.administration.company.details.cityField')"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="text-right">
            <obs-form-action
              rounded
              class="q-mr-lg btn-1"
              padding="12px 80px"
              type="submit"
              label="Submit"
            />
            <obs-form-action
              rounded
              type="submit"
              class="btn-2"
              padding="12px 40px"
              label="Submit and New"
              @click="setNew"
            />
          </div>
        </q-card>
      </div>
    </obs-form>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { Loading, Notify } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/CompanyModule"
);
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    let andNew = false;
    const route = useRoute();
    const router = useRouter();
    const { id } = route.params;
    const isEdit = !!id;
    const form = ref({
      // Defaults
      phone: {
        countryCode: "eg",
      },
      unifiedNo: {
        countryCode: "eg",
      },
    });
    const { createCompany, updateCompany, getCompany } = useActions([
      "updateCompany",
      "getCompany",
      "createCompany",
    ]);

    async function onSubmit(values) {
      const method = isEdit ? updateCompany : createCompany;

      const payload = {
        ...(isEdit && { id }),
        organizationId: 1,
        ...values,
      };

      Loading.show();

      method(payload)
        .then(() => {
          if (andNew) {
            router.replace("/app/administration/company/data").then(() => {
              location.reload();
            });
          } else {
            router.replace("/app/administration/company");
          }
        })
        .catch((error) => {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    }

    async function fetchCompany() {
      Loading.show();

      getCompany(id)
        .then(({ data }) => {
          form.value = data.value;
        })
        .catch((error) => {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    }

    function setNew() {
      andNew = true;
    }

    onMounted(async () => {
      if (isEdit) {
        fetchCompany();
      }
    });

    return {
      form,
      onSubmit,
      setNew,
    };
  },
};
</script>

<style>
.company-name .q-field__label {
  color: #000000;
  font-size: 20px;
  text-transform: capitalize;
}
.btn-1 {
  background-color: #53b9ea;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
.btn-2 {
  background-color: #ca79c6;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}
.card-heading-2 {
  color: #000000;
  font-size: 20px;
}
</style>
