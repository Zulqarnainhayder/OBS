<template>
  <q-page padding>
    <div class="row">
      <div class="col-md-6 col-12">
        <img class="full-width" src="images/splash-background.png" />
      </div>

      <div class="col-md-6 col-12 flex justify-center content-center">
        <div class="q-py-xl q-px-xl login-form">
          <p class="text-h4 q-mb-xl">{{ $t("auth.title") }}</p>

          <obs-form class="full-width q-gutter-y-sm" @obs-submit="handleSubmit">
            <obs-text-field
              name="username"
              :label="$t('auth.username')"
              rules="required"
              :disable="loading"
              outlined
            />

            <obs-text-field
              type="password"
              name="password"
              :label="$t('auth.password')"
              rules="required"
              :disable="loading"
              class="q-mb-md"
              outlined
            />

            <obs-form-action
              type="submit"
              :label="$t('auth.loginButton')"
              icon="login"
              class="full-width"
              :loading="loading"
              :disable="loading"
            />
          </obs-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useState, useActions } = createNamespacedHelpers("AuthModule");

export default defineComponent({
  setup() {
    const { loading } = useState(["loading"]);
    const { login } = useActions(["login"]);

    return {
      loading,
      handleSubmit(data) {
        login(data);
      }
    };
  }
});
</script>

<style scoped>
.login-box {
  min-width: 400px;
  min-height: 400px;
}
</style>

<style lang="scss" scoped>
.login-form {
  width: 600px;
}
</style>
