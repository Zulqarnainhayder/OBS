export default [
  {
    path: "profile",
    component: () => import("../layouts/main"),
    meta: { label: "app.profile.label" },
    children: [
      {
        path: "",
        meta: { label: "app.profile.update" },
        component: () => import("../pages/edit"),
      },
    ],
  },
];
