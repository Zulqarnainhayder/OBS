<template>
  <!-- <q-footer
    class="q-pa-lg row justify-between items-center"
    :class="{
      'bg-white text-grey-7': !$q.dark.isActive,
      'bg-dark-blue-5 text-dark-move-2': $q.dark.isActive,
    }"
  >
    <p class="text-subtitle2 no-margin">&copy; OBS 2022</p>
    <div class="flex q-gutter-x-md">
      <q-btn
        rounded
        unelevated
        color="instagram"
        size="sm"
        :href="instagramLink"
        target="_blank"
      >
        <img src="/images/instagram.png" width="17" height="17" />
      </q-btn>
      <q-btn
        rounded
        unelevated
        color="facebook"
        size="sm"
        icon="facebook"
        :href="facebookLink"
        target="_blank"
      />
    </div>
  </q-footer> -->
  <q-drawer
    show-if-above
    side="right"
    class="text-center q-pr-xs"
    :model-value="isActive"
    :mini="isMini"
    :width="100"
    @update:model-value="handleUpdateDrawerIsActive"
  >
    <!-- <q-scroll-area style="height: calc(100% - (65px + 55px + 75px))"> -->
    <!-- <q-btn round unelevated color="instagram" size="sm" :href="instagramLink" target="_blank" class="q-mr-sm q-mt-sm">
      <img src="/images/instagram.png" width="17" height="17" />
    </q-btn> -->
    <div class="q-mt-lg q-pt-md">
      <div v-for="(item, index) in drawerItems" :key="index" class="q-mb-lg">
        <q-btn rounded flat padding="0" :href="item.link" target="_blank">
          <img :src="item.img" />
        </q-btn>
        <div>
          <span class="icon-heading">{{ item.heading }}</span>
        </div>
      </div>
    </div>

    <!-- <q-btn round unelevated color="facebook" size="sm" icon="facebook" :href="facebookLink" target="_blank"
      class="q-mr-sm q-mt-sm" /> -->
    <!-- <ucp-drawer-list
        v-for="(menu, index) in menus"
        :key="index"
        :items="menu.items"
        :label="menu.label"
      /> -->
    <!-- </q-scroll-area> -->
  </q-drawer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const drawerItems = [
      {
        img: "/images/recent.svg",
        heading: "Recent",
        link: "https://www.instagram.com/obs/",
      },
      {
        img: "/images/favourites.svg",
        heading: "Favourites",
        link: "https://www.instagram.com/obs/",
      },
      {
        img: "/images/notes.svg",
        heading: "Notes",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/requests.svg",
        heading: "Request",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/contacts.svg",
        heading: "Contacts",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/links.svg",
        heading: "Links",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/folders.svg",
        heading: "Folders",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/googledrive.svg",
        heading: "G-Drive",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/dropbox.svg",
        heading: "Dropbox",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/whatsapp.svg",
        heading: "Whatsapp",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/telegram.svg",
        heading: "Telegram",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/wechat.svg",
        heading: "Wechat",
        link: "https://www.facebook.com/obs",
      },
      {
        img: "/images/edit.svg",
        heading: "Edit",
        link: "https://www.facebook.com/obs",
      },
    ];

    return { drawerItems };
  },
});
</script>

<style scoped>
.icon-heading {
  color: #000000;
  font-size: 9px;
}
</style>
