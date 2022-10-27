export default [
  // Default Route
  {
    path: "",
    redirect: "/app/dashboard/overview",
  },
  {
    path: "dashboard",
    component: () => import("../layouts/main"),
    meta: { label: "app.dashboard.label" },
    children: [
      {
        path: "",
        redirect: "/app/dashboard/overview",
      },
      {
        path: "overview",
        meta: { label: "app.dashboard.overview" },
        component: () => import("../pages/overview"),
      },
    ],
  },
];
