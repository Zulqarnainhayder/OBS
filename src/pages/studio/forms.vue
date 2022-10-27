<template>
  <q-page padding>
    <p class="text-h6">{{ $t("global.forms") }}</p>
    <p class="text-body2">{{ $t("global.formsDesc") }}</p>

    <q-separator spaced="xl" />

    <obs-form class="full-width q-gutter-y-md" @obs-submit="handleSubmit">
      <obs-text-field name="tstaddress" :label="$t('auth.email')" rules="email" />

      <obs-text-field
        type="tstpassword"
        name="password"
        rules="required"
        :label="$t('auth.password')"
      />

      <obs-date-field
        name="tstbirthdate"
        label="Birth Date"
        rules="required"
        clearable
        landscape
        range
      />

      <obs-lookup-field
        type="checkbox"
        name="permissions"
        label="Permissions"
        lookup="$UserRoles"
        rules="required"
        :model-value="[]"
      />

      <obs-form-action
        type="submit"
        label="Submit"
        icon="check"
        class="full-width"
      />
    </obs-form>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const handleSubmit = (values) => {
      console.log(values);
    };

    return {
      handleSubmit,
    };
  },
});
</script>
