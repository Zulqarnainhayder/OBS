import appModuleRoutes from "modules/app/router";
import authModuleRoutes from "modules/auth/router";

const routes = [
  {
    path: "/",
    component: () => import("layouts/main"),
    children: [
      // Generic routes
      {
        path: "studio",
        component: () => import("layouts/studio"),
        children: [
          {
            path: "",
            redirect: "/studio/settings",
          },
          {
            path: "settings",
            component: () => import("pages/studio/settings"),
          },
          {
            path: "forms",
            component: () => import("pages/studio/forms"),
          },
          {
            path: "components",
            component: () => import("pages/studio/components"),
          },
        ],
      },

      // Modules
      ...authModuleRoutes,
      ...appModuleRoutes,
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/errors/404"),
  },
  {
    path: "/401",
    component: () => import("pages/errors/401"),
  },
];

export default routes;
