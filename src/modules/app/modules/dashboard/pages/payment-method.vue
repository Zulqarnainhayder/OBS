<template>
  <q-card class="my-card donut-chart" style="height: 100%">
    <q-card-section>
      <!-- right icon -->
      <div class="text-right q-mb-md">
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
        <h3>Payment Method Breakdown</h3>
        <div id="chart">
          <apexchart
            type="donut"
            height="350"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
export default {
  name: "SalesAnalytics",

  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    return {
      series: [40, 35, 41, 37],
      chartOptions: {
        plotOptions: {
          pie: {
            donut: {
              size: "50%",
            },
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "12px",
          },
        },
        chart: {
          type: "donut",
        },
        labels: ["Credit Card", "Check", "Cash", "Direct Deposit"],
        stroke: {
          width: 5,
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        colors: ["#53B9EA", "#45B020", "#CA79C6", "#F5640D"],
        legend: {
          position: "bottom",
          offsetY: 0,
          height: 0,
        },
      },
    };
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
</style>
