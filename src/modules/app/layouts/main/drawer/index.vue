<template>
  <q-drawer show-if-above side="left" :model-value="isActive" :mini="isMini" :width="325" class="drawer-item"
    @update:model-value="handleUpdateDrawerIsActive">
    <!-- <q-scroll-area style="height: calc(100% - (65px + 55px + 75px))"> -->
    <!-- <q-btn @click="handleToggleDrawer" class="set-button" round dense>
      <q-avatar size="12px">
        <img src="/images/Buttonback.svg" />
      </q-avatar>
    </q-btn> -->
    <div class="q-mt-lg q-pt-sm drawer-bottom">
      <ucp-drawer-list v-for="(menu, index) in menus" :key="index" :items="menu.items" :label="menu.label" />
    </div>
    <!-- </q-scroll-area> -->
    <div class="absolute fixed-bottom bg-white">
      <q-separator class="q-mx-md q-mb-lg" />
      <ucp-drawer-list v-for="(menu, index) in menus2" :key="index" :items="menu.items" :label="menu.label" />
    </div>
  </q-drawer>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";

import UcpDrawerList from "./list";
import { DEFAULT_ROUTE } from "src/configs/router";

import useAuth from "src/composables/auth";

export default defineComponent({
  props: {
    isMini: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    UcpDrawerList,
  },
  setup(_, { emit }) {
    const menus = computed(() => []);
    const menus2 = computed(() => []);
    const { isAuthorized } = useAuth();

    // Modules
    const dashboardMenu = {
      label: "app.mainMenu",
      items: [
        {
          label: "app.dashboard.label",
          icon: "/images/dashboard.svg",
          to: `${DEFAULT_ROUTE}/dashboard`,
        },
      ],
    };
    const administrationMenu = {
      items: [
        {
          label: "app.administration.label",
          icon: "svguse:/images/vectors.svg#auth",
          items: [
            {
              label: "app.administration.organizationLabel",
              to: "/app/administration/organization",
            },
            {
              label: "app.administration.companyLabel",
              to: "/app/administration/company",
            },
            {
              label: "app.administration.settings.settingsLabel",
              items: [
                {
                  label: "app.administration.settings.languages.languages",
                  to: "/app/administration/settings/languages",
                },
                {
                  label: "app.administration.settings.currency.currencyList",
                  to: "/app/administration/settings/currencies",
                },
                {
                  label: "app.administration.settings.addressesList",
                  to: "/app/administration/settings/addresses",
                },
                {
                  label: "app.administration.settings.tags.tagsList",
                  to: "/app/administration/settings/tags",
                },
                {
                  label: "app.administration.settings.businessSectors.businessSector",
                  to: "/app/administration/settings/business-sector",
                },
                {
                  label: "app.administration.settings.series.label",
                  to: "/app/administration/settings/series",
                },
                {
                  label: "app.administration.settings.accountingPeriods.accountingPeriods",
                  to: "/app/administration/settings/accounting-periods",
                },
                {
                  label: "app.administration.settings.dimensionsTypes.label",
                  to: "/app/administration/settings/dimensions-types",
                },
                {
                  label: "app.administration.settings.taxes.label",
                  to: "/app/administration/settings/taxes",
                },
              ]
            },
            {
              label: "app.administration.users.usersAndGroupsLabel",
              items: [
                {
                  label: "app.administration.users.newUser.newUserLabel",
                  to: "/app/administration/users/new-user",
                },
                {
                  label: "app.administration.users.users.users",
                  to: "/app/administration/users/users",
                },
                {
                  label: "app.administration.users.invitedUsers.invitedUsersLabel",
                  to: "/app/administration/users/invited-users",
                },
                {
                  label: "app.administration.users.deletedUsers.deletedUsersLabel",
                  to: "/app/administration/users/deleted-users",
                },
                {
                  label: "app.administration.users.logfile.userLogLabel",
                  to: "/app/administration/users/logfile",
                },
                {
                  label: "app.administration.users.appAccessGroups.appAccessGroups",
                  to: "/app/administration/users/app-access-groups",
                },
                {
                  label: "app.administration.users.chartAccessGroups.chartAccessGroups",
                  to: "/app/administration/users/chart-access-groups",
                },
                // {
                //   label: "app.administration.users.userApp.userApp",
                //   to: "/app/administration/users/user-app-access-rights",
                // },
                // {
                //   label: "app.administration.users.userChart.userChart",
                //   to: "/app/administration/users/user-chart-access-rights",
                // },

              ]
            },
            {
              label: "app.administration.charts.chartsLabel",
              to: "/app/administration/charts",
              items: [
                {
                  label: "app.administration.charts.chartsAccounts.label",
                  to: "/app/administration/charts/charts-accounts",
                },
              ]
            },
          ],
        },
      ],
    };
    const generalLedger = {
      label: "app.mainMenu",
      items: [
        {
          label: "General Ledger",
          icon: "/images/generalledger.svg",
          to: `${DEFAULT_ROUTE}/administration/organization`,
        },
      ],
    };
    const budget = {
      label: "app.mainMenu",
      items: [
        {
          label: "Budget",
          icon: "/images/budget.svg",
          to: `${DEFAULT_ROUTE}/administration/charts/charts-accounts`,
        },
      ],
    };
    const fixedAssets = {
      label: "app.mainMenu",
      items: [
        {
          label: "Fix Assets",
          icon: "/images/fixedassets.svg",
          to: `${DEFAULT_ROUTE}/administration/users/app-access-groups`,
        },
      ],
    };
    const loans = {
      label: "app.mainMenu",
      items: [
        {
          label: "Loans",
          icon: "/images/loans.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/company`,
        },
      ],
    };
    const payables = {
      label: "app.mainMenu",
      items: [
        {
          label: "Payables",
          icon: "/images/payables.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/languages`,
        },
      ],
    };
    const receiveables = {
      label: "app.mainMenu",
      items: [
        {
          label: "Receiveables",
          icon: "/images/receiveables.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/currencies`,
        },
      ],
    };
    const purchases = {
      label: "app.mainMenu",
      items: [
        {
          label: "Purchases",
          icon: "/images/purchaseable.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/addresses`,
        },
      ],
    };
    const vrm = {
      label: "app.mainMenu",
      items: [
        {
          label: "VRM",
          icon: "/images/vrm.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/tags`,
        },
      ],
    };
    const inventory = {
      label: "app.mainMenu",
      items: [
        {
          label: "Inventory",
          icon: "/images/invantory.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/bussiness-sector`,
        },
      ],
    };
    const sales = {
      label: "app.mainMenu",
      items: [
        {
          label: "Sales",
          icon: "/images/sales.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/series`,
        },
      ],
    };
    const crm = {
      label: "app.mainMenu",
      items: [
        {
          label: "CRM",
          icon: "/images/crm.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/accounting-periods`,
        },
      ],
    };
    const production = {
      label: "app.mainMenu",
      items: [
        {
          label: "Production",
          icon: "/images/production.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/dimensions-types`,
        },
      ],
    };
    const services = {
      label: "app.mainMenu",
      items: [
        {
          label: "Services",
          icon: "/images/services.svg",
          to: `${DEFAULT_ROUTE}/administration/settings/taxes`,
        },
      ],
    };
    const humanResources = {
      label: "app.mainMenu",
      items: [
        {
          label: "Human Resources",
          icon: "/images/hr.svg",
          to: `${DEFAULT_ROUTE}/administration/users/new-user`,
        },
      ],
    };
    const payrolls = {
      label: "app.mainMenu",
      items: [
        {
          label: "Payrolls",
          icon: "/images/payrol.svg",
          to: `${DEFAULT_ROUTE}/administration/users/invited-users`,
        },
      ],
    };
    const contracting = {
      label: "app.mainMenu",
      items: [
        {
          label: "Contracting",
          icon: "/images/contracting.svg",
          to: `${DEFAULT_ROUTE}/administration/users/users`,
        },
      ],
    };
    const property = {
      label: "app.mainMenu",
      items: [
        {
          label: "Property",
          icon: "/images/property.svg",
          to: `${DEFAULT_ROUTE}/administration/users/delete-users`,
        },
      ],
    };
    const settings = {
      label: "app.mainMenu",
      items: [
        {
          label: "Settings",
          icon: "/images/settings.svg",
          to: `${DEFAULT_ROUTE}/administration/users/logfile`,
        },
      ],
    };
    const logout = {
      label: "app.mainMenu",
      items: [
        {
          label: "Logout",
          icon: "/images/logout.svg",
          to: `${DEFAULT_ROUTE}/administration/users/app-access-groups`,
        },
      ],
    };
    // Auth conditions
    onMounted(() => {
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(dashboardMenu);
      }

      if (isAuthorized("VIEW_USERS_LIST")) {
        menus.value.push(administrationMenu);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(generalLedger);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(budget);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(fixedAssets);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(loans);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(payables);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(receiveables);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(purchases);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(vrm);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(inventory);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(sales);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(crm);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(production);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(services);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(humanResources);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(payrolls);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(contracting);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus.value.push(property);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus2.value.push(settings);
      }
      if (isAuthorized("VIEW_DASHBOARD")) {
        menus2.value.push(logout);
      }

    });

    return {
      DEFAULT_ROUTE,
      menus,
      menus2,
      handleLogoClick() { },
      handleToggleDrawer() {
        emit("toggleDrawer");
      },
      handleUpdateDrawerIsActive(value) {
        emit("updateDrawerIsActive", value);
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.ucp-header-head {
  height: 65px;

  &__toggle-button {
    width: 23px;
    height: 43px;
  }
}
</style>
<style scoped>
.drawer-bottom{
  margin-bottom: 10rem;
}
</style>
<style>
.drawer-item .right-sidebar-app .q-item__section--main{
  white-space: nowrap;
}
</style>
