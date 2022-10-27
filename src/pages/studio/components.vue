<template>
  <q-page padding>
    <p class="text-h6">{{ $t("global.components") }}</p>
    <p class="text-body2">{{ $t("global.componentsLinkDesc") }}</p>

    <q-separator spaced="xl" />

    <p class="text-body1">Table</p>

    <obs-table
      :title="$t('app.administration.companyLabel')"
      row-key="id"
      action="AppModule/AdministrationModule/getCompany"
      to="/app/administration/company/add"
      :columns="[
        {
          sortable: true,
          name: 'companyName',
          label: $t('app.administration.companyLabel'),
          field: 'companyName',
          align: 'left',
        },
        {
          sortable: true,
          name: 'users',
          label: $t('app.administration.companyLabel'),
          align: 'left',
          field: 'users',
        },
        {
          name: 'admin',
          label: $t('app.administration.companyLabel'),
          align: 'left',
          field: 'admin',
        },
        {
          name: 'details',
          label: $t('app.administration.companyLabel'),
          align: 'left',
          field: 'details',
        },
        // {
        //   name: 'actions',
        //   label: $t('app.user.actions'),
        //   align: 'left',
        //   actions: ({ id }) => [
        //     {
        //       icon: 'edit',
        //       label: $t('app.user.edit'),
        //       to: `/app/user/${id}`,
        //     },
        //   ],
        // },
      ]"
    />
  </q-page>
</template>
