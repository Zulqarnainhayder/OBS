import { i18n } from "src/boot/i18n";

import { computed } from "vue";

/**
 * @Important The lookup item should has:
 * - @id (required)
 * - @key (required only if @id is a number)
 * - @label (required)
 */

export default {
  // Id -> Number
  AccountTypes: [
    {
      id: 3,
      key: "Employee",
      label: computed(() => i18n.t("global.accountTypesLookup.employee")),
    },
  ],

  Levels: [
    {
      id: 1,
      label: 1,
    },
    {
      id: 2,
      label: 2,
    },
    {
      id: 3,
      label: 3,
    },
    {
      id: 4,
      label: 4,
    },
    {
      id: 5,
      label: 5,
    },
    {
      id: 6,
      label: 6,
    },
    {
      id: 7,
      label: 7,
    },
    {
      id: 8,
      label: 8,
    },
    {
      id: 9,
      label: 9,
    },
    {
      id: 10,
      label: 10,
    },
  ],

  Signature: [
    { id: 1, label: i18n.t("global.signatureLookup.positive") },
    { id: 2, label: i18n.t("global.signatureLookup.negative") }
  ],

  TaxComputation: [
    { id: 0, label: i18n.t("global.taxComputationLookup.fixedValue") },
    { id: 1, label: i18n.t("global.taxComputationLookup.variableValue") },
    { id: 2, label: i18n.t("global.taxComputationLookup.percentageOfValue") },
    { id: 3, label: i18n.t("global.taxComputationLookup.percentageOfTotal") },
  ],

  City: [
    { id: 1, label: 'giza' }
  ],

  // Id -> string
  UserRoles: [
    {
      id: "Admin",
      label: computed(() => i18n.t("global.userRolesLookup.admin")),
    },
    {
      id: "SuperAdmin",
      label: computed(() => i18n.t("global.userRolesLookup.superAdmin")),
    },
    {
      id: "ReservationsReviewer",
      label: computed(() =>
        i18n.t("global.userRolesLookup.reservationReviewer")
      ),
    },
    {
      id: "CompaniesReviewer",
      label: computed(() => i18n.t("global.userRolesLookup.companiesReviewer")),
    },
    {
      id: "UsersReviewer",
      label: computed(() => i18n.t("global.userRolesLookup.usersReviewer")),
    },
  ],

  Charts: [{id: 3, key:'t1', label:'t1'}, {id: 4, key:'t2', label:'t2'}],
  AccGruopCharts: [
    {
      id: 0,
      key: 'Group',
      label: computed(()=> i18n.t("app.administration.charts.details.checkGroup"))
    },
    {
      id: 1,
      key: 'Account',
      label: computed(()=> i18n.t("app.administration.charts.details.checkAccount"))
    }
  ],
  AccountsType: [
    {
      id: 0,
      key: 'Regular',
      label: computed(()=> i18n.t("app.administration.charts.details.regular"))
    },
    {
      id: 1,
      key: 'UnRegular',
      label: computed(()=> i18n.t("app.administration.charts.details.fixedAsset"))
    }
  ],
  Postingtypes: [
    {
      id: 0,
      key: 'BalanceSheet',
      label: computed(()=> i18n.t("app.administration.charts.details.balanceSheetLabel"))
    },
    {
      id: 1,
      key: 'IncomeStatement',
      label: computed(()=> i18n.t("app.administration.charts.details.incomeStatementLabel"))
    }
  ],
  Typical: [
    {
      id: 0,
      key: 'Debit',
      label: computed(()=> i18n.t("app.administration.charts.details.debitLabel"))
    },
    {
      id: 1,
      key: 'Credit',
      label: computed(()=> i18n.t("app.administration.charts.details.creditLabel"))
    }
  ],
  AccCategory: [
    {
      id: 0,
      key: 'Capitalized',
      label: computed(()=> i18n.t("app.administration.charts.details.capitalizedLabel"))
    },
    {
      id: 1,
      key: 'ControlAccount',
      label: computed(()=> i18n.t("app.administration.charts.details.controlAccountLabel"))
    }
  ],

  ActivityTypes:[
    {
      id: "Service",
      label: computed(()=> i18n.t("app.administration.settings.businessSector.service"))
    },
    {
      id: "Trading",
      label: computed(()=> i18n.t("app.administration.settings.businessSector.trading"))
    },
    {
      id: "Industrial",
      label: computed(()=> i18n.t("app.administration.settings.businessSector.industrial"))
    },
  ],

  Languages: [
    {
      id: "ar",
      label: computed(() => i18n.t("global.languageLookup.arabic")),
    },
    {
      id: "en-US",
      label: computed(() => i18n.t("global.languageLookup.english")),
    },
  ],

  // Id -> Boolean
  DarkLight: [
    {
      id: true,
      key: "Dark",
      label: computed(() => i18n.t("global.darkLightLookup.dark")),
    },
    {
      id: false,
      key: "Light",
      label: computed(() => i18n.t("global.darkLightLookup.light")),
    },
  ],
  UserStatus: [
    {
      id: true,
      key: "Active",
      label: computed(() => i18n.t("global.userStatusLookup.active")),
    },
    {
      id: false,
      key: "Inactive",
      label: computed(() => i18n.t("global.userStatusLookup.inactive")),
    },
  ],
};
