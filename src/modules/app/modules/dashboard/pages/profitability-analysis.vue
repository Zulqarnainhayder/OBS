<template>
  <div class="row">
    <div class="col-12 q-py-sm q-pr-sm">
      <q-card class="my-card">
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
          <div class="row q-mx-lg">
            <div class="col-9"></div>
            <div class="col-3 q-mt-lg chart-select">
              <q-select
                outlined
                class="date-picker"
                v-model="month"
                :options="options"
                :dense="dense"
                :options-dense="denseOpts"
              >
                <template v-slot:prepend>
                  <img width="20" src="/images/date-picker.svg" />
                </template>
              </q-select>
            </div>
            <div class="col-12">
              <div id="chart">
                <apexchart
                  type="line"
                  height="350"
                  :options="chartOptions"
                  :series="series"
                >
                </apexchart>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
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
      month: ref("Monthly"),
      options: ["Monthly", "Daily", "Weekly", "Apple", "Oracle"],
      series: [
        {
          name: "",
          data: [0, 25, 32, 16, 45, 24, 49],
        },
      ],

      chartOptions: {
        tooltip: {
          enabled: true,
          shared: true,
          style: {
            fontSize: "14px",
            position: "absolute",
          },
          x: {
            show: false,
          },
          y: {
            formatter: function (
              value,
              { series, seriesIndex, dataPointIndex, w }
            ) {
              return "$" + w.globals.labels[dataPointIndex];
            },
          },
        },
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "Profitability Analytics",
          align: "left",
          style: {
            fontSize: "24px",
            fontWeight: "600",
            fontFamily: 'poppins',
            color: "#355570",
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#53B9EA"],
        stroke: {
          curve: "smooth",
          width: 2.5,
        },
        grid: {
          row: {
            opacity: 0.5,
          },
        },
        legend: {
          show: false,
        },
        xaxis: {
          labels: {
            style: {
              cssClass: "apexcharts-yaxis-label",
            },
          },
          categories: ["Sun", "Mon", "Tue", "Web", "Thu", "Fri", "Sat"],
        },
        yaxis: {
          labels: {
            style: {
              cssClass: "apexcharts-yaxis-label",
            },
          },
          min: 0,
          max: 50,
          tickAmount: 5,
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

.chart-select {
  margin-bottom: -40px;
  z-index: 9;
}
</style>
