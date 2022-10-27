<template>
  <q-card class="my-card" style="height: 100%">
    <q-card-section>
      <!-- right icon -->
      <div class="text-right">
        <q-btn
          text-color="grey-6"
          color="grey-7"
          class="rotate-90 absolute fixed-top-right q-ma-xs btn-more"
          size="1em"
          round
          flat
          icon="more_vert"
        >
          <q-menu cover auto-close>
            <q-list>
              <q-item clickable>
                <q-item-section>Remove Card</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Send Feedback</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Share</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <!-- main card info -->
      <div class="q-mx-lg">
        <div class="text-center q-my-md">
          <h3>Executive Summary</h3>
        </div>
        <span class="card-heading">Cash Summary</span>
        <div class="row q-px-md q-py-sm q-my-xs summary-header font-class">
          <div class="col-3">Metrics</div>
          <div class="col-3">This Month</div>
          <div class="col-3">Last Month</div>
          <div class="col-3">Variance (%)</div>
        </div>
        <div class="row q-px-md q-py-sm q-mt-md font-class">
          <div class="col-3">Cash Received</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="row q-px-md q-py-sm font-class">
          <div class="col-3">Cash Balance</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="row q-px-md q-py-sm font-class">
          <div class="col-3">Cash Spend</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="row q-px-md q-py-sm font-class">
          <div class="col-3">Cash Surplus</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="q-mt-lg"><span class="card-heading">Profitability</span></div>
        <div class="row q-px-md q-py-sm q-mt-xs font-class">
          <div class="col-3">Cash Received</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="row q-px-md q-py-sm font-class">
          <div class="col-3">Cash Balance</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="row q-px-md q-py-sm font-class">
          <div class="col-3">Cash Spend</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="row q-px-md q-py-sm font-class">
          <div class="col-3">Cash Surplus</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="q-mt-lg"><span class="card-heading">Profitability</span></div>
        <div class="row q-px-md q-py-sm q-mt-xs font-class">
          <div class="col-3">Cash Received</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="row q-px-md q-py-sm font-class">
          <div class="col-3">Cash Balance</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="row q-px-md q-py-sm font-class">
          <div class="col-3">Cash Spend</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
        <div class="row q-px-md q-py-sm font-class">
          <div class="col-3">Cash Surplus</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">SR35.22K</div>
          <div class="col-3">-20.10</div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ExecutiveSummary",
  setup() {
    return {};
  },
};
</script>

<style scoped>
.material-icons {
  color: rgba(58, 53, 65, 0.54);
}
.my-card {
  background: #ffffff;
  box-shadow: 0px 4px 39px rgba(81, 69, 159, 0.09);
  border-radius: 20.3659px;
}
.chart-select {
  margin-bottom: -40px;
  z-index: 9;
}
.card-heading {
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  color: #000000;
}
.summary-header {
  background: #edf4fc;
}
.font-class {
  font-weight: 400;
  font-size: 14px;
  color: #000000;
}
</style>
