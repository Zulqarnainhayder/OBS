<template>
  <div class="row">
    <div class="col-12 col-md-6 q-py-sm q-pr-sm">
      <q-card class="my-card" style="height: 100%">
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
            <h3>Working Capital Turnover (WCT)</h3>
            <div id="chart">
              <apexchart
                type="radialBar"
                height="200"
                :options="chartOptions"
                :series="series"
              >
              </apexchart>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-12 col-md-6 q-py-sm q-px-sm">
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
            <h3>Current Asset Turnover (CAT)</h3>
            <div id="chart">
              <apexchart
                type="radialBar"
                height="200"
                :options="chartOptionsAsset"
                :series="seriesAsset"
              >
              </apexchart>
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
      series: [67],
      chartOptions: {
        chart: {
          type: "radialBar",
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#c3ddf0"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "60%",
              background: "#CCF8FE",
            },
            track: {
              show: true,
              background: "#CCF8FE",
              strokeWidth: "100%",
            },
            dataLabels: {
              style: {
                colors: ["#000000"],
              },
              show: true,
              name: {
                show: false,
              },
              value: {
                show: true,
                fontSize: "20px",
                fontWeight: 600,
                offsetY: 0,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          },
        },
      },
      seriesAsset: [15],
      chartOptionsAsset: {
        chart: {
          type: "radialBar",
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#fdc7eb"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        colors: ["#CA79C6"],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "60%",
              background: "#FFDAF3",
            },
            track: {
              show: true,
              background: "#FFDAF3",
              strokeWidth: "100%",
            },
            dataLabels: {
              style: {
                colors: ["#000000"],
              },
              show: true,
              name: {
                show: false,
              },
              value: {
                show: true,
                fontSize: "20px",
                fontWeight: 600,
                offsetY: 0,
                formatter: function (val) {
                  return val + "%";
                },
              },
            },
          },
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
