<template>
  <q-layout
    view="hHh lpR fFf"
    :class="{
      'bg-dark-blue-4': $q.dark.isActive,
      '': !$q.dark.isActive,
    }"
  >
    <q-page-container class="bg-offwhite-blue">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
