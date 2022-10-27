<template>
  <router-view />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
/* poppins-regular - latin */
@font-face {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  src: url("/fonts/poppins-v20-latin-regular.eot");
  /* IE9 Compat Modes */
  src: local(""),
    url("/fonts/poppins-v20-latin-regular.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("/fonts/poppins-v20-latin-regular.woff2") format("woff2"),
    /* Super Modern Browsers */ url("/fonts/poppins-v20-latin-regular.woff")
      format("woff"),
    /* Modern Browsers */ url("/fonts/poppins-v20-latin-regular.ttf")
      format("truetype"),
    /* Safari, Android, iOS */
      url("/fonts/poppins-v20-latin-regular.svg#Poppins") format("svg");
  /* Legacy iOS */
}

body {
  zoom: 70%;
  font-family: poppins;
}

::-webkit-scrollbar {
  width: 0.3em;
  height: 0.3em;
}

::-webkit-scrollbar-button {
  background: #ccc;
}

::-webkit-scrollbar-track-piece {
  background: #eee;
}

::-webkit-scrollbar-thumb {
  background: #2b4c6b;
}

h3 {
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #355570;
  margin-top: 0;
  margin-bottom: 0;
  font-family: poppins;
}

h6 {
  font-weight: 400;
  line-height: 21px;
  font-size: 18px;
  color: #355570;
  margin-top: 0;
  margin-bottom: 0;
  font-family: poppins;
}

.my-card {
  background: #ffffff;
  box-shadow: 0px 4px 39px rgba(81, 69, 159, 0.09);
  border-radius: 20.3659px;
}

.chart-select .q-field__control {
  border: 1px solid #d3e1f5;
  border-radius: 8px;
}

.chart-select .q-select__dropdown-icon {
  color: #53b9ea !important;
}

/* apexchartstyle */

.apexcharts-yaxis-label {
  font-weight: 400 !important;
  font-size: 12px !important;
  line-height: 20px !important;
  color: #6b7280 !important;
}

.apexcharts-legend-text {
  font-weight: 400 !important;
  font-size: 14px !important;
  line-height: 21px;
  color: #606060 !important;
  margin: 0 0 0 2px;
}

.arrow_box {
  position: relative;
  background: #555;
  border: 2px solid #000000;
}

.apexcharts-tooltip {
  background: #ffffff;
  box-shadow: 10px 10px 32px rgba(31, 47, 70, 0.12);
  border-radius: 10px;
  border: unset !important;
  color: #23262f;
}

.apexcharts-legend.apx-legend-position-top.apexcharts-align-center {
  top: 0 !important;
}

.bar-chart .apexcharts-legend.apx-legend-position-top.apexcharts-align-center {
  width: 210px !important;
  right: 0px !important;
}

.bar-chart .apexcharts-legend-marker {
  border-radius: 50% !important;
}

.donut-chart
  .apexcharts-legend.apx-legend-position-bottom
  .apexcharts-legend-series {
  margin: 2px 5px !important;
}

.donut-chart
  .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center {
  justify-content: start !important;
}

.donut-chart
  .apexcharts-legend.apx-legend-position-bottom
  .apexcharts-legend-series
  span {
  font-size: 12px !important;
  color: #606060 !important;
}

.apexcharts-slices g path[selected="true"] {
  stroke-opacity: 0;
}

.select-component .q-field--outlined .q-field__control {
  border-radius: 15px;
}

/* Application Tables */

.q-table thead {
  background-color: #edf4fc;
}

.q-table--horizontal-separator thead th {
  border-bottom: unset;
  font-weight: 600;
}

.q-table--horizontal-separator tbody tr {
  border-bottom-width: 1px;
  border-color: #e0e9f4;
}

.q-table th,
.q-table td {
  padding: 20px 16px;
}

.q-table tbody td {
  font-size: 14px;
}

.q-table th {
  font-size: 16px;
}

body.desktop
  .q-table
  > tbody
  > tr:not(.q-tr--no-hover):hover
  > td:not(.q-td--no-hover):before {
  content: unset;
}
</style>
