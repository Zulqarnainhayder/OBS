import dashboardRoutes from "../modules/dashboard/router";
import administrationRoutes from "../modules/administration/router";
import profileRoutes from "../modules/profile/router";

export default [
  // Default Route
  {
    path: "",
    redirect: "/app/dashboard",
  },
  {
    path: "app",
    component: () => import("../layouts/main"),
    meta: { label: "app.home", icon: "home" },
    children: [
      {
        path: "",
        redirect: "/app/dashboard",
      },

      // Modules
      ...dashboardRoutes,
      ...administrationRoutes,
      ...profileRoutes,
    ],
  },
];
