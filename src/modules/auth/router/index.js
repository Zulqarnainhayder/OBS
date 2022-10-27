export default [
  {
    path: "auth",
    component: () => import("../layouts/main"),
    children: [
      {
        path: "",
        redirect: "/auth/login",
      },
      {
        path: "login",
        component: () => import("../pages/login"),
      },
    ],
  },
];
