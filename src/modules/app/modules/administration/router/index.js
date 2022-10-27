import organizationRoutes from "../modules/organization/router";

import settingsRoutes from "../modules/settings/router";
import chartsRoutes from "../modules/chart/router";
import companyRoutes from "../modules/company/router";
import usersRoutes from "../modules/users/router";
export default [
  {
    path: "administration",
    component: () => import("../layouts/main"),
    meta: { label: "app.administration.label" },
    children: [
      {
        path: "",
        redirect: "/app/administration/organization"
      },
      organizationRoutes,

      ...settingsRoutes,
      ...usersRoutes,
      ...chartsRoutes,
      companyRoutes
    ]
  }
];
