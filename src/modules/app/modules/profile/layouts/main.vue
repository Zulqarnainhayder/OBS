<template>
  <q-layout
    view="hHh lpR fFf"
    :class="{
      'bg-dark-blue-4': $q.dark.isActive,
      'bg-offwhite-blue': !$q.dark.isActive,
    }"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
