<template>
  <q-page padding>
    <q-card class="my-card bg-white newUserCard">
      <h1 class="text-h6">{{ $t("app.administration.users.newUser.newUserLabel") }}</h1>
      <div class="row createUser">
        <router-link class="link create" to="/app/administration/users/user-details">
          {{ $t("app.administration.users.newUser.createUserLink") }}
        </router-link>
        <p>{{ $t("app.administration.users.newUser.createUserTxt") }}</p>
      </div>
      <div class="row inviteUser">
        <router-link  class="link invite" to="/app/administration/users/user-invitation">
          {{ $t("app.administration.users.newUser.inviteUserLink") }}
        </router-link>
        <p>{{ $t("app.administration.users.newUser.inviteUserTxt") }}</p>
      </div>
    </q-card>
  </q-page>
</template>
<script>
  export default {
    setup() {


    },
  }

</script>
<style scoped>
 .newUserCard {
    min-height: 656px;
    padding: 4rem 3rem;
 }
 h1 {
  margin-bottom: 3rem;
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
 }
 .link.create {
  background-color: #4caf50;
  border: 1px solid #4caf50;
  color: #fff;
 }
 .link.invite {
    border: 1px solid #9e9e9e;
    background-color: #9e9e9e1a;
    color: #000;
 }
 p {
    display: block;
    width: 100%;
 }
 .inviteUser {
    margin-top: 4rem;
 }
</style>
