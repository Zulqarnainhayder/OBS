<template>
  <div class="row">
    <div class="col-12">
      <q-card class="my-card">
        <q-card-section>
          <!-- right icon -->
          <div class="text-right">
            <img class="q-mr-lg q-mt-xs q-pr-sm" src="/images/export.svg" />
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
            <div class="col-10"></div>
            <div class="col-2 chart-select">
              <q-select
                class="q-mr-md date-picker"
                outlined
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
          name: "Revenue",
          data: [200, 220, 240, 180, 200, 250, 200, 230],
        },
        {
          name: "Cost",
          data: [150, 178, 135, 151, 149, 162, 169, 191],
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
          text: "Sales Analytics",
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
        colors: ["#CA79C6", "#53B9EA"],
        stroke: {
          curve: "smooth",
        },
        grid: {
          row: {
            opacity: 0.5,
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          floating: true,
          offsetX: 400,
        },
        xaxis: {
          labels: {
            style: {
              cssClass: "apexcharts-yaxis-label",
            },
          },
          categories: [1, 2, 3, 4, 5, 6, 7, 8],
        },
        yaxis: {
          labels: {
            style: {
              cssClass: "apexcharts-yaxis-label",
            },
          },
          min: 50,
          max: 350,
          tickAmount: 6,
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
  margin-bottom: -30px;
  z-index: 9;
}
</style>
<style>
.date-picker ,.date-picker .q-field__contro, .date-picker  .q-field__prepend, .date-picker .q-field__control-container, .date-picker  .q-field__append{
  max-height: 42px;
}
.date-picker .q-field__native, .date-picker .q-field__control{
  min-height: 42px !important;
}
</style>
