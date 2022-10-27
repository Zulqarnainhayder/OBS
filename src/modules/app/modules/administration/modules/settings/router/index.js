export default [
  {
    path: "settings",
    component: () => import("../layouts/main"),
    meta: { label: "app.administration.settings.settingsLabel" },
    children: [
      {
        path: "",
        redirect: "/app/administration/settings/languages"
      },
      {
        path: "languages",
        meta: { label: "app.administration.settings.languages.languages" },
        component: () => import("../pages/languages"),
      },
      {
        path: "currencies",
        meta: { label: "app.administration.settings.currency.currencyList" },
        component: () => import("../pages/currency-list.vue")
      },
      {
        path: "addresses",
        meta: { label: "app.administration.settings.addressesList" },
        component: () => import("../pages/addresses-list.vue")
      },
      {
        path: "tags",
        meta: { label: "app.administration.settings.tags.tagsList" },
        component: () => import("../pages/tags.vue"),
      },
      {
        path: "series",
        meta: { label: "app.administration.settings.series.label" },
        component: () => import("../pages/series.vue")
      },
      {
        path: "business-sector",
        meta: { label: "app.administration.settings.businessSectors.businessSector" },
        component: () => import("../pages/business-sector.vue"),
      },
      {
        path: "accounting-periods",
        meta: { label: "app.administration.settings.accountingPeriods.accountingPeriods" },
        component: () => import("../pages/accounting-periods.vue"),
      },
      {
        path: "dimensions-types",
        meta: { label: "app.administration.settings.dimensionsTypes.label" },
        component: () => import("../pages/dimensions-types.vue"),
      },
      {
        path: "taxes",
        meta: { label: "app.administration.settings.taxes.label" },
        component: () => import("../pages/taxes.vue")
      }
    ],
  },
];
