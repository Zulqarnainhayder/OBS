<template>
  <q-card class="my-card bar-chart" style="height: 100%">
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
      <div class="row q-mx-lg">
        <div class="col-12">
          <div id="chart">
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
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
      series: [
        {
          name: "Payable",
          data: [400, 305, 101, 308, 237, 400],
        },
        {
          name: "Receiveable",
          data: [100, 75, 200, 76, 101, 158],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "Account Receivable & Payable Aging",
          align: "left",
          style: {
            fontSize: "24px",
            fontWeight: "600",
            fontFamily: 'poppins',
            color: "#355570",
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 5,
            columnWidth: "15%",
            endingShape: "round",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: "top",
          horizontalAlign: "center",
          floating: true,
          offsetX: 700,
          top: 0,
        },
        colors: ["#53B9EA", "#CA79C6"],
        xaxis: {
          categories: [
            "0 or less",
            "1:30",
            "31:60",
            "61:90",
            "91:120",
            "over 120",
          ],
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          enabled: false,
        },
        yaxis: {
          labels: {
            style: {
              cssClass: "apexcharts-yaxis-label",
            },
          },
          min: 0,
          max: 400,
          tickAmount: 4,
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
