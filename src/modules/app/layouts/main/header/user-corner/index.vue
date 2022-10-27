<template>
    <ucp-user-menu />
    <!-- <ucp-lang-switcher v-if="$q.screen.gt.sm" />
    <ucp-organiztion-info v-if="$q.screen.gt.sm"  /> -->
    <!-- <ucp-dark-switcher v-if="$q.screen.gt.sm" /> -->
    <ucp-organiztion-info v-if="$q.screen.gt.sm"  />
</template>

<script>
import { defineComponent } from "vue";

import UcpUserMenu from "./menu";
// import UcpDarkSwitcher from "./dark-switcher";
// import UcpLangSwitcher from "./lang-switcher";
import UcpOrganiztionInfo from "./organization-info";

export default defineComponent({
  components: {
    UcpUserMenu,
    // UcpDarkSwitcher,
    // UcpLangSwitcher,
    UcpOrganiztionInfo,
  },
});
</script>

<style lang="scss">
.upc-user-area-menu {
  min-width: 275px;
}
</style>
