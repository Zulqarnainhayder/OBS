<template>
  <q-page padding>
    <Summary />
    <div class="row">
      <div class="col-12 col-md-12 q-py-sm">
        <SalesAnalytics />
      </div>
      <div class="col-12 col-md-8 q-py-sm q-pr-sm">
        <AccountsAging />
      </div>
      <div class="col-12 col-md-4 q-py-sm q-pl-sm">
        <PaymentMethod />
      </div>
      <div class="col-12 col-md-7 q-py-sm">
        <Turnover />
        <ProfitabilityAnalysis />
      </div>
      <div class="col-12 col-md-5 q-py-sm q-pl-sm">
        <ExecutiveSummary />
      </div>
    </div>
  </q-page>
</template>

<script>
import Summary from "./summary.vue";
import SalesAnalytics from "./sales-analytics.vue";
import AccountsAging from "./accounts-aging.vue";
import PaymentMethod from "./payment-method.vue";
import Turnover from "./turnover.vue";
import ProfitabilityAnalysis from "./profitability-analysis.vue";
import ExecutiveSummary from "./executive-summary.vue";
export default {
  name: "Overview",

  components: {
    Summary,
    SalesAnalytics,
    AccountsAging,
    PaymentMethod,
    Turnover,
    ProfitabilityAnalysis,
    ExecutiveSummary,
  },
};
</script>

<style scoped></style>
